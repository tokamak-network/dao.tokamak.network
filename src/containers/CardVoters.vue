<template>
  <div class="card-voters">
    <card-container :title="'Voters'">
      <template #body>
        <div v-if="voters.length === 0" class="no-voters">
          Not Decided Yet
        </div>
        <div v-else class="table">
          <table>
            <tbody>
              <tr v-for="(data, index) in voters" :key="index">
                <div class="table-content">
                  <div>{{ toResult(data.result) }}</div>
                  <div>{{ shortAddress(data.voter) }}</div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    'card-container': Card,
  },
  props: {
    voters: {
      type: Array,
      default: ()=>[],
    },
  },
  data () {
    return {
      comments: [],
    };
  },
  computed: {
    toResult () {
      return (result) => {
        if (result[0] === false) {
          return 'Not Voted';
        } else {
          if (result[1] === '0') {
            return 'Abstain';
          } else if (result[1] === '1') {
            return 'Yes';
          } else {
            return 'No';
          }
        }
      };
    },
    shortAddress () {
      return (address) => {
        return `${address.slice(0, 7)}...${address.slice(-4)}`;
      };
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  margin-top: 10px;
}
table td, table th {
  overflow-wrap: anywhere;
}
.no-voters {
  height: 100px;
  overflow-y: auto;
  background: #ffffff;
  font-family: Roboto;
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
  text-align: center;
  line-height: 100px;
}

.table {
  height: 100px;
  overflow-y: auto;
  background: #ffffff;
}
.table-content {
  display: flex;
  align-items: center;

  white-space: nowrap;

  margin-bottom: 10px;
}
.table-content > div:nth-child(1){
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #86929d;

  margin-left: 20px;
}
/* .table-content > div:nth-child(2) {
  font-size: 12px;

  margin-left: 4px;
} */
.table-content > div:nth-child(2) {
  flex: 1;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;

  margin-right: 20px;
}
</style>
