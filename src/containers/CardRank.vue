<template>
  <div class="card-vote">
    <card-container :title="title">
      <template #body>
        <div class="rank-container">
          <div class="header">
            <div>Rank</div>
            <div>Operators</div>
            <div>Total Voted</div>
          </div>
          <div class="divide"></div>
          <div v-for="(data, index) in ranks" :key="index"
               class="body"
          >
            <div>{{ data.rank }}</div>
            <div>{{ data.operaotr }}</div>
            <div>{{ data.voted }}</div>
          </div>
          <button-pagination class="button-pagination" :datas="datas" @on-selected="set" />
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
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
      datas: [{ rank: 1, operaotr: '0x1234...1234', voted: '145,000' }, { rank: 2, operaotr: '0x1234...1234', voted: '145,000' },
        { rank: 3, operaotr: '0x1234...1234', voted: '145,000' },
        { rank: 4, operaotr: '0x1234...1234', voted: '145,000' },
        { rank: 5, operaotr: '0x1234...1234', voted: '145,000' },
        { rank: 6, operaotr: '0x1234...1234', voted: '145,000' },
        { rank: 7, operaotr: '0x1234...1234', voted: '145,000' },
        { rank: 8, operaotr: '0x1234...1234', voted: '145,000' } ],
      ranks: [],
    };
  },
  created () {
    this.ranks = this.datas.slice(0, 4);
  },
  methods: {
    set (page) {
      const first = page * 4;
      this.ranks = this.datas.slice(first, first+4);
    },
  },
};
</script>

<style scoped>
.rank-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  line-height: 2.17;
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
  line-height: 1.73;
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
.button-pagination {
  margin-top: 10px;
  padding-bottom: 16px;
}
</style>
