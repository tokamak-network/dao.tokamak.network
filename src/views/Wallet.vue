<template>
  <div>
    {{ account }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
    };
  },
  async created () {
    await this.connectMetaMask();
  },
  methods: {
    async connectMetaMask () {
      // TODO: if account changed, page need to be refreshed
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          this.account = accounts[0];
        } catch (e) {
          return false;
        }

        console.log(ethereum.chainId); // '0x01'
        console.log(ethereum.isConnected()); // true

        const handleAccountsChanged = (accounts) => {
          if (accounts.length === 0) {
            // TODO: initialize state
            console.log('There is no accounts connected ');
          } else {
            // TODO: delete, use web3.getAccounts using wrapped web3
            this.account = accounts[0];
          }
        };
        ethereum.on('accountsChanged', handleAccountsChanged);
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
</style>
