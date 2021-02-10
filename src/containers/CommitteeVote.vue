<template>
  <div class="committee-vote">
    <div class="header">
      <div :class="{ selected: currentSelector === 0 }" @click="currentSelector = 0">Vote</div>
      <div :class="{ selected: currentSelector === 1 }" @click="currentSelector = 1">Revote</div>
      <div :class="{ selected: currentSelector === 2 }" @click="currentSelector = 2">Unvote</div>
      <div :class="{ selected: currentSelector === 3 }" @click="currentSelector = 3">Withdraw</div>
    </div>
    <div class="body">
      <div v-if="currentSelector === 0" class="vote-container">
        <div>Available Balance {{ tonBalance | TON }} TON</div>
        <div>
          <text-input ref="tonvote"
                      class="vote-input"
                      :unit="'TON'"
                      :hint="'0.00'"
          />
          <custom-button class="vote-max"
                         :name="'MAX'"
                         :type="'vote'"
                         :width="'100px'"
                         @on-clicked="tonMax"
          />
        </div>
        <custom-button :type="'secondary'"
                       :name="account ? 'Vote' : 'Please connect wallet'"
                       :disabled="account ? false : true"
                       @on-clicked="vote"
        />
      </div>
      <div v-if="currentSelector === 1">
        <text-input ref="tonrevote"
                    class="revote-input"
                    :unit="'TON'"
                    :hint="'0.00'"
                    :big="true"
                    :readonly="true"
                    :clickable="true"
                    :value="canRevote(address, revoteIndex) ? wton(canRevote(address, revoteIndex)) : undefined"
                    :label="'Available Amount'"
                    @on-clicked="setRevoteAmount"
        />
        <custom-button :type="'secondary'"
                       :name="account ? 'Revote' : 'Please connect wallet'"
                       :disabled="!account || !canRevote(address, revoteIndex) ? true : false"
                       @on-clicked="revote"
        />
      </div>
      <div v-if="currentSelector === 2" class="unvote-container">
        <div>Available Balance {{ myVotes | WTON }} TON</div>
        <div>
          <text-input ref="tonunvote"
                      class="unvote-input"
                      :unit="'TON'"
                      :hint="'0.00'"
          />
          <custom-button class="unvote-max"
                         :name="'MAX'"
                         :type="'vote'"
                         :width="'100px'"
                         @on-clicked="wtonMax"
          />
        </div>
        <custom-button :type="'secondary'"
                       :name="account ? 'Unvote' : 'Please connect wallet'"
                       :disabled="account ? false : true"
                       @on-clicked="unvote"
        />
      </div>
      <div v-if="currentSelector === 3" class="unvote-container">
        <div>Not Withdrawable Amount {{ cannotWithdraw ? wton(cannotWithdraw) : 0 }} TON</div>
        <text-input ref="tonwithdraw"
                    class="withdraw-input"
                    :unit="'TON'"
                    :hint="'0.00'"
                    :readonly="true"
                    :clickable="true"
                    :value="canWithdraw(address, withdrawIndex) ? wton(canWithdraw(address, withdrawIndex)) : undefined"
                    :label="'Withdrawable Amount'"
                    @on-clicked="setWithdrawableAmount"
        />
        <custom-button :type="'secondary'"
                       :name="account ? 'Withdraw' : 'Please connect wallet'"
                       :disabled="!account || !canWithdraw(address, revoteIndex) ? true : false"
                       @on-clicked="withdraw"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { TON, WTON, marshalString, unmarshalString, padLeft, toWei, toRay } from '@/utils/helpers';
import { getContract } from '@/utils/contracts';
import web3Utils from 'web3-utils';

import { mapState, mapGetters } from 'vuex';
import Button from '@/components/Button.vue';
import TextInput from '@/components/TextInput.vue';

export default {
  components: {
    'text-input': TextInput,
    'custom-button': Button,
  },
  data () {
    return {
      currentSelector: 0,

      address: '',

      revoteIndex: 0,
      withdrawIndex: 0,
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
      'tonBalance',
      'confirmBlock',
      'myVotes',
    ]),
    ...mapGetters([
      'candidate',
      'notWithdrawableRequests',
      'withdrawableRequests',
      'numCanRevote',
      'canRevote',
      'numCanWithdraw',
      'canWithdraw',
      'requests',
    ]),
    cannotWithdraw () {
      const requests = this.notWithdrawableRequests(this.address);
      const amount = requests.reduce((prev, cur) => prev + parseInt(cur.amount), 0);
      return amount;
    },
    wton () {
      return (amount) => !amount ? WTON(0) : WTON(amount);
    },
  },
  watch: {
    '$route.params.address': {
      handler: async function () {
        this.address = this.$route.params.address;
      },
      deep: true,
      immediate: true,
    },
    currentSelector (newSelector, oldSelector) {
      if (oldSelector === 2 && newSelector === 0) {
        this.$refs.tonunvote.$refs.input.value = null;
      } else if (oldSelector === 0 && newSelector === 2) {
        this.$refs.tonvote.$refs.input.value = null;
      } else if (newSelector === 1) {
        this.revoteIndex = 0;
      } else if (newSelector === 3) {
        this.withdrawIndex = 0;
      }
    },
  },
  created () {
    this.address = this.$route.params.address;
  },
  methods: {
    tonMax () {
      if (this.tonBalance && this.tonBalance > 0) {
        this.$refs.tonvote.$refs.input.value = TON(this.tonBalance);
      }
    },
    wtonMax () {
      if (this.myVotes && this.myVotes > 0) {
        this.$refs.tonunvote.$refs.input.value = WTON(this.myVotes);
      }
    },
    setRevoteAmount () {
      const requests = this.requests(this.address);
      this.revoteIndex + 1 === requests.length ? this.revoteIndex = 0 : this.revoteIndex++;
    },
    setWithdrawableAmount () {
      const requests = this.withdrawableRequests(this.address);
      this.withdrawIndex + 1 === requests.length ? this.withdrawIndex = 0 : this.withdrawIndex++;
    },
    async vote () {
      if (!this.account) return;
      const BN = web3Utils.BN;

      const ton = getContract('TON', this.web3);
      const wton = getContract('WTON', this.web3);

      const amount = toWei(this.$refs.tonvote.$refs.input.value);
      if (String(amount) === '0') {
        return alert('Please input amount!');
      }
      if (String(this.tonBalance) === '0') {
        return alert('Please check your TON amount!');
      }
      if ((new BN(amount)).cmp(new BN(this.tonBalance)) === 1) {
        return alert('Please check your TON amount!');
      }
      const data = await this.dataForDeposit();

      const gasLimit = await ton.methods.approveAndCall(wton._address, amount, data)
        .estimateGas({
          from: this.account,
        });

      await ton.methods.approveAndCall(wton._address, amount, data)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.$refs.tonvote.$refs.input.value = null;
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.update();
          }
        })
        .on('receipt', () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    async unvote () {
      if (!this.account) return;
      const BN = web3Utils.BN;

      const depositManager = getContract('DepositManager', this.web3);
      const candidate = this.candidate(this.address);

      const candidateContract = candidate.kind === 'layer2' ? candidate.candidate : candidate.candidateContract;
      const amount = toRay(this.$refs.tonunvote.$refs.input.value);

      if (String(amount) === '0') {
        return alert('Please input amount!');
      }
      if (String(this.myVotes) === '0') {
        return alert('Please check your TON amount!');
      }
      if ((new BN(amount)).cmp(new BN(this.myVotes)) === 1) {
        return alert('Please check your TON amount!!');
      }

      const gasLimit = await depositManager.methods.requestWithdrawal(candidateContract, amount)
        .estimateGas({
          from: this.account,
        });

      await depositManager.methods.requestWithdrawal(candidateContract, amount)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.$refs.tonunvote.$refs.input.value = null;
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.update();

            this.revoteIndex = 0;
            this.withdrawIndex = 0;
          }
        })
        .on('receipt', () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    async revote () {
      if (!this.account) return;

      const depositManager = getContract('DepositManager', this.web3);

      const candidate = this.candidate(this.address);
      const candidateContract = candidate.kind === 'layer2' ? candidate.candidate : candidate.candidateContract;

      const gasLimit = await depositManager.methods.redepositMulti(candidateContract, this.numCanRevote(this.address, this.revoteIndex))
        .estimateGas({
          from: this.account,
        });

      await depositManager.methods.redepositMulti(candidateContract, this.numCanRevote(this.address, this.revoteIndex))
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', (hash) => {
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.update();

            this.revoteIndex = 0;
            this.withdrawIndex = 0;
          }
        })
        .on('receipt', () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    async withdraw () {
      if (!this.account) return;

      const depositManager = getContract('DepositManager', this.web3);

      const candidate = this.candidate(this.address);
      const candidateContract = candidate.kind === 'layer2' ? candidate.candidate : candidate.candidateContract;

      const gasLimit = await depositManager.methods.processRequests(candidateContract, this.numCanWithdraw, true)
        .estimateGas({
          from: this.account,
        });

      await depositManager.methods.processRequests(candidateContract, this.numCanWithdraw, true)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', async (hash) => {
          this.$store.commit('SET_PENDING_TX', hash);
        })
        .on('confirmation', async (confirmationNumber) => {
          if (this.confirmBlock === confirmationNumber) {
            this.$store.commit('SET_PENDING_TX', '');
            await this.update();

            this.revoteIndex = 0;
            this.withdrawIndex = 0;
          }
        })
        .on('receipt', () => {
        })
        .on('error', () => {
          this.$store.commit('SET_PENDING_TX', '');
        });
    },
    async dataForDeposit () {
      const depositManager = getContract('DepositManager', this.web3);

      const candidate = this.candidate(this.address);
      const candidateContract = candidate.kind === 'layer2' ? candidate.candidate : candidate.candidateContract;

      const data = marshalString(
        [depositManager._address, candidateContract]
          .map(unmarshalString)
          .map(str => padLeft(str, 64))
          .join(''),
      );
      return data;
    },
    async update () {
      await this.$store.dispatch('launch');
      await this.$store.dispatch('connectEthereum', this.web3);
      await this.$store.dispatch('setMyVotes', this.address);
    },
  },
};
</script>

<style lang="scss" scoped>
.committee-vote {
  height: 410px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-bottom: 100px;
}
.committee-vote .header {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.committee-vote .header > div {
  width: 85px;
  height: 47px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #86929d;

  border-bottom: solid 1px #ffffff;

  cursor: pointer;
}
.committee-vote .header > .selected {
  border-bottom: solid 1px #2a72e5;
  color: #2a72e5;
}

.committee-vote .body {
  width: 100%;
  max-width: 378px;
  /* padding: 15px; */
  border-radius: 10px;
  border: solid 1px #dfe4ee;
  background-color: #ffffff;

  padding: 15px;
}
.committee-vote .vote-container > div:nth-child(1), .committee-vote .unvote-container > div:nth-child(1) {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.committee-vote .vote-container > div:nth-child(2), .committee-vote .unvote-container > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 15px;
  margin-bottom: 15px;
}

.vote-input, .unvote-input {
  flex: 1;
}
.vote-max, .unvote-max {
  width: 100px;
  margin-left: 5px;
}

.revote-input, .withdraw-input {
  margin-top: 10px;
  margin-bottom: 21px;
}
</style>
