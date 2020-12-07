<template>
  <div>
    <div v-if="account">
      {{ account }}
      {{ chainId }}
      <button @click="sendTx">
        send transaction
      </button>
      {{ balance }}
    </div>
    <div v-else>
      <button @click="connect">
        connect
      </button>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import MetaCoinABI from '@/contracts/abi/MetaCoin.json';

import { mapState } from 'vuex';

export default {
  data () {
    return {
      balance: '',
    };
  },
  computed: {
    ...mapState([
      'web3',
      'account',
      'chainId',
    ]),
  },
  async created () {
    await this.connectMetaMask();
  },
  methods: {
    connect () {
      this.connectMetaMask();
    },
    async connectMetaMask () {
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
          this.$store.dispatch('connectEthereum', web3);
        };
        ethereum.on('accountsChanged', handleAccountsChanged);
        ethereum.on('networkChanged', handleNetworkChanged);
      } else {
        // MetaMask need to be installed.
      }
    },
    async sendTx () {
      const contract = new this.web3.eth.Contract(MetaCoinABI, '0x6bABDD82F21D43C1a6253ca01278482BcbB9cb45');

      const balance = await contract.methods.getBalance(this.account).call();
      this.balance = balance;

      // success transaction.
      contract.methods.sendCoin('0xECcc0320875E446283bb32d5C7F8378dBA5dF451', '100').send({ from: this.account })
        .on('transactionHash', async (hash) => {
          console.log(hash);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(confirmationNumber, receipt); // up to 24 confirms.
        })
        .on('receipt', (receipt) => {
          console.log(receipt);
        })
        .on('error', (error) => {
          console.log(error);
        });

      // fail transaction
      contract.methods.revert().send({ from: this.account })
        .on('transactionHash', async (hash) => {
          console.log(hash);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(confirmationNumber, receipt); // up to 24 confirms.
        })
        .on('receipt', (receipt) => {
          console.log(receipt);
        })
        .on('error', (error) => {
          console.log(error.message);
          // deny or revert
        });
    },
  },
};
</script>

<style scoped>
</style>
