<template>
  <div class="poll-card">
    <poll-card-type
      :type="cardType.Type"
      :status="cardType.Status"
      :candidate="cardType.Candidate"
    />
    <div class="poll-card-title">
      {{ subject }}
    </div>
    <div class="poll-card-explain">
      {{ description }}
    </div>
    <div class="time">
      <img
        src="@/assets/poll_time_active_icon.png"
        srcset="img/poll-time-active-icon@2x.png 2x, img/poll-time-active-icon@3x.png 3x"
        class="poll_time_active_icon"
      />
      {{ startTime }}
    </div>
    <poll-card-bottom
      :status="status"
      :voted="bottom.votingStatus"
      :votingAnswer="bottom.votingAnswer"
      :votingAmount="bottom.votingAmount"
    />
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
  props: {
    status: {
      type: Boolean,
    },
    cardType: {
      type: Object,
      default: () => {},
    },
    subject: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    startTime: {
      type: String,
      default: '',
    },
    bottom: {
      type: Object,
      default: () => {},
    },
  },
};

</script>

<style>
.poll-card {
  width: 786px;
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
.poll_time_active_icon {
  width: 13px;
  height: 13px;
  margin: 0 7px 0 0;
  object-fit: contain;
}
</style>
