<template>
  <div class="card-voters">
    <card-container :title="'Voters'">
      <template #body>
        <div class="table">
          <table>
            <tbody>
              <tr>
                <div class="table-content">
                  <div>Yes</div>
                  <div>0x56a1...8a73</div>
                </div>
              </tr>
              <tr>
                <div class="table-content">
                  <div>Yes</div>
                  <div>0x56a1...8a73</div>
                </div>
              </tr>
              <tr>
                <div class="table-content">
                  <div>No</div>
                  <div>0x56a1...8a73</div>
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
