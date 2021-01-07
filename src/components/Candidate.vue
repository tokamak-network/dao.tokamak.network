<template>
  <div class="candidate">
    <div class="label"># of Votes</div>
    <div class="amount">90,000 TON</div>
    <div class="name">TOKAMAK</div>
    <div class="detail">View Details</div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.candidate {
  display: flex;
  align-items: center;

  width: 100%;
  height: 65px;

  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);

  background-color: #ffffff;

  margin-bottom: 13px;

  .label {
    font-family: Roboto;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2a72e5;

    padding-left: 30px;
    padding-right: 8px;
  }
  .amount {
    font-family: Roboto;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c
  }
  .name {
    flex: 1;

    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;

    padding-left: 45px;
  }
  .detail {
    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2a72e5;

    margin-right: 18px;
    margin-left: 18px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
