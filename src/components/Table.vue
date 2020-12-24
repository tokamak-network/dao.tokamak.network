<template>
  <div class="table">
    <table>
      <tbody>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON)</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON)</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON)</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON)</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON)</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {

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
  height: 180px;
  overflow-y: auto;
  background: #ffffff;
}
.table-content {
  display: flex;
  align-items: center;

  white-space: nowrap;

  margin-bottom: 10px;
}
.table-content > div:nth-child(1), .table-content > div:nth-child(2) {
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
.table-content > div:nth-child(2) {
  font-size: 12px;

  margin-left: 4px;
}
.table-content > div:nth-child(3) {
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
