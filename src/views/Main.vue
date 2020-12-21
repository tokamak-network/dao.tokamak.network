<template>
  <div class="main">
    <div class="main-logo">
      <div class="main-btn">
        <div class="count">5</div>
        <span>New Election Votes</span>
        <img src="@/assets/arrow-next-main.png" alt=""
             width="4" height="8"
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
};
</script>

<style scoped>
.main {
  /* All views must have this attribute.*/
  flex: 1;

  display: flex;
  justify-content: center;
  background: #0062c2;
}

.main-logo {
  width: 840px;
  height: 607px;

  background: url('../assets/logo-main.png') no-repeat;
  /* background-size: 840px; */
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;
}

.main-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 38px;
  border-radius: 25px;
  box-shadow: 0 0 10px 0 rgba(215, 222, 227, 0.4);
  background-color: #f6f8f9;

  position: absolute;
  bottom: 92px;

  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.main-btn:hover {
  cursor: pointer;
}

.count {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #2a72e5;

  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  margin-left: 9px;
  margin-right: 12px;
}

.main-btn span {
  flex: 1;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: left;
  color: #354052;
}

.main-btn img {
  margin-right: 15px;
}
</style>
