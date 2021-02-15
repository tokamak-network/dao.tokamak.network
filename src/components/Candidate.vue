<template>
  <div class="candidate" :class="{ mine: myCandidate }">
    <div class="label"># of Votes </div>
    <div class="amount">{{ wton(candidate.vote) | withComma }} TON</div>
    <div class="name">{{ candidate.name }}</div>
    <div class="detail" @click="detail()">View Detail</div>
  </div>
</template>

<script>
import { WTON } from '@/utils/helpers';
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
  },
};
</script>

<style lang="scss" scoped>
.candidate {
  display: flex;
  align-items: center;

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
  .name {
    flex: 1;

    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;
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

    margin-right: 18px;
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
