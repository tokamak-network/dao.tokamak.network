<template>
  <div class="committee-info-vote">
    <div class="review">
      <div class="container-title">Review</div>
      <div v-for="voter in selectedVoters" :key="voter.account" class="voted-account">
        <div class="account-info">
          <div>{{ voter.account }}</div>
          <div>{{ voter.balance | WTON | withComma }} TON Voted</div>
        </div>
        <vote-poll class="vote-poll"
                   :pct="calcPct(voter.balance, sumOfVotes)"
                   :margin="0"
        />
      </div>
    </div>
    <button-pagination class="committee-info-vote-pagination"
                       :datas="votersWithBalance"
                       @on-selected="set"
    />
    <div class="line" />
    <div class="voting-stats">
      <div class="container-title">Voting Stats</div>
      <div class="voting-stat-item">
        <span class="voting-stat-title">Total Vote</span>
        <span class="voting-stat-content">{{ sumOfVotes | WTON | withComma }} TON</span>
      </div>
      <div class="voting-stat-item">
        <span class="voting-stat-title">Unique Voters</span>
        <span class="voting-stat-content">{{ votersWithBalance.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VotePoll from '@/components/VotePoll.vue';
import ButtonPagination from '@/components/ButtonPagination.vue';

export default {
  components: {
    'vote-poll': VotePoll,
    'button-pagination': ButtonPagination,
  },
  data () {
    return {
      address: '',
      page: 0,
    };
  },
  computed: {
    ...mapState([
      'votersByCandidate',
    ]),
    ...mapGetters([
      'candidate',
      'sumOfVotes',
      'votersWithBalance',
    ]),
    selectedVoters () {
      const first = this.page * 4;
      return this.votersWithBalance ? this.votersWithBalance.slice(first, first + 4) : [];
    },
    shortAddress () {
      return account => `${account.slice(0, 5)}...`;
    },
    calcPct () {
      return (vote, totalVotes) => Number(vote * 100 / totalVotes);
    },
  },
  methods: {
    set (page) {
      this.page = page;
    },
  },
};
</script>

<style>
.committee-info-vote {
  display: flex;
  flex-direction: column;

  height: 410px;
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

.committee-info-vote-pagination {
  display: flex;
  justify-content: center;
}
</style>
