<template>
  <div class="card-vote">
    <card-container :title="title">
      <template #body>
        <div class="rank-container">
          <div class="header">
            <div>Rank</div>
            <div>Candidate</div>
            <div>Total Vote</div>
          </div>
          <div class="divide"></div>
          <div v-for="(data, index) in ranks" :key="data.transactionHash"
               class="body"
          >
            <div>{{ index + 1 }}</div>
            <div>{{ data.candidateContract | hexSlicer }}</div>
            <div>{{ data.myVotes | WTON }} TON </div>
          </div>
        </div>
        <div class="button-container">
          <button-pagination class="button-pagination" :datas="myVotes" @on-selected="set" />
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonPagination from '@/components/ButtonPagination.vue';
import Card from '@/components/Card.vue';

export default {
  components: {
    'button-pagination': ButtonPagination,
    'card-container': Card,
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
  data () {
    return {
      page: 0,
    };
  },
  computed: {
    ...mapState([
      'myVotesByCandidate',
      'candidates',
    ]),
    myVotes () {
      return this.myVotesByCandidate ? this.myVotesByCandidate.filter(candidate => candidate.myVotes > 0) : [];
    },
    ranks () {
      const first = this.page * 4;
      //return this.myVotes ? this.myVotes.slice(first, first+4) : [];
      return this.candidates ? this.candidates.slice(first, first+4) : [];
    },
  },
  methods: {
    set (page) {
      this.page = page;
    },
  },
};
</script>

<style scoped>
.rank-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 162px;
}
.rank-container .header {
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 40px;
}
.rank-container .body {
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  margin-bottom: 10px;
}

.header > div {
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}

.header > div:first-child, .body > div:first-child {
  width: 60px;
  text-align: center;
}
.header > div:nth-child(2), .body > div:nth-child(2) {
  flex: 1;
  margin-left: 30px;
}
.header > div:last-child, .body > div:last-child {
  margin-right: 20px;
}
.body > div {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #3e495c;
}
.body > div:nth-child(2) {
  color: #2a72e5;
}

.divide {
  width: 100%;
  height: 1px;

  background: #dfe4ee;

  margin-bottom: 10px;
}
.button-container {
  display: flex;
  justify-content: center;
}
.button-pagination {
  margin-top: 10px;
  padding-bottom: 16px;
}
</style>
