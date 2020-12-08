<template>
  <div>
    <button
      v-if="!web3"
      @click="connect"
    >
      connect
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
          this.$store.dispatch('disconnectEthereum', web3);
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

</style>
