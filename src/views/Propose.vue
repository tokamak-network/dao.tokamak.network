<template>
  <div class="propose">
    <div class="header">
      Propose Contract
      <div>
        Propose Contract
      </div>
    </div>
    <div class="propose">
      <div v-for="(_, i) in new Array(4)" :key="i"
           :style="[
             index !== -1 ? { 'height': 124+'px' } : { height: 320+'px' },
             index === i ? { background: '#2a72e5' } : {},
           ]"
           @click="index=i"
      >
        <img src="@/assets/propose1.svg" alt="" width="50" height="50">
        <div>
          <div class="contract-name"
               :style="[index === i ? { color: '#ffffff' } : {}]"
          >
            DAO Vault<br />Contract
          </div>
          <div class="function-count"
               :style="[index !== -1 ? { visibility: 'hidden' } : {}]"
          >
            {{ i }}
          </div>
        </div>
      </div>
    </div>
    <div class="box-container">
      <div>
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
        <box />
      </div>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box.vue';

export default {
  components: {
    'box': Box,
  },
  data () {
    return {
      index : -1,
    };
  },
};
</script>

<style lang="scss" scoped>
.propose {
  flex: 1;

  background: #fafbfc;

  > .header {
    margin-top: 40px;
    margin-left: 10%;
    margin-bottom: 100px;

    font-family: Roboto;
    font-size: 70px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #eff1f6;

    position: relative;

    white-space: nowrap;

    > div {
      position: absolute;
      left: 30px;
      bottom: 0px;

      font-family: Roboto;
      font-size: 25px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;
    }
  }

  > .propose {
    display: flex;
    justify-content: center;

    &:hover {
      cursor: pointer;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      width: 276px;
      border-radius: 15px;
      box-shadow: 0 10px 15px 0 rgba(223, 228, 238, 0.25);
      background-color: #ffffff;

      position: relative;

      transition: height 0.5s;

      margin-left: 15px;
      margin-right: 15px;

      > img {
        position: absolute;
        right: 30px;
        top: 30px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-left: 30px;
        padding-right: 20px;
        padding-bottom: 19px;
      }
    }

    .contract-name {
      font-family: Roboto;
      font-size: 24px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      color: #3e495c
    }
    .function-count {
      font-family: Roboto;
      font-size: 64px;
      font-weight: 100;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.31;
      letter-spacing: normal;
      text-align: right;
      color: #f4f6f9;
    }
  }

  .box-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 1194px;

      display: flex;
      flex-wrap: wrap;

      margin-top: 40px;
    }
  }
}
</style>
