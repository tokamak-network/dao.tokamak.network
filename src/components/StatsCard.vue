<template>
  <div>
    <card-title :title="title" />
    <div class="stat-card">
      <div v-for="(item, index) in data" :key="index" class="item">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  components: {
    'card-title': Title,
  },
  props: {
    'title': {
      type: String,
      default: '',
    },
    'data': {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.stat-card {
  width: 378px;
  /* margin: 12px 0 0; */
  padding: 20px 0 1px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
.item {
  margin: 0 20px 20px;
}
.item-title {
  font-family: Roboto;
  font-size: 15px;
  display: inline-block;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
  position: absolute;
}
.item-content {
  font-family: Roboto;
  font-size: 15px;
  display: inline-block;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;
  width: 100%;
  position: relative;
  margin-right: 20px;
}
</style>
