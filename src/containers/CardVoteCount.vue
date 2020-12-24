<template>
  <div class="card-vote-count">
    <card-container :title="'Your Vote'">
      <template #body>
        <div class="label">
          <span>You</span>
          <span class="blue"> Voted </span>
          <span>for this Slot</span>
        </div>
        <div class="divide" />
        <div class="content">
          <span>Voted</span>
          <span>40.0 TON</span>
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
.card-vote-count .label {
  height: 96px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #3e495c;
}
.card-vote-count .label > span {
  white-space: pre-wrap;
}
.card-vote-count .content {
  height: 65px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 20px;
  padding-right: 20px;
}
.card-vote-count .content > span:nth-child(1) {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #86929d;
}
.card-vote-count .content > span:nth-child(2) {
  white-space: pre-wrap;

  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #3e495c;
}

.blue {
  color: #2a72e5;
}
.divide {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;
}
</style>
