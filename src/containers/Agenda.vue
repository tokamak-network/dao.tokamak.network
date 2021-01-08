<template>
  <div class="card-agenda-info">
    <div class="button">
      <button-step :type="'prev'" :name="'BACK TO ALL AGENDAS'" class="back" />
      <div>
        <button-step :type="'prev'" :name="'PREVIOUS AGENDAS'" class="prev" />
        <button-step :type="'next'" :name="'NEXT AGENDAS'" class="next" />
      </div>
    </div>
    <div class="content">
      <div class="timeline">
        <div class="date">Posted 2020 / 12 / 07 / 16:00 UTC</div>
        <div>
          <img src="@/assets/poll-time-active-icon.svg" alt=""
               width="14" height="14"
          >
          <span> 1D 2H REMAINING</span>
        </div>
      </div>
      <div class="title">DAO Vault is Foward Fund to 0xabcd… - December 7, 2020</div>
      <div class="selector">
        <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">Details</div>
        <div :class="{ 'selected': currentSelector === 1 }" @click="currentSelector = 1">On-Chain Effect</div>
        <div :class="{ 'selected': currentSelector === 2 }" @click="currentSelector = 2">Comments</div>
      </div>
      <div class="divider" />
      <agen-info v-if="currentSelector === 0" />
      <agen-info-vote v-else-if="currentSelector === 1" />
      <agen-vote v-else-if="currentSelector === 2" />
    </div>
  </div>
</template>

<script>
import ButtonStep from '@/components/ButtonStep.vue';
import AgendaComments from '@/containers/AgendaComments.vue';
import AgendaInfo from '@/containers/AgendaInfo.vue';
import AgendaOnChain from '@/containers/AgendaOnChain.vue';

export default {
  components: {
    'button-step': ButtonStep,
    'agen-info': AgendaInfo,
    'agen-info-vote': AgendaOnChain,
    'agen-vote': AgendaComments,
  },
  data () {
    return {
      currentSelector: 0,
    };
  },
};
</script>

<style scoped>
.content {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  padding: 30px;

  margin-top: 12px;
}
.date {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;

  margin-top: 8px;
  margin-bottom: 30px;
}
.selector {
  display: flex;
}
.selector .selected {
  color: #2a72e5;
  font-weight: 500;
}
.selector > div {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #86929d;
}
.selector > div:hover {
  cursor: pointer;
}
.selector > div:nth-child(2) {
  margin-left: 35px;
  margin-right: 35px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}

.timeline {
  display: flex;
}
.timeline > div:nth-child(2) {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.timeline > div:nth-child(2) > img {
  margin-right: 7px;
}
.timeline > div:nth-child(2) > span {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #86929d;

  white-space: pre-wrap;
}
.timeline > div:nth-child(2) > .black {
  color: #3e495c;
}
.timeline > div:nth-child(2) > .blue {
  color: #2a72e5;
}

.button {
  display: flex;
  justify-content: space-between;
}
.button > div {
  display: flex;
}
.button .back {
  width: 195px;
}
.button .prev {
  width: 165px;
}
.button .next {
  width: 165px;
}
</style>
