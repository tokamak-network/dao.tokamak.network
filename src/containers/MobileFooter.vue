<template>
  <div class="mobile-footer">
    <div>
      <a href="" target="_blank" class="clause">Terms</a>
      <a href="" target="_blank" class="clause">Privacy Policy</a>
      <a href="" target="_blank" class="clause">Status</a>
    </div>
    <span class="company">© 2021 Onther</span>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.mobile-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 76px;
  background: #0062c2;
}

.clause {
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: right;
  color: #a6c8e9;

  padding-bottom: 7px;
  padding-left: 15px;
  padding-right: 15px;

  text-decoration: none;
  white-space: nowrap;
}

.clause:hover {
  text-decoration: underline;
  color: #ffffff;
}

.company {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;

  padding-top: 8px;
}
</style>
