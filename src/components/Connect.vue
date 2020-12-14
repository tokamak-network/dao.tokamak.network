<template>
  <div class="connect">
    <button
      v-if="!web3"
      @click="connect"
    >
      Connect Wallet
    </button>
    <span v-else>
      account: {{ account }}
    </span>
  </div>
</template>

<script>
import Web3 from 'web3';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'web3',
      'account',
    ]),
  },
  methods: {
    async connect () {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(ethereum);
        try {
          await ethereum.request({ method: 'eth_requestAccounts' });

          this.$store.dispatch('connectEthereum', web3);
        } catch (e) {
          // User deny to connect MetaMask wallet.
        }

        const handleAccountsChanged = (accounts) => {
          if (accounts.length === 0) {
            this.$store.dispatch('disconnectEthereum');
          } else {
            this.$store.dispatch('connectEthereum', web3);
          }
        };
        const handleNetworkChanged = () => {
          this.$store.dispatch('disconnectEthereum');
        };
        ethereum.on('accountsChanged', handleAccountsChanged);
        ethereum.on('networkChanged', handleNetworkChanged);
      } else {
        // MetaMask need to be installed.
      }
    },
  },
};
</script>

<style scoped>
.connect button {
  /* font styles */
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #a6c8e9;

  width: 126px;
  height: 35px;
  padding: 7px 16px 9px;
  border-radius: 19px;
  border: solid 1px #6c9ed0;
  background: #0062c2;

  cursor: pointer;
}
</style>
