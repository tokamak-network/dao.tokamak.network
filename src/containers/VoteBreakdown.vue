<template>
  <div class="vote-breakdown">
    <div class="review">
      <div class="container-title">Review</div>
      <div v-for="(voter, index) in ranks" :key="index" class="voted-account">
        <div class="account-info">
          <div>{{ shortAddress(voter.address) }}</div>
          <div>{{ voter.tonVoted }} TON Voted</div>
        </div>
        <vote-poll class="vote-poll"
                   :pct="calcPct(voter.tonVoted, voter.tonBalance)"
                   :margin="0"
        />
      </div>
    </div>
    <button-pagination class="vote-breakdown-pagination"
                       :datas="voters"
                       @on-selected="set"
    />
    <div class="line" />
    <div class="voting-stats">
      <div class="container-title">Voting Stats</div>
      <div class="voting-stat-item">
        <div class="voting-stat-title">Total Votes</div>
        <div class="voting-stat-content">100 TON</div>
      </div>
      <div class="voting-stat-item">
        <div class="voting-stat-title">Unique Voters</div>
        <div class="voting-stat-content">32</div>
      </div>
      <div class="voting-stat-item">
        <div class="voting-stat-title">Quorum</div>
        <div class="voting-stat-content">11</div>
      </div>
    </div>
  </div>
</template>

<script>
import VotePoll from '@/components/VotePoll.vue';
import ButtonPagination from '@/components/ButtonPagination.vue';

export default {
  components: {
    'vote-poll': VotePoll,
    'button-pagination': ButtonPagination,
  },
  data () {
    return {
      voters: [
        { index: 0, address: '0xabccscscsccscsc', tonBalance: 100, tonVoted: 60 },
        { index: 1, address: '0xabccscscsccscsc', tonBalance: 100, tonVoted: 50 },
        { index: 2, address: '0xabccscscsccscsc', tonBalance: 100, tonVoted: 40 },
        { index: 3, address: '0xabccscscsccscsc', tonBalance: 100, tonVoted: 30 },
        { index: 4, address: '0xabccscscsccscsc', tonBalance: 100, tonVoted: 20 },
        { index: 5, address: '0xabccscscsccscsc', tonBalance: 95, tonVoted: 10 },
        { index: 6, address: '0xabccscscsccscsc', tonBalance: 95, tonVoted: 10 },
        { index: 7, address: '0xabccscscsccscsc', tonBalance: 95, tonVoted: 10 },
        { index: 8, address: '0xabccscscsccscsc', tonBalance: 95, tonVoted: 10 },
      ],
      ranks: [],
    };
  },
  created () {
    this.ranks = this.voters.slice(0, 4);
  },
  methods: {
    shortAddress (account) {
      return `${account.slice(0, 5)}...`;
    },
    calcPct (voted, balance) {
      return Number(voted * 100 / balance);
    },
    set (page) {
      const first = page * 4;
      this.ranks = this.voters.slice(first, first+4);
    },
  },
};
</script>

<style>
.vote-breakdown {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.container-title {
  font-family: Roboto;
  height: 21px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
  margin: 0 0 15px 0;
}
.voted-account {
  margin: 0 0 15px;
}
.account-info {
  display: flex;

  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #818992;
  margin-bottom: 7px;
}
.account-info > div:nth-child(2) {
  flex: 1;

  display: flex;
  justify-content: flex-end;
}
.vote-poll {
  width: 100%;
}

.line {
  width: 100%;
  height: 1px;
  margin: 20px 1px 25px 0;
  background-color: #dfe4ee;
}
.voting-stat-item {
  margin-bottom: 15px;
  height: 19px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
.voting-stat-item .voting-stat-title {
  color: #818992;
  display: inline-block;
}
.voting-stat-item .voting-stat-content {
  color: #3e495c;
  float: right;
}

.vote-breakdown-pagination {
  display: flex;
  justify-content: center;
}
</style>
