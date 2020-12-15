<template>
  <div class="poll-card-bottom">
    <div class="detail">
      <div class="Rectangle">
        <div class="Rectangle-content">
          View Details
        </div>
      </div>
      <div v-if="!active" class="winning-option">
        WINNING OPTION: YES
      </div>
      <div class="voting-status">
        You Have not voted
      </div>
    </div>
    <div v-if="active" class="your-vote">
      <div class="your-vote-header">
        YOUR VOTE
      </div>
      <select name="vote" class="select">
        <option
          class="label"
          value="Yes"
        >
          Yes
        </option>
        <option
          class="label"
          value="No"
        >
          No
        </option>
      </select>
      <div class="input-sector">
        <input class="input-box">
        <div class="input-value">
          0.00
        </div>
      </div>
      <div class="vote-button">
        <div class="vote-button-inner">
          Add vote to ballot
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: true,
    };
  },
};
</script>

<style>
.poll-card-bottom {
  /* margin-top: 25px; */
  height: 80px;
  display: inline-block;
}
.winning-option {
  width: 127px;
  height: 16px;
  margin: 33px 20px 9px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
  display: inline-block;
}
.detail {
  padding-top: 22px;
  /* display: inline-block; */
  /* margin: 25px 0 0 0; */
  float: left;
}
.your-vote {
  float: right;
  /* width: 454px; */
}
.Rectangle {
  width: 110px;
  height: 33px;
  margin: 9px 10px 0 0;
  padding: 8px 22px 9px 22px;
  border-radius: 4px;
  box-shadow: 0 3px 8px 0 rgba(49, 127, 203, 0.25);
  background-image: linear-gradient(to bottom, #1f8efa, #2a72e5);
  display: inline-block;
}
.Rectangle-content {
  width: 66px;
  height: 16px;
  /* margin: 8px, 22px, 9px, 22px; */
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}
.voting-status {
  width: 101px;
  height: 16px;
  margin: 17px 30px 9px 10px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #c9d1d8;
  display: inline-block;
}

.your-vote-header {
  width: 53px;
  height: 13px;
  margin: 3px 97px 9px 0;
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.6;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.select {
  width: 140px;
  height: 32px;
  /* margin: 10px 5px 0 73px; */
  /* padding: 8px 13px 8px 15px; */
  border-radius: 4px;
  /* -webkit-filter: blur(8px);
  filter: blur(8px); */
  box-shadow: 0 2px 4px 0 rgba(96, 97, 112, 0.14);
  background-color: #ffffff;
  display: inline-block;
}
.label {
  width: 34px;
  height: 16px;
  /* margin: 0 50px 0 0; */
  /* -webkit-filter: blur(10px);
  filter: blur(10px); */
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.2px;
  text-align: left;
  color: #86929d;
}
.input-sector {
  width: 140px;
  height: 32px;
  margin: 10px 10px 0;
  padding: 8px 9px 8px 13px;
  border-radius: 4px;
  /* -webkit-filter: blur(8px);
  filter: blur(8px); */
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
  display: inline-block;
}
.input-box {
  width: 41px;
  height: 16px;
  /* margin: 0 37px 0 0; */
  /* -webkit-filter: blur(10px);
  filter: blur(10px); */
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.2px;
  text-align: left;
  color: #3e495c;
  display: inline-block;
}
.input-value {
  width: 17px;
  height: 16px;
  margin: 0 3px 0 37px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: right;
  color: #86929d;
  display: inline-block;
}
.vote-button {
  width: 124px;
  height: 32px;
  /* margin: 0 0 0 10px; */
  padding: 8px 15px;
  border-radius: 4px;
  border: solid 1px #2a72e5;
  background-color: #ffffff;
  /* display: inline-block; */
  display: inline-block;
}
.vote-button-inner {
  width: 94px;
  height: 16px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #2a72e5;
}
</style>
