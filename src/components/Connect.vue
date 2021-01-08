<template>
  <div class="connect">
    <button
      v-if="!account"
      :class="{ sub: isSub }"
      @click="connect"
    >
      Connect Wallet
    </button>
    <div v-else class="account">
      <div ref="icon" class="icon"></div>
      <div class="address">
        {{ shortAddress }}
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import { mapState } from 'vuex';
import jazzicon from '@metamask/jazzicon';

export default {
  props: {
    isSub: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState([
      'web3',
      'account',
    ]),
    shortAddress () {
      return `${this.account.slice(0, 7)}...${this.account.slice(-4)}`;
    },
    iconNumber () {
      return parseInt(this.account.slice(2, 10), 16);
    },
  },
  mounted () {
    this.setIcon();
  },
  methods: {
    async connect () {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(ethereum);
        try {
          await ethereum.request({ method: 'eth_requestAccounts' });

          await this.$store.dispatch('connectEthereum', web3);
          this.setIcon();
        } catch (e) {
          // User deny to connect MetaMask wallet.
        }

        const handleAccountsChanged = async (accounts) => {
          if (accounts.length === 0) {
            this.$store.dispatch('disconnectEthereum');
          } else {
            await this.$store.dispatch('connectEthereum', web3);
            this.setIcon();
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
    setIcon () {
      const icon = jazzicon(25, this.iconNumber);
      const iconEle = this.$refs.icon;
      if (iconEle) {
        if (iconEle.childElementCount === 1) {
          iconEle.removeChild(iconEle.lastElementChild);
        }
        iconEle.append(icon);
      }
    },
  },
};
</script>

<style scoped>
button {
  /* font styles */
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #a6c8e9;

  height: 35px;
  padding: 7px 16px 9px;
  border-radius: 19px;
  border: solid 1px #6c9ed0;
  background: #0062c2;

  cursor: pointer;
  white-space: nowrap;
}

.sub {
  color: #86929d;

  border-radius: 19px;
  border: solid 1px #d7d9df;
  background: #ffffff;
}

.account {
  display: flex;
  align-items: center;

  padding: 5px 21px 5px 13px;
  border-radius: 19px;
  border: solid 1px #d7d9df;
  background-color: #ffffff;
}

.address {
  /* text styles */
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}

.icon {
  margin-right: 8px;
  margin-bottom: -5px;
}
</style>
