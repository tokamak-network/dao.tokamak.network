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
                       :name="'Vote'"
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
                    :value="canRevote ? String(canRevote) : undefined"
                    :label="'Available Amount'"
                    @on-clicked="setRevoteAmount"
        />
        <custom-button :type="'secondary'"
                       :name="'Revote'"
                       @on-clicked="revote"
        />
      </div>
      <div v-if="currentSelector === 2" class="unvote-container">
        <div>Available Balance {{ votesByCandidate[address] ? votesByCandidate[address] : '0.00' | WTON }} TON</div>
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
                       :name="'Unvote'"
                       @on-clicked="unvote"
        />
      </div>
      <div v-if="currentSelector === 3" class="unvote-container">
        <div>Not Withdrawable Amount {{ cannotWithdraw | WTON }} TON</div>
        <text-input ref="tonwithdraw"
                    class="withdraw-input"
                    :unit="'TON'"
                    :hint="'0.00'"
                    :readonly="true"
                    :clickable="true"
                    :value="canWithdraw ? String(canWithdraw) : undefined"
                    :label="'Withdrawable Amount'"
                    @on-clicked="setWithdrawableAmount"
        />
        <custom-button :type="'secondary'"
                       :name="'Withdraw'"
                       @on-clicked="withdraw"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { TON, marshalString, unmarshalString, padLeft, toWei } from '@/utils/helpers';
import { getContracts } from '@/utils/contracts';

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

      requests: [],
      address: '',

      // revote
      numCanRevote: 0,
      canRevote: undefined,

      numCanWithdraw: 0,
      canWithdraw: undefined,

      cannotWithdraw: undefined,
    };
  },
  computed: {
    ...mapState([
      'candidates',
      'account',
      'web3',
      'tonBalance',
      'requestsByCandidate',
      'votesByCandidate',
    ]),
    ...mapGetters([
      'candidate',
      'maxUnvote',
      'notWithdrawableRequests',
      'withdrawableRequests',
    ]),
  },
  created () {
    // revote amount
    this.address = this.$route.params.address;
    this.requests = this.requestsByCandidate[this.address];
    this.requests = [
      {
        withdrawableBlockNumber: 10,
        amount: 100,
        processed: false,
      },
      {
        withdrawableBlockNumber: 20,
        amount: 200,
        processed: false,
      },
      {
        withdrawableBlockNumber: 30,
        amount: 300,
        processed: false,
      },
    ];
    this.numCanRevote = this.requests.length;
    this.canRevote = this.requests.reduce((prev, cur) => prev + cur.amount, 0);

    // this.numCanWithdraw = this.withdrawableRequests.length;
    // this.canWithdraw = this.withdrawableRequests.reduce((prev, cur) => prev + cur.amount, 0);
    this.numCanWithdraw = this.requests.length;
    this.canWithdraw = this.requests.reduce((prev, cur) => prev + cur.amount, 0);

    // TODO: requests -> notWithdrwableRequests
    this.cannotWithdraw = this.requests.reduce((prev, cur) => prev + cur.amount, 0);
  },
  methods: {
    tonMax () {
      this.$refs.tonvote.$refs.input.value = TON(this.tonBalance);
    },
    wtonMax () {
      this.$refs.tonunvote.$refs.input.value = TON(this.tonBalance);
    },
    setRevoteAmount () {
      if (this.requests.length === 0) return;

      this.numCanRevote--;
      if (this.numCanRevote === 0) {
        this.numCanRevote = this.requests.length;
      }

      let canRevote = 0;
      for (let i = 0; i < this.numCanRevote; i++) {
        canRevote += this.requests[i].amount;
      }
      this.canRevote = canRevote;
      this.$refs.tonrevote.$refs.input.value = TON(this.canRevote);
    },
    setWithdrawableAmount () {
      // TODO: requests -> withdrawableRequests
      if (this.requests.length === 0) return;

      this.numCanWithdraw--;
      if (this.numCanWithdraw === 0) {
        this.numCanWithdraw = this.requests.length;
      }

      let canWithdraw = 0;
      for (let i = 0; i < this.numCanWithdraw; i++) {
        canWithdraw += this.requests[i].amount;
      }
      this.canWithdraw = canWithdraw;
      this.$refs.tonwithdraw.$refs.input.value = TON(this.canWithdraw);
    },
    async vote () {
      if (!this.account) return;

      const ton = getContracts('TON', this.web3);
      const wton = getContracts('WTON', this.web3);

      const amount = toWei(this.$refs.tonvote.$refs.input.value);
      const bytecode = await this.bytecodeForDeposit();

      const gasLimit = await ton.methods.approveAndCall(wton._address, amount, bytecode)
        .estimateGas({
          from: this.account,
        });

      await ton.methods.approveAndCall(wton._address, amount, bytecode)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', async (hash) => {
          alert(hash);
        })
        .on('receipt', (receipt) => {
          alert(receipt);
        });
    },
    async unvote () {
      if (!this.account) return;
      const amount = 0;

      const depositManager = getContracts('DepositManager', this.web3);
      const committeeProxy = getContracts('DAOCommitteeProxy', this.web3);

      const candidate = await committeeProxy.methods.candidateContract(this.address).call();

      const gasLimit = await depositManager.methods.requestWithdrawal(candidate, amount)
        .estimateGas({
          from: this.account,
        });

      await depositManager.methods.requestWithdrawal(candidate, amount)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        })
        .on('transactionHash', async (hash) => {
          hash;
        });
    },
    async revote () {
      if (!this.account) return;

      const depositManager = getContracts('DepositManager', this.web3);
      const committeeProxy = getContracts('DAOCommitteeProxy', this.web3);

      const candidate = await committeeProxy.methods.candidateContract(this.address).call();

      const gasLimit = await depositManager.methods.redepositMulti(candidate, this.numCanRevote)
        .estimateGas({
          from: this.account,
        });

      await depositManager.methods.redepositMulti(candidate, this.numCanRevote)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        }).on('transactionHash', async (hash) => {
          hash;
        });
    },
    async withdraw () {
      if (!this.account) return;

      const depositManager = getContracts('DepositManager', this.web3);
      const committeeProxy = getContracts('DAOCommitteeProxy', this.web3);

      const candidate = await committeeProxy.methods.candidateContract(this.address).call();

      const gasLimit = await depositManager.methods.processRequests(candidate, this.numCanWithdraw, true)
        .estimateGas({
          from: this.account,
        });

      await depositManager.methods.processRequests(candidate, this.numCanWithdraw, true)
        .send({
          from: this.account,
          gasLimit: Math.floor(gasLimit * 1.2),
        }).on('transactionHash', async (hash) => {
          hash;
        });
    },
    async bytecodeForDeposit () {
      const committeeProxy = getContracts('DAOCommitteeProxy', this.web3);
      const depositManager = getContracts('DepositManager', this.web3);

      const candidate = await committeeProxy.methods.candidateContract(this.address).call();

      const bytecode = marshalString(
        [depositManager._address, candidate]
          .map(unmarshalString)
          .map(str => padLeft(str, 64))
          .join(''),
      );
      return bytecode;
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
