<template>
  <div class="modal-propose">
    <img src="@/assets/modal-close.svg" alt="" width="30" height="30"
         @click="close"
    >
    <div class="function">{{ functionName }}</div>
    <div class="function-explanation">{{ explanation }}</div>
    <div class="argument-container">
      <div v-for="(param, index) in params" :key="param.name"
           class="argument"
      >
        <div class="param-container">
          <div class="label">{{ param.name }} ({{ param.type }})</div>
          <img v-if="tooltip(index) !== ''"
               class="tooltip-img"
               src="@/assets/tooltip.png" alt=""
               width="16" height="16"
          >
          <div class="tooltip-container">
            <div class="tooltip">
              <img src="@/assets/arrow-tooltip.png" alt=""
                   width="4" height="6"
              >
              <div class="tooltip-content"
                   :style="[
                     $mq === 'mobile' ? { 'width': '200px' } : { 'width': '400px' },
                   ]"
              >
                {{ tooltip(index) }}
              </div>
            </div>
          </div>
        </div>
        <text-input :ref="`param${index}`"
                    :hint="exampleParam(index)"
        />
      </div>
    </div>
    <div class="description-container">
      <div class="description">Description</div>
      <div v-if="account" class="amount-container">
        <span>Available Amount: </span>
        <span class="amount">{{ tonBalance | TON | withComma }}</span>
        <span> TON / </span>

        <span>Required Amount: </span>
        <span class="amount">{{ createAgendaFee | TON | withComma }}</span>
        <span> TON</span>
      </div>
    </div>
    <textarea v-model="desc" name="" cols="30" rows="10" />
    <div class="button-container">
      <button-comp :name="account ? 'Propose' : 'Please Connect Wallet'"
                   :type="type === 'A' ? 'primary' : 'primary-typeB'"
                   :width="'160px'"
                   :status="account ? '' : 'disabled'"
                   style="margin-right: 7.5px;"
                   @on-clicked="propose"
      />
      <button-comp :name="'Close'"
                   :type="'hide'"
                   :width="'160px'"
                   style="margin-left: 7.5px;"
                   @on-clicked="close"
      />
    </div>
  </div>
</template>

<script>
import { getContractABI, getContract, getFunctionSelector, encodeParameters, encoded, getContractAddress } from '@/utils/contracts';
import { unmarshalString } from '@/utils/helpers';
import { createAgenda } from '@/api';
import web3Utils from 'web3-utils';

import { mapGetters, mapState } from 'vuex';
import Button from '@/components/Button.vue';
import TextInput from '@/components/TextInput.vue';

export default {
  components: {
    'button-comp': Button,
    'text-input': TextInput,
  },
  props: {
    contract: {
      type: String,
      default: '',
    },
    functionName: {
      type: String,
      default: '',
    },
    params: {
      type: Array,
      default: () => [],
    },
    explanation: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'A',
      validator: (value) => {
        return [
          'A',
          'B',
        ].indexOf(value) !== -1;
      },
    },
  },
  data () {
    return {
      desc: '',
    };
  },
  computed: {
    ...mapState([
      'web3',
      'account',
      'tonBalance',
      'confirmBlock',
    ]),
    ...mapGetters([
      'createAgendaFee',
    ]),
    aboutParam () {
      return index => {
        if (this.functionName === 'setSeigRates') {
          if (index === 0) return '0';
          if (index === 1) return '1';
          if (index === 2) return '2';
        }

        const depositManagerABI = getContractABI(this.contract, this.type);
        const abi = depositManagerABI.find(abi => abi.name === this.functionName);
        return abi.params[`aboutParam${index}`];
      };
    },
    exampleParam () {
      return index => {
        if (this.functionName === 'setSeigRates') {
          if (index === 0) return '0';
          if (index === 1) return '1';
          if (index === 2) return '2';
        }

        const depositManagerABI = getContractABI(this.contract, this.type);
        const abi = depositManagerABI.find(abi => abi.name === this.functionName);
        return abi.params[`exampleParam${index}`];
      };
    },
  },
  methods: {
    tooltip (index) {
      return `${this.aboutParam(index)} \n\nex) ${this.exampleParam(index)}`;
    },
    close () {
      this.$emit('on-closed');
    },
    async propose () {
      const BN = web3Utils.BN;
      if ((new BN(this.createAgendaFee)).cmp(new BN(this.tonBalance)) === 1) {
        return alert('Please check your TON amount!');
      }

      const nParams = Object.keys(this.$refs).length;
      if (this.params.length !== nParams) {
        console.log('bug'); // eslint-disable-line
      }

      let setParams = true;
      for (let i = 0; i < nParams; i++) {
        const value = this.$refs[Object.keys(this.$refs)[i]][0].$refs.input.value;
        if (!value) {
          this.$refs[Object.keys(this.$refs)[i]][0].error = true;
          setParams = false;
        }
      }
      if (!setParams) {
        return alert('The parameter value must be set.');
      }

      if (this.functionName === 'setSeigRates') {
        await this.proposeSetSeigRates();
        return;
      }
      const account = this.account.toLowerCase();

      const ton = getContract('TON', this.web3);
      const agendaManager = getContract('DAOAgendaManager', this.web3);
      const proxy = getContract('DAOCommitteeProxy', this.web3);

      const [
        noticePeriod,
        votingPeriod,
        fee,
      ] = await Promise.all([
        agendaManager.methods.minimumNoticePeriodSeconds().call(),
        agendaManager.methods.minimumVotingPeriodSeconds().call(),
        agendaManager.methods.createAgendaFees().call(),
      ]);

      const selector = getFunctionSelector(this.contract, this.functionName, this.type);

      const types = [];
      const values = [];
      for (let i = 0; i < nParams; i++) {
        const type = this.params[i].type;
        const value = this.$refs[Object.keys(this.$refs)[i]][0].$refs.input.value;
        const encodedValue = encoded(type, value);
        if (encodedValue === -1) {
          console.log('bug'); // eslint-disable-line
          return;
        }

        types.push(type);
        values.push(encodedValue);
      }

      const params = encodeParameters(types, values);
      const data = unmarshalString(params);

      const bytecode = selector.concat(data);
      const target = getContractAddress(this.contract);

      const param = encodeParameters(
        ['address[]', 'uint256', 'uint256', 'bytes[]'],
        [[target], noticePeriod.toString(), votingPeriod.toString(), [bytecode]],
      );

      const gasLimit = await ton.methods.approveAndCall(proxy._address, fee, param)
        .estimateGas({
          from: account,
        });

      await ton.methods.approveAndCall(proxy._address, fee, param)
        .send({
          from: account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', async (hash) => {
          await createAgenda(account, hash, this.desc, this.type);

          this.$store.commit('SET_PENDING_TX', hash);
          this.close();

        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.$store.dispatch('launch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('receipt', async () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    async proposeSetSeigRates () {
      const account = this.account.toLowerCase();

      const ton = getContract('TON', this.web3);
      const agendaManager = getContract('DAOAgendaManager', this.web3);
      const proxy = getContract('DAOCommitteeProxy', this.web3);

      const [
        noticePeriod,
        votingPeriod,
        fee,
      ] = await Promise.all([
        agendaManager.methods.minimumNoticePeriodSeconds().call(),
        agendaManager.methods.minimumVotingPeriodSeconds().call(),
        agendaManager.methods.createAgendaFees().call(),
      ]);

      const selector1 = getFunctionSelector(this.contract, 'setPowerTONSeigRate', this.type);
      const selector2 = getFunctionSelector(this.contract, 'setDaoSeigRate', this.type);
      const selector3 = getFunctionSelector(this.contract, 'setPseigRate', this.type);

      const nParams = Object.keys(this.$refs).length;
      const types = [];
      const values = [];
      for (let i = 0; i < nParams; i++) {
        const type = this.params[i].type;
        const value = this.$refs[Object.keys(this.$refs)[i]][0].$refs.input.value;
        console.log(i, type, value); // eslint-disable-line
        const encodedValue = encoded(type, value);
        if (encodedValue === -1) {
          console.log('bug'); // eslint-disable-line
          return;
        }

        types.push(type);
        values.push(encodedValue);
      }
      const params1 = encodeParameters([types[0]], [values[0]]);
      const params2 = encodeParameters([types[1]], [values[1]]);
      const params3 = encodeParameters([types[2]], [values[2]]);

      const data1 = unmarshalString(params1);
      const data2 = unmarshalString(params2);
      const data3 = unmarshalString(params3);

      const bytecode1 = selector1.concat(data1);
      const bytecode2 = selector2.concat(data2);
      const bytecode3 = selector3.concat(data3);
      const target = getContractAddress(this.contract);

      const param = encodeParameters(
        ['address[]', 'uint256', 'uint256', 'bytes[]'],
        [[target, target, target], noticePeriod.toString(), votingPeriod.toString(), [bytecode1, bytecode2, bytecode3]],
      );

      const gasLimit = await ton.methods.approveAndCall(proxy._address, fee, param)
        .estimateGas({
          from: account,
        });

      await ton.methods.approveAndCall(proxy._address, fee, param)
        .send({
          from: account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', async (hash) => {
          await createAgenda(account, hash, this.desc, this.type);

          this.$store.commit('SET_PENDING_TX', hash);
          this.close();
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.$store.dispatch('launch');
            await this.$store.dispatch('connectEthereum', this.web3);
          }
        })
        .on('receipt', async () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-propose {
  position: relative;
  padding-left: 15px;
  padding-right: 15px;

  max-height: 90vh;
  overflow-y: scroll;

  > img {
    position: absolute;
    right: 30px;
    top: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  > .function {
    font-family: Roboto;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;

    padding-top: 25px;
    margin-bottom: 5px;
  }

  > .function-explanation {
    width: 90%;

    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;

    color: #818992;

    margin-bottom: 30px;

    white-space: pre-wrap;
  }

  .argument-container {
    display: flex;
    flex-direction: column;
  }

  .argument {
    flex: 1;

    margin-bottom: 16px;
  }
  .label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2d3136;

    margin-bottom: 10px;
  }

  .button-container {
    display: flex;
    justify-content: center;

    margin-top: 20px;
    padding-bottom: 20px;
  }
  .description-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .description {
    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2d3136;

    margin-bottom: 10px;

    flex: 1;
  }
  .amount-container {
    > span {
      white-space: pre-wrap;

      font-family: Roboto;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.6;
      letter-spacing: normal;
      text-align: right;

      color: #c9d1d8;
    }

    .amount {
      color: #434b52
    }
  }

  textarea {
    width: 100%;

    border: solid 1px #dfe4ee;
    border-radius: 4px;

    outline: none;

    padding: 8px 16px;

    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.22px;
    color: #3e495c;

    resize: none;

    &::placeholder {
      color: #86929d;
    }

    &:hover {
      border: 1px solid #c9d1d8;
    }

    &:focus {
      border: 1px solid #2a72e5;
    }
  }

  .tooltip {
    width: 200px;
    position: absolute;

    left: 5px;
    top: -3px;

    z-index: 999;
  }
  .tooltip-content {
    width: 400px;
    background: #353c48;
    border-radius: 3px;

    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;

    padding: 8px;

    margin-top: -21px;
    margin-left: 4px;

    white-space: pre-wrap;
  }

  .param-container {
    display: flex;

    .tooltip-img {
      margin-top: 2x;
      margin-left: 4px;

      &:hover ~ .tooltip-container {
        display: flex;
        background: yellow;
      }
    }

    .tooltip-container {
      display: none;
      position: relative;
    }
  }
}
</style>
