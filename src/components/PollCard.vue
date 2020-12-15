<template>
  <div class="poll-card">
    <poll-card-type
      :type="'nominate'"
      :status="'In progress'"
      :candidate="'0xabcfe…'"
    />
    <div class="poll-card-title">
      ETH-B Debt Ceiling Instant Access Module - December 7, 2020
    </div>
    <div class="poll-card-explain">
      Signal your support or opposition to using the Debt Ceiling Instant Access Module for ETH-B with the listed parameters.
    </div>

    <div class="time">
      remain time
    </div>
    <poll-card-bottom></poll-card-bottom>
  </div>
</template>

<script>
import PollCardType from '@/components/PollCardType';
import PollCardBottom from '@/components/PollCardBottom';

export default {
  components: {
    'poll-card-type': PollCardType,
    'poll-card-bottom': PollCardBottom,
  },
};

</script>

<style>
.poll-card {
  width: 786px;
  height: 232px;
  padding: 25px 30px 25px 28px;
  border-radius: 10px;
  margin-bottom: 6px;
  /* -webkit-filter: blur(8px); */
  /* filter: blur(8px); */
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}

.poll-card-title {
  width: 726px;
  height: 26px;
  margin: 15px 0px 5px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.poll-card-explain {
  width: 726px;
  height: 19px;
  margin: 5px 0 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
.time {
  width: 83px;
  height: 13px;
  margin: 25px 0 0 7px;
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.6;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
</style>
