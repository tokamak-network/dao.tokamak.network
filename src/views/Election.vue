<template>
  <div class="election">
    <div class="filters">
      Filters
    </div>
    <div class="card-header">
      Active Election Polls
    </div>
    <div class="num-cards">
      {{ getNumCards() }} POLLS - POSTED DEC 7, 2020, 16:00 UTC
    </div>
    <div v-for="card in activeCards" :key="card.index" class="polls">
      <poll-card
        :status="card.status"
        :card-type="card.cardType"
        :subject="card.subject"
        :description="card.description"
        :start-time="card.startTime"
        :bottom="card.bottom"
      />
    </div>
    <div class="ended-polls">
      <div v-if="endedShow" class="ended-polls-inner">
        View ended polls ({{ getNumEndedCards() }})
      </div>
    </div>
    <div style="margin-top:30px;">
      <div v-if="!endedShow" class="card-header" style="display: inline-block;">
        Ended Election Polls
      </div>
      <div class="hide-button">
        <Button
          :name="'Hide ended Polls'"
          :status="'running'"
          :type="'vote'"
          @click="showEndedSection"
        /> <!--Need to change to Hide button-->
      </div>
      <div class="num-cards">
        {{ getNumEndedCards() }} POLLS - POSTED DEC 7, 2020, 16:00 UTC
      </div>
      <div v-for="card in endedCards" :key="card.index" class="polls">
        <poll-card
          :status="card.status"
          :card-type="card.cardType"
          :subject="card.subject"
          :description="card.description"
          :start-time="card.startTime"
          :bottom="card.bottom"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PollCard from '@/components/PollCard.vue';
import Button from '@/components/Button.vue';

import dummy from '../../card_data.json';

export default {
  components:{
    'poll-card': PollCard,
    'Button': Button,
  },
  data () {
    return {
      activeCards: [],
      endedCards: [],
      endedShow: false,
    };
  },
  created (){
    this.cards ();
  },
  methods: {
    cards () {
      return dummy.pollCards.map((card) => {
        if (card.status) {
          this.activeCards.push(card);
        } else {
          this.endedCards.push(card);
        }
      });
    },
    getNumCards () {
      return this.activeCards.length;
    },
    getNumEndedCards () {
      return this.endedCards.length;
    },
    showEndedSection () {
      console.log(this.endedShow);
      if (this.endedShow === true) {
        this.endedShow === false;
      } else {
        this.endedShow === true;
      }
    },
  },
};
</script>

<style scoped>
.election {
  /* all the `views` have to has this attribue  */
  flex: 1;
  margin-left: 203px;
  max-width: 846px;
  /* width: 846px;
  height: 865px;
  opacity: 0.5; */
}
.hide-button {
  float: right;
}
.ended-polls {
  width: 786px;
  height: 55px;
  padding: 18px 322px;
  border-radius: 10px;
  /* -webkit-filter: blur(8px);
  filter: blur(8px); */
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
.ended-polls-inner {
  width: 142px;
  height: 19px;
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
.card-header {
  width: 216px;
  height: 32px;
  font-family: Roboto;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.num-cards {
  width: 212px;
  height: 15px;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;
}
</style>
