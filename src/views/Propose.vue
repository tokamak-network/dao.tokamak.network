<template>
  <div class="propose">
    <modal v-if="showModal"
           :width="786"
           @on-closed="showModal=false; currentFunction = ''; currentFunctionParams = []"
    >
      <template #body>
        <modal-propose :contract="currentContract"
                       :function-name="currentFunction"
                       :params="currentFunctionParams"
                       @on-closed="showModal=false; currentFunction = ''; currentFunctionParams = []"
        />
      </template>
    </modal>
    <div class="header">
      Propose Agenda
      <div>
        Propose Agenda
      </div>
    </div>
    <div class="propose">
      <div v-for="(contract, i) in contracts" :key="contract" class="propose-contract"
           :style="[
             index !== -1 ? { 'height': 124+'px' } : { height: 320+'px' },
             index === i ? { background: '#2a72e5' } : {},
           ]"
           @click="index=i; setCurrentContract(index);"
      >
        <img src="@/assets/propose1.svg" alt="" width="50" height="50">
        <div>
          <div class="contract-name"
               :style="[index === i ? { color: '#ffffff' } : {}]"
          >
            {{ contract }}
          </div>
          <div class="function-count"
               :style="[index !== -1 ? { visibility: 'hidden' } : {}]"
          >
            {{ numFunctions(i) }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="index === 0" class="box-container">
      <div>
        <div v-for="func in depositManagerFunctions" :key="func.name"
             @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs;"
        >
          <box :function-name="func.name"
               :status="currentFunction === func.name ? 'selected' : 'unselected'"
          />
        </div>
      </div>
    </div>
    <div v-if="index === 1" class="box-container">
      <div>
        <div v-for="func in seigManagerFunctions" :key="func.name"
             @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs;"
        >
          <box :function-name="func.name"
               :status="currentFunction === func.name ? 'selected' : 'unselected'"
          />
        </div>
      </div>
    </div>
    <div v-if="index === 2" class="box-container">
      <div>
        <div v-for="func in daoCommitteeFunctions" :key="func.name"
             @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs;"
        >
          <box :function-name="func.name"
               :status="currentFunction === func.name ? 'selected' : 'unselected'"
          />
        </div>
      </div>
    </div>
    <div v-if="index === 3" class="box-container">
      <div>
        <div v-for="func in daoVaultFunctions" :key="func.name"
             @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs;"
        >
          <box :function-name="func.name"
               :status="currentFunction === func.name ? 'selected' : 'unselected'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContractABI } from '@/utils/contracts';

import Box from '@/components/Box.vue';
import Modal from '@/components/Modal.vue';
import ModalPropose from '@/containers/ModalPropose.vue';

export default {
  components: {
    'box': Box,
    'modal': Modal,
    'modal-propose': ModalPropose,
  },
  data () {
    return {
      index : -1,
      showModal: false,

      contracts: ['Deposit Manager\n Contract', 'Seig Manager\n Contract', 'DAO Committee', 'DAO Vault'],

      currentContract: '',
      currentFunction: '',
      currentFunctionParams: [],

      depositManagerFunctions: [],
      seigManagerFunctions: [],
      daoCommitteeFunctions: [],
      daoVaultFunctions: [],
    };
  },
  created () {
    this.depositManagerFunctions = getContractABI('DepositManager');
    this.seigManagerFunctions = getContractABI('SeigManager');
    this.daoCommitteeFunctions = getContractABI('DAOCommittee');
    this.daoVaultFunctions = getContractABI('DAOVault');
  },
  methods: {
    numFunctions (index) {
      if (index === 0) return this.depositManagerFunctions.length;
      else if (index === 1) return this.seigManagerFunctions.length;
      else if (index === 2) return this.daoCommitteeFunctions.length;
      else if (index === 3) return this.daoVaultFunctions.length;
      else return 0;
    },
    setCurrentContract (index) {
      if (index === 0) this.currentContract = 'DepositManager';
      else if (index === 1) this.currentContract = 'SeigManager';
      else if (index === 2) this.currentContract = 'DAOCommittee';
      else if (index === 3) this.currentContract = 'DAOVault';
    },
  },
};
</script>

<style lang="scss" scoped>
.propose {
  flex: 1;

  background: #fafbfc;

  > .header {
    margin-top: 40px;
    margin-left: 10%;
    margin-bottom: 100px;

    font-family: Roboto;
    font-size: 70px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #eff1f6;

    position: relative;

    white-space: nowrap;

    > div {
      position: absolute;
      left: 30px;
      bottom: 0px;

      font-family: Roboto;
      font-size: 25px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;
    }
  }

  > .propose {
    display: flex;
    justify-content: center;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      width: 276px;
      border-radius: 15px;
      box-shadow: 0 10px 15px 0 rgba(223, 228, 238, 0.25);
      background-color: #ffffff;

      position: relative;

      transition: height 0.5s;

      margin-left: 15px;
      margin-right: 15px;

      > img {
        position: absolute;
        right: 30px;
        top: 30px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-left: 30px;
        padding-right: 20px;
        padding-bottom: 19px;
      }
    }

    .contract-name {
      font-family: Roboto;
      font-size: 24px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      color: #3e495c;

      white-space: pre-wrap;
      margin-left: -10px;
    }
    .function-count {
      font-family: Roboto;
      font-size: 64px;
      font-weight: 100;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.31;
      letter-spacing: normal;
      text-align: right;
      color: #f4f6f9;
    }
  }

  .box-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 1194px;

      display: flex;
      flex-wrap: wrap;

      margin-top: 40px;
    }
  }

  .propose-contract {
    &:hover {
      cursor: pointer;

      background: #2a72e5;

      .contract-name {
        color: #ffffff;
      }
    }
  }
}
</style>
