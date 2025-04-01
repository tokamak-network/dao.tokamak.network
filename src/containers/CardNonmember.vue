<template>
  <div class="card-nonmember" :class="{ mine: myCandidate }">
    <div :style="[
      $mq === 'mobile' ? { display: 'flex', flexDirection: 'column'} : {display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center'}
    ]"
    >
      <div :style="{ display: 'flex', flexDirection:'row', width:'190px', alignItem: 'center', }">
        <div class="label" :style="[ $mq === 'mobile' ? {paddingLeft: '15px'} : {marginTop: '3px'}]">Total Staked </div>
        <div class="amount" :style="[ $mq === 'mobile' ? {} : {marginTop: '3px'}]">{{ withComma(wton(candidate.vote)) }} TON</div>
      </div>
      <div class="name-container" :style="[ $mq === 'mobile' ? {marginTop: '5px', marginLeft: '15px'} : {}]">
        <div class="name">{{ candidate.name }}</div>
      <!-- <div v-if="$mq !== 'mobile'" class="type">{{ `- ${candidate.kind}` }}</div> -->
      </div>
    </div>
    <!-- </div> -->
    <div class="detail" @click="detail()">View Detail</div>
  </div>
</template>

<script>
import { WTON, withComma } from '@/utils/helpers';
import { mapGetters, mapState } from 'vuex';

export default {
  props: {
    candidate: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState([
      'account',
      'web3',
    ]),
    ...mapGetters([
      'myCandidateContracts',
    ]),
    wton () {
      return (amount) => !amount ? WTON(0) : WTON(amount);
    },
    myCandidate () {
      if (this.candidate != null && this.myCandidateContracts.indexOf(this.candidate.candidateContract) > -1) {
        return true;
      } else return false;
    },
  },
  methods: {
    detail () {
      this.$router.push({
        path: `/election/${this.candidate.candidateContract}`,
      });
    },
    withComma (n) {
      return withComma(n);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-nonmember {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 65px;

  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);

  background-color: #ffffff;

  margin-bottom: 13px;

  .label {
    font-family: Roboto;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2a72e5;

    padding-left: 30px;
    padding-right: 8px;
  }
  .amount {
    width: 94px;

    font-family: Roboto;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c
  }
  .name-container {
    display: flex;
    align-items: center;

    flex: 1;

    word-break: break-all;

    .name {
      font-family: Roboto;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;
    }

    .type {
      width: 120px;

      font-family: Roboto;
      font-size: 11px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.36;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;

      margin-top: 3px;
      margin-left: 4px;
    }
  }
  .detail {
    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2a72e5;

    margin-right: 30px;
    margin-left: 18px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: #0062c2;
    }
  }
}
.mine {
    box-shadow: 0 5px 5px 0 rgba(96, 97, 112, 0.16);
    background: linear-gradient(80deg, #EDEFF4, #FFFFFF);
  }
</style>
