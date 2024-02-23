<template>
  <div class="mobile-footer"
       :style="[
         !isSub() ? { background: '#0062c2' } : { background: '#fafbfc' },
       ]"
  >
    <!-- <div>
      <a href="" target="_blank" class="clause"
         :style="[
           !isSub() ? { color: '#a6c8e9' } : { color: '#86929d' },
         ]"
      >
        Terms
      </a>
      <a href="" target="_blank" class="clause"
         :style="[
           !isSub() ? { color: '#a6c8e9' } : { color: '#86929d' },
         ]"
      >
        Privacy Policy
      </a>
      <a href="" target="_blank" class="clause"
         :style="[
           !isSub() ? { color: '#a6c8e9' } : { color: '#86929d' },
         ]"
      >
        Status
      </a>
    </div> -->
    <span class="company"
          :style="[
            !isSub() ? { color: '#999999' } : { color: '#999999' },
          ]"
    >
      Copyright © 2024 <span style="color: #1c1c1c;">Tokamak Network</span> All Rights Reserved.
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    isSub () {
      return this.$route.path !== '/';
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 76px;
}

.clause {
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
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
  width: 230px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  padding-top: 20px;
}
</style>
