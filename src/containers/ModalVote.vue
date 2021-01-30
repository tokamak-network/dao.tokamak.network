<template>
  <div class="modal-vote">
    <img src="@/assets/modal-close.svg" alt="" width="30" height="30"
         @click="close"
    >
    <div class="function">Agenda#{{ id }} Confirm Vote </div>
    <div class="sub-title">
      <span>
        You are voting for the following candidate/commitee<br>
        ** withdrawal takes at least 2 weeks **
      </span>
    </div>
    <div class="content">
      <span>
        <span class="blue">
          0xabc..
        </span>
        is
        <span class="blue">
          Nominated
        </span>
        to Committee member
      </span>
    </div>
    <div class="select">
      <div class="hint">Yes / No / Abstain</div>
      <dropdown :items="['Yes', 'No', 'Abstain']"
                :hint="'Yes'"
                :button-type="'a'"
                :selector-type="'a'"
                class="dropdown"
                @on-selected="select"
      />
    </div>
    <div class="comment">
      <div class="reason">Why are you voting for this poll?</div>
      <textarea v-model="comment" name="" cols="30" rows="5" style="width: 100%;" class="textarea" />
    </div>
    <button-comp
      :name="'Vote'"
      :type="'secondary'"
      style="margin-top: 25px;"
      @on-clicked="vote"
    />
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
import Button from '@/components/Button.vue';

// import Web3 from 'web3';
import { mapState } from 'vuex';
import { isVotableStatusOfAgenda } from '@/utils/contracts';
import candidate from '../contracts/Candidate.json';

export default {
  components: {
    'dropdown': Dropdown,
    'button-comp': Button,
  },
  props: {
    id: {
      required: true,
      type: Number,
    },
  },
  data () {
    return {
      choice: 1,
      comment: '',
    };
  },
  computed: {
    ...mapState([
      'account', // TODO: use nonmembers
      'web3',
      'members',
      'candidates',
    ]),
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
    select (item) {
      if (item === 'Yes') {
        this.choice = 1;
      } else if (item === 'No') {
        this.choice = 2;
      } else {
        this.choice = 0;
      }
    },
    findCandidateContractByOperator (){
      let _candidateContract = null;
      console.log('findCandidateContractByOperator', this.candidates );
      if(this.candidates!=null && this.candidates.length > 0 ){
        for(let i=0; i< this.candidates.length; i++){
          if( this.candidates[i].operator.toLowerCase() === this.account.toLowerCase() ) _candidateContract = this.candidates[i].candidateContract;
        }
      }
      return _candidateContract;
    },
    async vote () {
      if(this.web3==null) {
        alert('Check Connect Wallet!');
        return;
      }
      const candidateContract = this.findCandidateContractByOperator();
      /*
      const committeeProxy = getContract('DAOCommitteeProxy', this.web3);
      // const daoCommittee = getContract('Candidate', this.web3);
      // const gasLimit = await daoCommittee.methods.castVote(
      //   this.id,
      //   this.choice,
      //   this.comment,
      // ).estimateGas({
      //   from: this.account,
      // });

      const candidateContract = await committeeProxy.methods.candidateContract(this.account).call();
      */
      try{
        const isVotableStatus = await isVotableStatusOfAgenda( this.id, this.web3);
        if(!isVotableStatus){
          alert('This Agenda is not in a state to vote.');
          this.close();
        }else{
          const Candidate = new this.web3.eth.Contract(candidate.abi, candidateContract);
          if(Candidate!=null){
            await Candidate.methods.castVote(
              this.id,
              this.choice,
              this.comment,
            ).send({
              from: this.account,
              // gasLimit: Math.floor(gasLimit * 1.2),
            }).on('transactionHash', async (hash) => {
              this.$store.commit('SET_PENDING_TX', hash);
              this.close();
            }).on('receipt', () => {
              this.$store.dispatch('setAgendas');
              this.$store.commit('SET_PENDING_TX', '');
              this.close();
            });
            this.close();

          }
        }

      }catch(error){
        console.log('castVote error', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-vote {
  position: relative;
  padding: 30px 30px 30px 30px;
  // padding-right: 15px;

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
    text-align: center;
    color: #3e495c;

    padding-top: 25px;
    padding-bottom: 30px;
  }

  > .sub-title {
    // display: flex;
    text-align: center;
    margin-bottom: 20px;
    font-size: 14px;
    color: #818992;
  }
  > .select {
    margin: 20px 0 20px 0;
    height: 72px;
    border-radius: 6px;
    border: solid 1px;
    border-color: #dfe4ee;
    background-color: #ffffff;
    display: flex;
    align-self: center;
    justify-content: center;
  }
  .hint {
    font-size: 10px;
    font-weight: 500;
    color: #3e495c;
    align-self: center;
    margin-right: 14px;
  }
  .dropdown {
    align-self: center;
  }

  > .argument {
    flex: 1;

  }
  > .content {
    background: #f4f6f9;
    font-size: 20px;
    text-align: center;
    color: #3e495c;
    padding: 20px 0 20px 0
  }
  .content .blue {
    color: #2a72e5;
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
  }
  .reason {
    font-size: 14px;
    color: #3e495c;
    margin-bottom: 10px;
  }

  .button-container {
    display: flex;
    justify-content: center;

    margin-top: 20px;
    padding-bottom: 20px;
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
}
</style>
