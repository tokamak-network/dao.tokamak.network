<template>
  <div class="button-step">
    <button @click="onClicked">
      <img v-if="type === 'prev'"
           class="prev"
           src="@/assets/arrow-prev.png" alt="" width="8" height="9"
      >
      <span>{{ name }}</span>
      <img v-if="type === 'next'"
           class="next"
           src="@/assets/arrow-next.png" alt="" width="8" height="9"
      >
    </button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  extends: Button,
  props: {
    type: {
      type: String,
      default: '',
      validator: (value) => {
        return [
          'prev',
          'next',
        ].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style scoped>
button {
  width: 110px;
  height: 32px;

  border-radius: 4px;
  border: solid 1px #dfe4ee;
  background-color: #ffffff;

  outline: none;
}
button:hover {
  cursor: pointer;
  border: solid 1px #3e495c;
}
button:hover span {
  color: #3e495c;
}
button:hover img {
  filter: brightness(50%);
}
.button-step {
  width: 110px;
}

span {
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #86929d;
}

.prev {
  margin-right: 6px;
}

.next {
  margin-left: 6px;
}
</style>
