<template>
  <div class="table">
    <table>
      <tbody>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON, 22.5 weight)</div>
            <div>Abstain</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON, 22.5 weight)</div>
            <div>Abstain</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON, 22.5 weight)</div>
            <div>Abstain</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON, 22.5 weight)</div>
            <div>Abstain</div>
            <div>0x56a1...8a73</div>
          </div>
        </tr>
        <tr>
          <div class="table-content">
            <div>56.3%</div>
            <div>(40 TON, 22.5 weight)</div>
            <div>Abstain</div>
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
}
table td, table th {
  overflow-wrap: anywhere;
}

.table {
  height: 140px;
  overflow: auto;
  background: #ffffff;
}
.table-content {
  display: flex;
  align-items: center;

  white-space: nowrap;
}
.table-content > div:nth-child(1), .table-content > div:nth-child(2) {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.17;
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
  font-size: 12px;
  color: #3e495c;

  flex: 1;

  margin-left: 8px;
}
.table-content > div:nth-child(4) {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
  text-align: right;
  color: #2a72e5;

  margin-right: 20px;
}
</style>
