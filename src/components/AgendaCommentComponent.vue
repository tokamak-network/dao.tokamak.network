<template>
  <div class="agenda-comment">
    <!-- <div class="date">
      {{ getBlockTimeStamp(votedAt, web3) }}
    </div> -->
    <div class="vote-status">
      <span>
        <span class="blue">
          {{ voter | hexSlicer }}
        </span> voted
        <span class="blue">
          {{ toResult(vote) }}
        </span>
      </span>
    </div>
    <div class="comment">
      {{ comment }}
    </div>
    <div class="divider" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import Web3 from 'web3';
// import { getBlockTimeStamp } from '@/utils/contracts';

export default {
  props: {
    votedAt: {
      type: Number,
      default: 0,
    },
    vote: {
      type: String,
      default: '',
    },
    voter: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      timestamp: 0,
    };
  },
  computed: {
    ...mapState([
      'web3',
    ]),
  },
  // watch: {
  //   'timestamp': {
  //     handler: async function () {
  //       this.timestamp = await getBlockTimeStamp(this.votedAt, this.web3);
  //     },
  //   },
  // },
  methods: {
    toResult () {
      if (this.vote === '0') return 'Abstain';
      else if (this.vote === '1') return 'Yes';
      else return 'No';
    },
    // async getBlockTimestamp (blockNumber) {
    //   let web3;
    //   if (!this.web3) {
    //     web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f6429583907549eca57832ec1a60b44f'));
    //   } else {
    //     web3 = this.web3;
    //   }
    //   const block = await web3.eth.getBlock(blockNumber);
    //   console.log(block.timestamp);
    //   this.timestamp = block.timestamp;
    //   return block.timestamp;
    // },
  },
};
</script>

<style lang="scss" scoped>
.agenda-comment {

}
.agenda-comment > div {
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
.agenda-comment > .date {
  color: #3e495c;
  font-size: 10px;
  margin-bottom: 5px;
}
.agenda-comment > .comment {
  margin: 10px 0 20px 0;
  color: #818992;
  font-size: 14px;
}
.agenda-comment > .vote-status {
  font-size: 14px;
}
.vote-status {
  display: flex;
}
.vote-status > div:nth-child(2) {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.vote-status > div:nth-child(2) > span {
  font-size: 14px;
  color: #86929d;

  white-space: pre-wrap;
}
.vote-status > div:nth-child(2) > .black {
  color: #3e495c;
}
.vote-status .blue {
  color: #2a72e5;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}
</style>
