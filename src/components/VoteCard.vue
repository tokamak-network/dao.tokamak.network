<template>
  <div>
    <card-title :title="title" />
    <div class="your-vote">
      <div class="vote-percentage">{{ percentage }}% of Agenda is voted</div>
      <vote-poll :pct="percentage" :margin="20" />
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import VotePoll from '@/components/VotePoll';

export default {
  components: {
    'card-title': Title,
    'vote-poll': VotePoll,
  },
  props: {
    'title': {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      ton: 100,
      votedTon: 40,
      tonQuad: 0,
      percentage: 0,
    };
  },
  created () {
    this.quadratic(this.ton);
    this.calcPercentage(this.ton);
  },
  methods: {
    quadratic (ton) {
      this.tonQuad = Math.sqrt(ton);
    },
    calcPercentage (ton) {
      this.percentage = 100 - (this.votedTon * 100/ton);
    },
  },
};
</script>

<style>
.your-vote {
  width: 378px;
  height: 126px;
  margin: 12px 0 0;
  padding: 20px 0 0;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
.vote-percentage {
  height: 18px;
  margin: 0 0px 25px 20px;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
</style>
