<template>
  <div class="card-stats-committee">
    <card-container :title="'Committee Stats'">
      <template #body>
        <div class="stats-committee">
          <div class="title">Total Agendas</div>
          <div class="content">{{ agendas.length }}</div>
        </div>
        <div class="stats-committee">
          <div class="title">Total Executed Agendas</div>
          <div class="content">{{ executedAgenda() }}</div>
        </div>
        <div class="stats-committee">
          <div class="title">Total Denied Agendas</div>
          <div class="content">{{ denidedAgenda() }}</div>
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapState } from 'vuex';

export default {
  components: {
    'card-container': Card,
  },
  computed: {
    ...mapState([
      'agendas',
    ]),
    executedAgenda () {
      return () => {
        const executed = [];
        for (const agenda of this.agendas) {
          if (agenda.executed === true) {
            executed.push(agenda);
          }
        }
        return executed.length;
      };
    },
    denidedAgenda () {
      return () => {
        const denied = [];
        for (const agenda of this.agendas) {
          if (agenda.result === 2) {
            denied.push(agenda);
          }
        }
        return denied.length;
      };
    },
  },
};
</script>

<style scoped>
.card-stats-committee{
}

.stats-committee {
  display: flex;
  align-items: center;
}
.stats-committee:first-child {
  padding-top: 16px;
}
.stats-committee:last-child {
  padding-bottom: 16px;
}
.stats-committee:nth-child(2) {
  margin-top: 16px;
  margin-bottom: 16px;
}

.stats-committee .title {
  flex: 1;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;

  padding-left: 16px;

}
.stats-committee .content {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;

  padding-right: 16px;
}
</style>
