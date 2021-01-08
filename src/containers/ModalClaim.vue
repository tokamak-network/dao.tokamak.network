<template>
  <div class="modal-claim">
    <img src="@/assets/modal-close.svg" alt="" width="30" height="30"
         @click="close"
    >
    <div class="title">You can claim 1,000 TON</div>
    <div class="question">Do you wish to continue?</div>
    <div class="button">
      <button-comp
        :name="'OK'"
        :type="'primary'"
        class="left"
        :width="'110px'"
      />
      <button-comp
        :name="'Close'"
        :type="'vote'"
        class="right"
        :width="'110px'"
        @on-clicked="close"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    'button-comp': Button,
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-claim {
  position: relative;
  padding: 45px 50px 40px 50px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;

  > img {
    position: absolute;
    right: 10px;
    top: 10px;

    &:hover {
      cursor: pointer;
    }
  }
  > .title {
    font-size: 24px;
    color: #3e495c;
    margin-bottom: 15px;
  }
  > .question {
    font-size: 14px;
    color: #818992;
    margin-bottom: 25px;
  }
  > .button {
    display: flex;
    justify-content: center;

    > .right {
      margin-left: 15px;
    }
  }
}
</style>
