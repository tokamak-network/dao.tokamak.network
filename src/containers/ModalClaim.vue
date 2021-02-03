<template>
  <div class="modal-claim">
    <img src="@/assets/modal-close.svg" alt="" width="30" height="30"
         @click="close"
    >
    <div class="title">You can claim {{ activityReward }}</div>
    <div v-if="canClaimValue" class="question">Do you wish to continue?</div>
    <div v-else class="question">There is no activity fee to be paid.</div>
    <div class="button">
      <button-comp v-if="canClaimValue"
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
import { getContract } from '@/utils/contracts';
import Web3 from 'web3';

export default {
  components: {
    'button-comp': Button,
  },
  computed: {
    ...mapState([
      'activityReward',
      'confirmBlock',
      'web',
      'account',
      'agendaVotesByCandidates',
    ]),
    canClaimValue (){
      let _amount = this.activityReward;
      _amount = _amount.replaceAll('TON', '');
      _amount =_amount.replaceAll(' ', '');
      if( _amount !== '0.000000000000000000' && _amount !== '0' && _amount !== '0.00' ){
        return true;
      }else return false;
    },
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
    async claim () {
      let web3 = this.web3;
      if(web3  == null) web3 = new Web3(window.ethereum);
      const daoCommitteeProxy = getContract('DAOCommitteeProxy', web3);
      try{
        await daoCommitteeProxy.methods.claimActivityReward().send({
          from: this.account,
        })
          .on('transactionHash', async (hash) => {
            this.$store.commit('SET_PENDING_TX', hash);
            this.close();
          })
          .on('confirmation', async (confirmationNumber) => {
            if (this.confirmBlock === confirmationNumber) {
              this.$store.dispatch('setAgendas');
            }
          })
          .on('receipt', () => {
            this.$store.commit('SET_PENDING_TX', '');
            this.$store.dispatch('setActivityReward');
          })
          .on('error', () => {
            this.$store.commit('SET_PENDING_TX', '');
          });
      }catch(err){
        //console.log('err', err); // eslint-disable-line
      }
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
