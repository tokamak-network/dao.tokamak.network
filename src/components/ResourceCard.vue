<template>
  <div>
    <card-title :title="title" />
    <div class="resource-card">
      <div class="content">
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://tokamak.network"
        >Tokamak Forum</a>
      </div>
      <div class="content">
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://tokamak.network"
        >Governance FAQs</a>
      </div>
      <div class="content">
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://tokamak.network"
        >Tokamak Network Homepage</a>
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
.resource-card {
  width: 378px;
  margin: 12px 0 0;
  padding: 10px 0px 10px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
.content {
  margin: 10px 0 10px 20px;
  font-family: Roboto;
  font-size: 15px;
  padding-left: 30px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
  text-align: left;
  color: #2a72e5;
  background: url('../assets/resources-icon.svg') no-repeat 0% 45%;
  background-size: 14px;
}
.link {
  text-decoration: none;
}
</style>
