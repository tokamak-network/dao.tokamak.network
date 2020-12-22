<template>
  <div class="card-committee-info">
    <div class="selector">
      <div :class="{ 'selected': currentSelector === 0 }" @click="currentSelector = 0">Committee</div>
      <div :class="{ 'selected': currentSelector === 1 }" @click="currentSelector = 1">Vote Breakdown</div>
      <div :class="{ 'selected': currentSelector === 2 }" @click="currentSelector = 2">Unvote</div>
    </div>
    <div class="divider" />
    <div v-if="currentSelector === 0">
      <committee-info :title="'Website'" :content="'https://tokamak.network'" :type="'url'"
                      :tooltip="`Website of the operator who runs the staking`"
                      :width="'300'"
      />
      <committee-info :title="'Description'" :content="'tokamak netwokr operator1'" :type="'description'" />
      <committee-info :title="'Operator Address'" :content="'0x1234'" :type="'address'" />
      <committee-info :title="'Operator Contract'" :content="'0x1234'" :type="'address'" />
      <committee-info :title="'Chain ID'" :content="'9898'" />
      <committee-info :title="'Commit Count'" :content="'66'" />
      <committee-info :title="'Recent Commit'" :content="'4시간 전'" />
      <committee-info :title="'Running Time'" :content="'3달'" />
      <committee-info :title="'Commission Rate'" :content="'2.5%'"
                      :tooltip="`The commission rate of this operator. It has a value
            between -100% and 100%. (1) + : The operator takes
            the profit from the delegator. (2) - : It distributes the
            operator’s profits to the delegator. (3) 0 : It doesn’t
            divide the profit between the operator and the delegator.`"
                      :width="'317'"
      />
      <committee-info :title="'Reward'" :content="'0.00 TON'" />
      <committee-info :title="'Total Stake'" :content="'0.00 TON'" />
      <committee-info :title="'My Staked'" :content="'0.00 TON'" />
      <committee-info :title="'Not Withdrawable'" :content="'0.00 TON'" />
      <committee-info :title="'Withdrawable'" :content="'0.00 TON'" />
      <committee-info :title="'New Commission Rate'" :content="'0.00 TON'" />
      <committee-info :title="'New Commission Rate Changed At'" :content="'0.00 TON'" />
      <committee-info :title="'Withdrawal Delay'" :content="'0.00 TON'" />
    </div>
  </div>
</template>

<script>
import CommitteeInfo from '@/components/CommitteeInfo.vue';

export default {
  components: {
    'committee-info': CommitteeInfo,
  },
  data () {
    return {
      currentSelector: 0,
    };
  },
};
</script>

<style scoped>
.card-committee-info {
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
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
</style>
