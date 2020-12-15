<template>
  <div class="ballot-counter" :class="{ 'has-ballot': ballot > 0 }">
    <img src="@/assets/ballot-counter.png" alt="" width="14" height="14">
    <span :class="{ 'has-ballot': ballot > 0 }">Your Ballot : {{ ballot }} votes</span>
  </div>
</template>

<script>
export default {
  props: {
    ballot: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.ballot-counter {
  display: flex;
  flex-direction: row;
  align-items: center;

  min-width: 135px;
  margin-right: 15px;
  padding: 8px 16px;
  border-radius: 19px;
  border: solid 1px #e6e9ed;
  background-color: #f7f8f9;
}

img {
  margin-right: 5px;
}

span {
  /* text wtyles */
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #c9d1d8;

  white-space: nowrap;
}

.has-ballot {
  background-color: #2a72e5;
  color: #ffffff;
}
</style>
