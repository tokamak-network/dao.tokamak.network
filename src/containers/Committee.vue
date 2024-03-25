<template>
  <div>
    <modal v-if="showModal"
           :width="'490px'"
    >
      <template #body>
        <modal-update-reward @on-closed="showModal=false" />
      </template>
    </modal>
    <div v-if="$mq === 'mobile'">
      <div class="button-container-mobile">
        <button-step :type="'prev'" :name="'BACK'" class="back"
                     @on-clicked="$router.push({ path: '/election' })"
        />
        <div>
          <button-step v-if="getPrevButtonState(address)" :type="'prev'" :name="'PREVIOUS'" class="prev" @on-clicked="prev" />
          <button-step v-if="getNextButtonState(address)" :type="'next'" :name="'NEXT'" class="next" @on-clicked="next" />
        </div>
      </div>
      <div class="content">
        <div v-if="member(address)" class="timeline">
          <div class="date">
            Became a DAO committee member on {{ member(address).info.memberJoinedTime | date1 }}
          </div>
          <div>
            <!-- <span>in Office {{ member(address).info.memberJoinedTime | fromNow }}</span> -->
          </div>
        </div>
        <div v-if="!account">
          <div class="title-container">
            <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
            <!-- <div class="type">{{ candidate(address) ? `- ${candidate(address).kind}` : '' }}</div> -->
          </div>
        </div>
        <div v-else>
          <div class="title-container" style="margin-bottom: 0px;">
            <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
            <!-- <div class="type">{{ candidate(address) ? `- ${candidate(address).kind}` : '' }}</div> -->
          </div>
          <button v-if="account"
                  style="margin-top: 14px; margin-bottom: 30px;"
                  class="update-btn"
                  :class="{
                    'update-btn-disabled': !canUpdateReward(address) || (candidate(address).kind === 'layer2' && candidate(address).operator.toLowerCase() !== account.toLowerCase()),
                  }"
                  @click="openUpdateRewardModal()"
          >
            Update Reward
          </button>
          <button
            class="stake-btn"
            @click="linkToStake()"
          >
            Stake
          </button>
        </div>
        <div class="selector">
          <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">Details</div>
          <div :class="{ 'selected': currentSelector === 1 }" style="margin-left: 35px; margin-right: 35px;"
               @click="currentSelector = 1"
          >
            Top 100 Stakers
          </div>
          <div :class="{ 'selected': currentSelector === 2 }" @click="currentSelector = 2">Vote/Unvote</div>
        </div>
        <div class="divider" />
        <committee-info v-if="currentSelector === 0" />
        <committee-info-vote v-else-if="currentSelector === 1" />
        <committee-vote v-else-if="currentSelector === 2" />
      </div>
    </div>
    <div v-else-if="$mq === 'tablet'" class="card-committee-info">
      <div class="button-container">
        <button-step :type="'prev'" :name="'BACK TO ALL'" class="back" style="width: 140px"
                     @on-clicked="$router.push({ path: '/election' })"
        />
        <div>
          <button-step v-if="getPrevButtonState(address)" :type="'prev'" :name="'PREVIOUS'" class="prev" style="width: 130px" @on-clicked="prev" />
          <button-step v-if="getNextButtonState(address)" :type="'next'" :name="'NEXT'" class="next" style="width: 130px" @on-clicked="next" />
        </div>
      </div>
      <div class="content-tablet">
        <div v-if="member(address)" class="timeline">
          <div class="date">
            Became a DAO committee member on {{ member(address).info.memberJoinedTime | date1 }}
          </div>
          <div>
            <!-- <span>in Office {{ member(address).info.memberJoinedTime | fromNow }}</span> -->
          </div>
        </div>
        <div class="title-container">
          <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
          <!-- <div class="type">{{ candidate(address) ? `- ${candidate(address).kind}` : '' }}</div> -->
        </div>
        <div class="selector">
          <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">
            Details
          </div>
          <div :class="{ 'selected': currentSelector === 1 }"
               style="margin-left: 35px; margin-right: 35px;"
               @click="currentSelector = 1"
          >
            Top 100 Stakers
          </div>
          <span class="space" />
          <button v-if="account"
                  class="update-btn"
                  :class="{
                    'update-btn-disabled': !canUpdateReward(address) || (candidate(address).kind === 'layer2' && candidate(address).operator.toLowerCase() !== account.toLowerCase()),
                  }"
                  @click="openUpdateRewardModal()"
          >
            Update Reward
          </button>
          <button
            class="stake-btn"
            @click="linkToStake()"
          >
            Stake
          </button>
        </div>
        <div class="divider" />
        <committee-info v-if="currentSelector === 0" />
        <committee-info-vote v-else-if="currentSelector === 1" />
      </div>
    </div>
    <div v-else class="card-committee-info">
      <div class="button-container">
        <button-step :type="'prev'" :name="'BACK TO ALL CANDIDATES'" class="back"
                     @on-clicked="$router.push({ path: '/election' })"
        />
        <div>
          <button-step v-if="getPrevButtonState(address)" :type="'prev'" :name="'PREVIOUS CANDIDATE'" class="prev" @on-clicked="prev" />
          <button-step v-if="getNextButtonState(address)" :type="'next'" :name="'NEXT CANDIDATE'" class="next" @on-clicked="next" />
        </div>
      </div>
      <div class="content">
        <div v-if="member(address)" class="timeline">
          <div class="date">
            Became a DAO committee member on {{ member(address).info.memberJoinedTime | date1 }}
          </div>
          <div>
            <!-- <span>in Office {{ member(address).info.memberJoinedTime | fromNow }}</span> -->
          </div>
        </div>
        <div class="title-container">
          <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
          <!-- <div class="type">{{ candidate(address) ? `- ${candidate(address).kind}` : '' }}</div> -->
        </div>
        <div class="selector">
          <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">Details</div>
          <div :class="{ 'selected': currentSelector === 1 }" style="margin-left: 35px; margin-right: 35px;"
               @click="currentSelector = 1"
          >
            Top 100 Stakers
          </div>
          <!-- <div :class="{ 'selected': currentSelector === 2 }" @click="currentSelector = 2">Vote/Unvote</div> -->

          <span class="space" />
          <button v-if="account"
                  class="update-btn"
                  style="margin-right:20px;"
                  :class="{
                    'update-btn-disabled': !canUpdateReward(address) || (candidate(address).kind === 'layer2' && candidate(address).operator.toLowerCase() !== account.toLowerCase()),
                  }"
                  @click="openUpdateRewardModal()"
          >
            Update Reward
          </button>
          <button
            class="stake-btn"
            @click="linkToStake()"
          >
            Stake
          </button>
        </div>
        <div class="divider" />
        <committee-info v-if="currentSelector === 0" />
        <committee-info-vote v-else-if="currentSelector === 1" />
        <!-- <committee-vote v-else-if="currentSelector === 2" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ButtonStep from '@/components/ButtonStep.vue';
import Modal from '@/components/Modal.vue';
import ModalUpdateReward from '@/containers/ModalUpdateReward.vue';
import CommitteeVote from '@/containers/CommitteeVote.vue';
import CommitteeInfo from '@/containers/CommitteeInfo.vue';
import CommitteeInfoVote from '@/containers/CommitteeInfoVote.vue';

export default {
  components: {
    'button-step': ButtonStep,
    'modal': Modal,
    'modal-update-reward': ModalUpdateReward,
    'committee-info': CommitteeInfo,
    'committee-info-vote': CommitteeInfoVote,
    'committee-vote': CommitteeVote,
  },
  data () {
    return {
      address: '',
      currentSelector: 0,
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      'account',
      'candidates',
    ]),
    ...mapGetters([
      'candidate',
      'member',
      'sortedCandidates',
      'canUpdateReward',
      'getPrevButtonState',
      'getNextButtonState',
    ]),
    // prevState () {
    //   const index = this.sortedCandidates.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(this.address.toLowerCase());
    //   console.log(index);
    //   console.log(index === -1 || index === 0);
    //   return index === -1 || index === 0 ? false : true;
    // },
  },
  watch: {
    '$route.params.address': {
      handler: async function () {
        this.address = this.$route.params.address;
        for (;;) {
          await new Promise(r => setTimeout(r, 500));
          if (this.candidates.length > 0) break; // TODO: fix setMembersAndNonmembers logic, and use launched.
        }
        const candidateFound = this.candidates.find(element => element.candidateContract === this.address);
        await this.$store.dispatch('setVoters', candidateFound);
        if (this.account) {
          await this.$store.dispatch('setMyVotes', this.address);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    prev () {
      let index = this.sortedCandidates.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(this.address.toLowerCase());
      if (index === -1 || index === 0) {
        return ;
      }
      index--;

      this.$router.push(({ path: `/election/${this.sortedCandidates[index].candidateContract}` }));
      this.address = this.$route.params.address;
    },
    next () {
      const max = this.sortedCandidates.length;
      let index = this.sortedCandidates.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(this.address.toLowerCase());
      if (index === -1 || index === max - 1) {
        return ;
      }
      index++;

      this.$router.push(({ path: `/election/${this.sortedCandidates[index].candidateContract}` }));
      this.address = this.$route.params.address;
    },
    linkToStake () {
      const address = this.address;
      window.open(`https://simple.staking.tokamak.network/staking#${address}`, '_blank'); //eslint-disable-line
    },
    openUpdateRewardModal () {
      const address = this.address;
      const candidate = this.candidate(address);

      if (candidate.kind === 'layer2') {
        if (candidate.candidate.toLowerCase() !== this.account.toLowerCase()) {
          return alert('Only candidate by layer2 owner can update reward.');
        }
      }

      if (!this.canUpdateReward(address)) {
        return alert('Candidate hasn\'t voted minimum amount yet.');
      }
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
// .card-committee-info {
// }
.content {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;

  padding: 30px;

  margin-top: 12px;
}
.content-tablet {
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

.button-container {
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }
  .back {
    width: 195px;
  }
  .prev {
    width: 165px;
  }
  .next {
    width: 165px;
  }
}

.button-container-mobile {
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }
  .back {
    width: 191px;
  }
  .prev {
    width: 165px;
  }
  .next {
    width: 141px;
  }
}

.button-container-mobile {
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }
  .back {
    width: 110px;
  }
  .prev {
    width: 110px;
  }
  .next {
    width: 110px;
  }
}

.space {
  flex: 1;
}
.stake-btn {
  background-color: #257eee;

  color: #ffffff;
  cursor: pointer;
  outline: none;

  width: 102px;
  height: 25px;

  border-radius: 4px;
  border: solid 1px #257eee;

  // background: #ffffff;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;

  margin-top: -5px;


}

.update-btn {
  outline: none;

  width: 102px;
  height: 25px;
  margin-right: 10px;

  border-radius: 4px;
  border: solid 1px #257eee;

  background: #ffffff;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #2a72e5;

  margin-top: -5px;

  &:hover {
    background-color: #257eee;

    color: #ffffff;
    cursor: pointer;
  }
}

.update-btn-disabled {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;

  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #86929d;

  margin-top: -5px;

  &:hover {
    border: solid 1px #dfe4ee;
    background-color: #ffffff;

    color: #86929d;
  }
}

.title-container {
  display: flex;
  align-items: center;

  margin-top: 8px;
  margin-bottom: 30px;

  word-break: break-all;

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
  }

  .type {
    width: 120px;
    font-family: Roboto;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: #3e495c;

    margin-top: 3px;
    margin-left: 4px;
  }
}
</style>
