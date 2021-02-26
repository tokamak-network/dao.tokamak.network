<template>
  <div>
    <div v-if="$mq === 'mobile'">
      <div class="button-container-mobile">
        <button-step :type="'prev'" :name="'BACK'" class="back"
                     @on-clicked="$router.push({ path: '/election' })"
        />
        <div>
          <button-step :type="'prev'" :name="'PREVIOUS'" class="prev" @on-clicked="prev" />
          <button-step :type="'next'" :name="'NEXT'" class="next" @on-clicked="next" />
        </div>
      </div>
      <div class="content">
        <div v-if="member(address)" class="timeline">
          <div class="date">
            Elected at {{ member(address).info.memberJoinedTime | date1 }}
          </div>
          <div>
            <img src="@/assets/poll-time-active-icon.svg" alt=""
                 width="14" height="14"
            >
            <span class="black">Member </span>
            <span class="blue">{{ member(address).memberIndex }} </span>
            <span>in Office {{ member(address).info.memberJoinedTime | fromNow }}</span>
          </div>
        </div>
        <div v-if="!account">
          <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
        </div>
        <div v-else>
          <div class="title" style="margin-bottom: 0px;">{{ candidate(address) ? candidate(address).name : '-' }}</div>
          <button style="margin-top: 14px; margin-bottom: 30px;"
                  class="update-btn"
                  :class="{
                    'update-btn-disabled': !canUpdateReward(address) || (candidate(address).kind === 'layer2' && candidate(address).operator.toLowerCase() !== account.toLowerCase()),
                  }"
                  @click="updateReward()"
          >
            Update Reward
          </button>
        </div>
        <div class="selector">
          <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">Detail</div>
          <div :class="{ 'selected': currentSelector === 1 }" style="margin-left: 35px; margin-right: 35px;"
               @click="currentSelector = 1"
          >
            Vote Breakdown
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
          <button-step :type="'prev'" :name="'PREVIOUS'" class="prev" style="width: 130px" @on-clicked="prev" />
          <button-step :type="'next'" :name="'NEXT'" class="next" style="width: 130px" @on-clicked="next" />
        </div>
      </div>
      <div class="content-tablet">
        <div v-if="member(address)" class="timeline">
          <div class="date">
            Elected at {{ member(address).info.memberJoinedTime | date1 }}
          </div>
          <div>
            <img src="@/assets/poll-time-active-icon.svg" alt=""
                 width="14" height="14"
            >
            <span class="black">Member </span>
            <span class="blue">{{ member(address).memberIndex }} </span>
            <span>in Office {{ member(address).info.memberJoinedTime | fromNow }}</span>
          </div>
        </div>
        <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
        <div class="selector">
          <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">
            Detail
          </div>
          <div :class="{ 'selected': currentSelector === 1 }"
               style="margin-left: 35px; margin-right: 35px;"
               @click="currentSelector = 1"
          >
            Vote Breakdown
          </div>
          <div :class="{ 'selected': currentSelector === 2 }" @click="currentSelector = 2">
            Vote/Unvote
          </div>

          <span class="space" />
          <button v-if="account"
                  class="update-btn"
                  :class="{
                    'update-btn-disabled': !canUpdateReward(address) || (candidate(address).kind === 'layer2' && candidate(address).operator.toLowerCase() !== account.toLowerCase()),
                  }"
                  @click="updateReward()"
          >
            Update Reward
          </button>
        </div>
        <div class="divider" />
        <committee-info v-if="currentSelector === 0" />
        <committee-info-vote v-else-if="currentSelector === 1" />
        <committee-vote v-else-if="currentSelector === 2" />
      </div>
    </div>

    <div v-else class="card-committee-info">
      <div class="button-container">
        <button-step :type="'prev'" :name="'BACK TO ALL CANDIDATES'" class="back"
                     @on-clicked="$router.push({ path: '/election' })"
        />
        <div>
          <button-step :type="'prev'" :name="'PREVIOUS CANDIDATE'" class="prev" @on-clicked="prev" />
          <button-step :type="'next'" :name="'NEXT CANDIDATE'" class="next" @on-clicked="next" />
        </div>
      </div>
      <div class="content">
        <div v-if="member(address)" class="timeline">
          <div class="date">
            Elected at {{ member(address).info.memberJoinedTime | date1 }}
          </div>
          <div>
            <img src="@/assets/poll-time-active-icon.svg" alt=""
                 width="14" height="14"
            >
            <span class="black">Member </span>
            <span class="blue">{{ member(address).memberIndex }} </span>
            <span>in Office {{ member(address).info.memberJoinedTime | fromNow }}</span>
          </div>
        </div>
        <div class="title">{{ candidate(address) ? candidate(address).name : '-' }}</div>
        <div class="selector">
          <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">Detail</div>
          <div :class="{ 'selected': currentSelector === 1 }" style="margin-left: 35px; margin-right: 35px;"
               @click="currentSelector = 1"
          >
            Vote Breakdown
          </div>
          <div :class="{ 'selected': currentSelector === 2 }" @click="currentSelector = 2">Vote/Unvote</div>

          <span class="space" />
          <button v-if="account"
                  class="update-btn"
                  :class="{
                    'update-btn-disabled': !canUpdateReward(address) || (candidate(address).kind === 'layer2' && candidate(address).operator.toLowerCase() !== account.toLowerCase()),
                  }"
                  @click="updateReward()"
          >
            Update Reward
          </button>
        </div>
        <div class="divider" />
        <committee-info v-if="currentSelector === 0" />
        <committee-info-vote v-else-if="currentSelector === 1" />
        <committee-vote v-else-if="currentSelector === 2" />
      </div>
    </div>
  </div>
</template>

<script>
import { getContract } from '@/utils/contracts';
import { toBN } from 'web3-utils';

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
      address: '',
      currentSelector: 0,
    };
  },
  computed: {
    ...mapState([
      'account',
      'confirmBlock',
      'candidates',
      'members',
      'launched',
      'web3',
    ]),
    ...mapGetters([
      'candidate',
      'member',
      'sumOfVotes',
      'sortedCandidates',
      'minimumAmount',
      'canUpdateReward',
    ]),
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
        return;
      }
      index--;

      this.$router.push(({ path: `/election/${this.sortedCandidates[index].candidateContract}` }));
      this.address = this.$route.params.address;
    },
    next () {
      const max = this.sortedCandidates.length;
      let index = this.sortedCandidates.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(this.address.toLowerCase());
      if (index === -1 || index === max - 1) {
        return;
      }
      index++;

      this.$router.push(({ path: `/election/${this.sortedCandidates[index].candidateContract}` }));
      this.address = this.$route.params.address;
    },
    async updateReward () {
      const makePos = (v1, v2) => {
        v1 = toBN(v1);
        v2 = toBN(v2);

        const a = v1.mul(toBN(2).pow(toBN(128)));
        return a.add(v2).toString();
      };

      if (!this.canUpdateReward(this.address)) {
        return alert('no deposit for this candidate');
      }

      const candidate = this.candidate(this.address);
      if (!candidate) {
        console.log('bug', 'no candidate'); // eslint-disable-line
        return;
      }
      if (candidate.kind === 'layer2') {

        if (candidate.operator.toLowerCase() !== this.account.toLowerCase()) {
          alert('only candidate by Layer2 owner can update reward');
        }

        const layer2Contract = getContract('Layer2', this.web3, candidate.layer2);
        /* check operator
        console.log('layer2Contract', candidate, layer2Contract) ;
        if (layer2Contract) {
          const _operator = await layer2Contract.methods.operator().call();
          console.log('_operator', _operator) ;
        }
        */
        const [
          costNRB,
          NRELength,
          currentForkNumber,
        ] = await Promise.all([
          layer2Contract.methods.COST_NRB().call(),
          layer2Contract.methods.NRELength().call(),
          layer2Contract.methods.currentFork().call(),
        ]);
        const fork = await layer2Contract.methods.forks(currentForkNumber).call();
        const epochNumber = parseInt(fork.lastEpoch) + 1;
        const startBlockNumber = parseInt(fork.lastBlock) + 1;
        const endBlockNumber = parseInt(startBlockNumber) + parseInt(NRELength) - 1;

        // pos1 = fork number * 2^128 + epoch number
        // pos2 = start block number * 2^128 + end block number
        const pos1 = makePos(currentForkNumber, epochNumber);
        const pos2 = makePos(startBlockNumber, endBlockNumber);
        const dummyBytes = '0xdb431b544b2f5468e3f771d7843d9c5df3b4edcf8bc1c599f18f0b4ea8709bc3';
        //console.log('pos1', pos1, 'pos2', pos2, 'dummyBytes', dummyBytes, 'costNRB', costNRB) ;
        const gasLimit = await layer2Contract.methods.submitNRE(
          pos1,
          pos2,
          dummyBytes, // epochStateRoot
          dummyBytes, // epochTransactionsRoot
          dummyBytes, // epochReceiptsRoot
        ).estimateGas({
          from: this.account,
          value: costNRB,
        });

        try {
          await layer2Contract.methods.submitNRE(
            pos1,
            pos2,
            dummyBytes, // epochStateRoot
            dummyBytes, // epochTransactionsRoot
            dummyBytes, // epochReceiptsRoot
          )
            .send({
              from: this.account,
              value: costNRB,
              gasLimit: Math.floor(gasLimit * 1.2),
            })
            .on('transactionHash', (hash) => {
              this.$store.commit('SET_PENDING_TX', hash);
            })
            .on('confirmation', async (confirmationNumber) => {
              if (this.confirmBlock === confirmationNumber) {
                this.$store.commit('SET_PENDING_TX', '');
                await this.$store.dispatch('launch');
                await this.$store.dispatch('connectEthereum', this.web3);
              }
            })
            .on('receipt', () => {
            })
            .on('error', () => {
              this.$store.commit('SET_PENDING_TX', '');
            });
        } catch (error) {
          console.log('error', error) ;// eslint-disable-line
        }

      } else {
        const candidateContract = getContract('Candidate', this.web3, candidate.candidateContract);
        const gasLimit = await candidateContract.methods.updateSeigniorage()
          .estimateGas({
            from: this.account,
          });

        await candidateContract.methods.updateSeigniorage()
          .send({
            from: this.account,
            gasLimit: Math.floor(gasLimit * 1.2),
          })
          .on('transactionHash', (hash) => {
            this.$store.commit('SET_PENDING_TX', hash);
          })
          .on('confirmation', async (confirmationNumber) => {
            if (this.confirmBlock === confirmationNumber) {
              this.$store.commit('SET_PENDING_TX', '');
              await this.$store.dispatch('launch');
              await this.$store.dispatch('connectEthereum', this.web3);
            }
          })
          .on('receipt', () => {
          })
          .on('error', () => {
            this.$store.commit('SET_PENDING_TX', '');
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-committee-info {
}
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

.update-btn {
  outline: none;

  width: 126px;
  height: 25px;

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

  &:hover {
    border-radius: 4px;
    background-color: #257eee;

    color: #ffffff;
    cursor: pointer;
  }
}

.update-btn-disabled {
  margin-top: -10px;
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

  &:hover {
    border: solid 1px #dfe4ee;
    background-color: #ffffff;

    color: #86929d;
  }
}
</style>
