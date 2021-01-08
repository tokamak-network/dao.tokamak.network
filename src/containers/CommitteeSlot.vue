<template>
  <div class="committee-slot">
    <div class="title">Elected Candidate</div>
    <div class="slot-info">
      <!-- TODO: message -->
      3 slot
    </div>
    <card-committee-slot :slotnumber="0" />
    <card-committee-slot :slotnumber="1" />
    <card-committee-slot :slotnumber="2" />
    <div class="title"
         style="margin-top: 30px; margin-bottom: 20px;"
    >
      Candidates
    </div>
    <!-- <candidate v-for="candidate in nonmembers" :key="candidate.layer2" :candidate="candidate" /> -->
    <candidate v-for="candidate in members" :key="candidate.layer2" :candidate="candidate" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardCommitteeSlot from '@/components/CardCommitteeSlot.vue';
import Candidate from '@/components/Candidate.vue';

export default {
  components: {
    'card-committee-slot': CardCommitteeSlot,
    'candidate': Candidate,
  },
  computed: {
    ...mapState([
      'members', // TODO: use nonmembers
    ]),
  },
};
</script>

<style lang="scss" scoped>
.committee-slot{
  > .title {
    font-family: Roboto;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;

    margin-bottom: 12px;
  }
  .slot-info {
    width: 204px;
    height: 15px;

    font-family: Roboto;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #86929d;

    margin-bottom: 12px;
  }

}
</style>
