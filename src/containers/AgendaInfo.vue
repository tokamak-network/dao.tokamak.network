<template>
  <div>
    <div class="divider" />
    <div class="resource">
      <div class="title">
        Resources
      </div>
      <div>
        <span>
          Additional information about the MIPs process can be found in the
          <span class="blue">Maker Improvement Proposals (MIPs) repository.</span>
          If you are new to voting in the Maker Protocol, please see the
          <span class="blue">voting guide</span> to learn how voting works, and this
          <span class="blue">wallet setup guide</span>
          to set up your wallet to vote.<br>
          Additional information about the Governance process can be found in the <span class="blue">Governance</span>
          section of the MakerDAO community portal. To participate in future Governance calls, please
          <span class="blue">join us</span>
          every Thursday at 16:00 UTC. To add current and upcoming votes to your calendar, please see the
          <span class="blue">Tokamak DAO Public Events Calendar.</span>
        </span>
      </div>
    </div>
    <!-- <div v-if="account===agenda.operator"> -->
    <div class="button">
      <button-comp :name="'Agenda Edit'"
                   :type="'primary'"
                   :width="'110px'"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    'button-comp': Button,
  },
};
</script>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}
.resource {
  /* display: flex; */
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  white-space: pre-wrap;
}
.resource > div:first-child {
  /* width: 100%; */
  font-size: 16px;
  margin-bottom: 5px;
}
.resource > div:nth-child(2) {
  flex: 1;

  /* display: flex; */
  justify-content: flex-end;
  align-items: center;
}
.resource > div:nth-child(2) > img {
  margin-right: 7px;
}
.resource > div:nth-child(2) > span {
  color: #86929d;

  white-space: pre-wrap;
}
.resource > div:nth-child(2) > .black {
  color: #3e495c;
}
.resource > div:nth-child(2) > span > .blue {
  color: #2a72e5;
}
.button {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

