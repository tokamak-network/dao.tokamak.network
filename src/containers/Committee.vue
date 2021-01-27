<template>
  <div class="card-committee-info">
    <div class="button">
      <button-step :type="'prev'" :name="'BACK TO ALL CANDIDATES'" class="back"
                   @on-clicked="$router.push({ path: '/election' })"
      />
      <div>
        <button-step :type="'prev'" :name="'PREVIOUS CANDIDATE'" class="prev" @on-clicked="prev" />
        <button-step :type="'next'" :name="'NEXT CANDIDATE'" class="next" @on-clicked="next" />
      </div>
    </div>
    <div class="content">
      <div v-if="isMember" class="timeline">
        <div class="date">
          Elected at {{ candidate(address) ? electedAt(candidate(address).info.memberJoinedTime) : '-' }}
        </div>
        <div>
          <img src="@/assets/poll-time-active-icon.svg" alt=""
               width="14" height="14"
          >
          <span class="black">Slot</span>
          <span class="blue"> #0 </span>
          <span>in Office {{ candidate(address) ? fromNow(candidate(address).info.memberJoinedTime) : '-' }}</span>
        </div>
      </div>
      <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
      <div class="selector">
        <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">Detail</div>
        <div :class="{ 'selected': currentSelector === 1 }" @click="currentSelector = 1">Vote Breakdown</div>
        <div :class="{ 'selected': currentSelector === 2 }" @click="currentSelector = 2">Vote/Unvote</div>
      </div>
      <div class="divider" />
      <committee-info v-if="currentSelector === 0" />
      <committee-info-vote v-else-if="currentSelector === 1" />
      <committee-vote v-else-if="currentSelector === 2" />
    </div>
  </div>
</template>

<script>
import { date1, fromNow } from '@/utils/helpers';

import { mapState, mapGetters } from 'vuex';
import ButtonStep from '@/components/ButtonStep.vue';
import CommitteeVote from '@/containers/CommitteeVote.vue';
import CommitteeInfo from '@/containers/CommitteeInfo.vue';
import CommitteeInfoVote from '@/containers/CommitteeInfoVote.vue';

export default {
  components: {
    'button-step': ButtonStep,
    'committee-info': CommitteeInfo,
    'committee-info-vote': CommitteeInfoVote,
    'committee-vote': CommitteeVote,
  },
  data () {
    return {
      currentSelector: 0,
      address: '',
    };
  },
  computed: {
    ...mapState([
      'candidates',
      'members',
    ]),
    ...mapGetters([
      'candidate',
    ]),
    isMember () {
      return this.members.find(member => member.candidateContract.toLowerCase() === this.candidate(this.address).candidateContract.toLowerCase());
    },
  },
  created () {
    this.address = this.$route.params.address;
  },
  methods: {
    electedAt (timestamp) {
      return date1(timestamp);
    },
    fromNow (timestamp) {
      return fromNow(timestamp, true);
    },
    prev () {
      let index = this.candidates.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(this.address.toLowerCase());
      if (index === -1 || index === 0) {
        return;
      }
      index--;

      this.$router.push(({ path: `/election/${this.candidates[index].candidateContract}` }));
      this.address = this.$route.params.address;
    },
    next () {
      const max = this.candidates.length;
      let index = this.candidates.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(this.address.toLowerCase());
      if (index === -1 || index === max - 1) {
        return;
      }
      index++;

      this.$router.push(({ path: `/election/${this.candidates[index].candidateContract}` }));
      this.address = this.$route.params.address;
    },
  },
};
</script>

<style scoped>
.card-committee-info {
}
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
