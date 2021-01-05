<template>
  <div class="modal-propose">
    <img src="@/assets/modal-close.svg" alt="" width="30" height="30"
         @click="close"
    >
    <div class="function">DAO Vault Contract</div>
    <div class="argument-container">
      <div class="argument" style="margin-right: 15px;">
        <div class="label">To</div>
        <text-input />
      </div>
      <div class="argument" style="margin-left: 15px;">
        <div class="label">Amount</div>
        <text-input />
      </div>
    </div>
    <div class="label">Description</div>
    <textarea id="" name="" cols="30" rows="10" style="width: 100%;"></textarea>
    <div class="button-container">
      <button-comp :name="'Propose'" :type="'primary'" :width="'110px'"
                   style="margin-right: 7.5px;"
      />
      <button-comp :name="'Close'" :type="'hide'" :width="'110px'"
                   style="margin-left: 7.5px;"
                   @on-clicked="close"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import TextInput from '@/components/TextInput.vue';

export default {
  components: {
    'button-comp': Button,
    'text-input': TextInput,
  },
  methods: {
    close () {
      this.$emit('on-closed');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-propose {
  position: relative;
  padding-left: 15px;
  padding-right: 15px;

  > img {
    position: absolute;
    right: 30px;
    top: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  > .function {
    font-family: Roboto;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;

    padding-top: 25px;
    padding-bottom: 30px;
  }

  .argument-container {
    display: flex;

    margin-bottom: 20px;
  }

  .argument {
    flex: 1;

  }
  .label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2d3136;
  }

  .button-container {
    display: flex;
    justify-content: center;

    margin-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
