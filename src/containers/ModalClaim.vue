<template>
  <div class="modal-claim">
    <img src="@/assets/modal-close.svg" alt="" width="30" height="30"
         @click="close"
    >
    <div class="title">You can claim {{ activityReward }}</div>
    <div class="question">Do you wish to continue?</div>
    <div class="button">
      <button-comp
        :name="'OK'"
        :type="'primary'"
        class="left"
        :width="'110px'"
        @on-clicked="claim"
      />
      <button-comp
        :name="'Close'"
        :type="'vote'"
        class="right"
        :width="'110px'"
        @on-clicked="close"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import { mapState } from 'vuex';
//import { getContract } from '@/utils/contracts';
import { getContractAddress } from '@/utils/contracts';
import committee from '../contracts/DAOCommittee.json';
import Web3 from 'web3';

export default {
  components: {
    'button-comp': Button,
  },
  computed: {
    ...mapState([
      'activityReward',
      'web',
      'account',
    ]),
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
    async claim () {
      let web3 = this.web3;
      if(web3  ==null) web3 = new Web3(window.ethereum);
      //const daoCommitteeProxy = getContract('DAOCommitteeProxy', this.web3, getContractAddress('DAOCommitteeProxy'));
      const daoCommitteeProxy = new web3.eth.Contract(committee.abi, getContractAddress('DAOCommitteeProxy'));
      await daoCommitteeProxy.methods.claimActivityReward().send({
        from: this.account,
      }).on('transactionHash', async (hash) => {
        this.$store.commit('SET_PENDING_TX', hash);
        this.close();
      }).on('receipt', () => {
        this.$store.commit('SET_PENDING_TX', '');
        this.$store.dispatch('setAgendas');
        this.close();
      }).on('error', (error) =>{
        //alert('error');
        console.log('error', error) ;
        this.close();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-claim {
  position: relative;
  padding: 45px 50px 40px 50px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  > img {
    position: absolute;
    right: 10px;
    top: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  > .title {
    font-size: 24px;
    color: #3e495c;
    margin-bottom: 15px;
  }
  > .question {
    font-size: 14px;
    color: #818992;
    margin-bottom: 25px;
  }
  > .button {
    display: flex;
    justify-content: center;
    > .right {
      margin-left: 15px;
    }
  }
}
</style>
