<template>
  <div class="card-stats">
    <card-container :title="'Your Stats'">
      <template #body>
        <div class="stats">
          <div class="title">Claimable TON</div>
          <div class="content">100 TON</div>
        </div>
        <div class="stats">
          <div class="title"># of Voted</div>
          <div class="content">7 Polls</div>
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    'card-container': Card,
  },
};
</script>

<style scoped>
.card-stats {
}

.stats {
  display: flex;
  align-items: center;

  padding-left: 16px;
  padding-right: 16px;
}
.stats:first-child {
  padding-top: 16px;
  margin-bottom: 16px;
}
.stats:last-child {
  padding-bottom: 16px;
}

.stats .title {
  flex: 1;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
.stats .content {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;
}
</style>
