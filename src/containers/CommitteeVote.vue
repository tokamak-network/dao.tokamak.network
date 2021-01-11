<template>
  <div class="committee-vote">
    <div class="header">
      <div :class="{ selected: currentSelector === 0 }" @click="currentSelector = 0">Vote</div>
      <div :class="{ selected: currentSelector === 1 }" @click="currentSelector = 1">Revote</div>
      <div :class="{ selected: currentSelector === 2 }" @click="currentSelector = 2">Unvote</div>
      <div :class="{ selected: currentSelector === 3 }" @click="currentSelector = 3">Withdraw</div>
    </div>
    <div class="body">
      <div v-if="currentSelector === 0" class="vote-container">
        <div>Available Balance {{ tonBalance | TON }} TON</div>
        <div>
          <text-input ref="tonvote"
                      class="vote-input"
                      :unit="'TON'"
                      :hint="'0.00'"
          />
          <custom-button class="vote-max"
                         :name="'MAX'"
                         :type="'vote'"
                         :width="'100px'"
                         @on-clicked="tonMax"
          />
        </div>
        <custom-button :type="'secondary'"
                       :name="'Vote'"
                       @on-clicked="vote"
        />
      </div>
      <div v-if="currentSelector === 1">
        <text-input ref="tonrevote"
                    class="revote-input"
                    :unit="'TON'"
                    :hint="'0.00'"
                    :big="true"
                    :clickable="true"
                    :datas="[1, 2, 3]"
                    :readonly="true"
        />
        <custom-button :type="'secondary'"
                       :name="'Revote'"
        />
      </div>
      <div v-if="currentSelector === 2" class="unvote-container">
        <div>Available Balance 00 TON</div>
        <div>
          <text-input ref="tonunvote"
                      class="unvote-input"
                      :unit="'TON'"
                      :hint="'0'"
          />
          <custom-button class="unvote-max"
                         :name="'MAX'"
                         :type="'vote'"
                         :width="'100px'"
                         @on-clicked="wtonMax"
          />
        </div>
        <custom-button :type="'secondary'"
                       :name="'Unvote'"
        />
      </div>
      <div v-if="currentSelector === 3">
        <text-input ref="tonwithdraw"
                    class="withdraw-input"
                    :unit="'TON'"
                    :hint="'0.00'"
                    :big="true"
                    :clickable="true"
                    :datas="[1, 2, 3]"
                    :readonly="true"
        />
        <custom-button :type="'secondary'"
                       :name="'Withdraw'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { TON } from '@/utils/helpers';

import { mapState } from 'vuex';
import Button from '@/components/Button.vue';
import TextInput from '@/components/TextInput.vue';

export default {
  components: {
    'text-input': TextInput,
    'custom-button': Button,
  },
  data () {
    return {
      currentSelector: 0,
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
      'tonBalance',
      'requestsByCandidate',
    ]),
  },
  methods: {
    tonMax () {
      this.$refs.tonvote.$refs.input.value = TON(this.tonBalance);
    },
    wtonMax () {
      this.$refs.tonunvote.$refs.input.value = TON(this.tonBalance);
    },
    vote () {
      alert(this.tonBalance);
    },
    unvote () {
    },
  },
};
</script>

<style scoped>
.committee-vote {
  height: 410px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-bottom: 100px;
}
.committee-vote .header {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.committee-vote .header > div {
  width: 85px;
  height: 47px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #86929d;

  border-bottom: solid 1px #ffffff;

  cursor: pointer;
}
.committee-vote .header > .selected {
  border-bottom: solid 1px #2a72e5;
  color: #2a72e5;
}

.committee-vote .body {
  width: 100%;
  max-width: 378px;
  /* padding: 15px; */
  border-radius: 10px;
  border: solid 1px #dfe4ee;
  background-color: #ffffff;

  padding: 15px;
}
.committee-vote .vote-container > div:nth-child(1), .committee-vote .unvote-container > div:nth-child(1) {
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
.committee-vote .vote-container > div:nth-child(2), .committee-vote .unvote-container > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 15px;
  margin-bottom: 15px;
}

.vote-input, .unvote-input {
  flex: 1;
}
.vote-max, .unvote-max {
  width: 100px;
  margin-left: 5px;
}

.revote-input, .withdraw-input {
  margin-top: 10px;
  margin-bottom: 21px;
}
</style>
