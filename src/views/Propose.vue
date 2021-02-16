<template>
  <div class="propose"
       :style="[
         isEntrance ? { 'justify-content': 'center' } : {},
       ]"
  >
    <modal v-if="showModal"
           :width="'786px'"
           @on-closed="showModal=false; currentFunction = ''; currentFunctionParams = []"
    >
      <template #body>
        <modal-propose :contract="currentContract"
                       :function-name="currentFunction"
                       :params="currentFunctionParams"
                       :explanation="currentFunctionExplanation"
                       :type="type"
                       @on-closed="showModal=false; currentFunction = ''; currentFunctionParams = []"
        />
      </template>
    </modal>
    <div v-if="isEntrance" class="entrance">
      <div class="entrance-typeA" @mouseover="hoverOn='A'" @mouseleave="hoverOn=''"
           @click="isEntrance=false;"
      >
        <div class="title"
             :style="[
               hoverOn === 'B' ? { 'color': '#f8f9fb' } : {},
             ]"
        >
          Propose Contract
        </div>
        <div class="type"
             :style="[
               hoverOn === 'B' ? { 'color': '#dddfe3' } : {},
             ]"
        >
          A
        </div>
        <div class="explanation-1"
             :style="[
               hoverOn === 'B' ? { 'color': '#e8ebed' } : {},
             ]"
        >
          You can create a sound Tokamak Network ecosystem.
        </div>
        <div class="explanation-2"
             :style="[
               hoverOn === 'B' ? { 'color': '#e8ebed' } : {},
             ]"
        >
          Please participate in various suggestions.
        </div>
      </div>
      <div class="diagonal" />
      <div class="entrance-typeB" @mouseover="hoverOn='B'" @mouseleave="hoverOn=''"
           @click="isEntrance=false; type='B';"
      >
        <div class="title"
             :style="[
               hoverOn === 'A' ? { 'color': '#f8f9fb' } : {},
             ]"
        >
          Propose Contract
        </div>
        <div class="type"
             :style="[
               hoverOn === 'A' ? { 'color': '#dddfe3' } : {},
             ]"
        >
          B
        </div>
        <div class="explanation-1"
             :style="[
               hoverOn === 'A' ? { 'color': '#e8ebed' } : {},
             ]"
        >
          Tokamak Network infrastructure may be affected.
        </div>
        <div class="explanation-2"
             :style="[
               hoverOn === 'A' ? { 'color': '#e8ebed' } : {},
             ]"
        >
          Careful suggestions are required.
        </div>
      </div>
    </div>
    <div v-else style="display: flex; flex-direction: column; align-items: center;">
      <div class="header">
        Propose Agenda
      </div>
      <div class="type-container">
        <div class="typeA"
             :class="{'typeA-selected': type === 'A'}"
             @click="type = 'A'; index = -1;"
        >
          Type A
        </div>
        <div class="typeB"
             :class="{'typeB-selected': type === 'B'}"
             @click="type = 'B'; indexOfTypeB = -1;"
        >
          Type B
        </div>
      </div>
      <div class="type-explanation">
        {{ type === 'A' ?
          'You can create a sound Tokamak Network ecosystem. Please participate in various suggestions.' :
          'Tokamak Network infrastructure may be affected. Careful suggestions are required.' }}
      </div>
      <!-- typeA -->
      <div v-if="type === 'A'">
        <div class="propose-container">
          <div v-for="(contract, i) in contractsOfTypeA" :key="contract" class="propose-contract"
               :style="[
                 index !== -1 ? { 'height': 124+'px' } : { height: 320+'px' },
                 index === i ? { background: '#2a72e5' } : {},
               ]"
               @click="index=i; setCurrentContract(index);"
          >
            <div class="function-count"
                 :style="[index !== -1 ? { display: 'none' } : {}]"
            >
              {{ pad(numFunctions(i)) }}
            </div>
            <img v-if="i === 0" src="@/assets/icon-deposit-manager-typeA.svg" alt="" width="50" height="50">
            <img v-else-if="i === 1" src="@/assets/icon-seig-manager-typeA.svg" alt="" width="50" height="50">
            <img v-else-if="i === 2" src="@/assets/icon-dao-committee-typeA.svg" alt="" width="50" height="50">
            <img v-else-if="i === 3" src="@/assets/icon-dao-vault-typeA.svg" alt="" width="50" height="50">
            <div>
              <div class="contract-name"
                   :style="[index === i ? { color: '#ffffff' } : {}]"
              >
                {{ contract }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="index === 0" class="box-container">
          <div>
            <div v-for="func in depositManagerFunctionsOfTypeA" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'A'"
              />
            </div>
          </div>
        </div>
        <div v-if="index === 1" class="box-container">
          <div>
            <div @click="showModal=true; currentFunction='setSeigRates'; currentFunctionParams = setSeigRatesParams;">
              <box :function-name="'setSeigRates'"
                   :type="'A'"
              />
            </div>
            <div v-for="func in seigManagerFunctionsOfTypeA" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'A'"
              />
            </div>
          </div>
        </div>
        <div v-if="index === 2" class="box-container">
          <div>
            <div v-for="func in daoCommitteeProxyFunctionsOfTypeA" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'A'"
              />
            </div>
          </div>
        </div>
        <div v-if="index === 3" class="box-container">
          <div>
            <div v-for="func in daoVaultFunctionsOfTypeA" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'A'"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- typeB -->
      <div v-else style="max-width: 1224px;">
        <div class="propose-container" style="display: flex; flex-wrap: wrap;">
          <div v-for="(contract, i) in contractsOfTypeB" :key="contract" class="propose-contract-typeB"
               :style="[
                 indexOfTypeB !== -1 ? { 'height': 124+'px' } : { height: 270+'px' },
                 indexOfTypeB === i ? { background: '#f7981c' } : {},
               ]"
               style="margin-bottom: 30px;"
               @click="indexOfTypeB=i; setCurrentContractOfTypeB(indexOfTypeB);"
          >
            <div class="function-count"
                 :style="[indexOfTypeB !== -1 ? { display: 'none' } : {}]"
            >
              {{ pad(numFunctionsOfTypeB(i)) }}
            </div>
            <img v-if="i === 0" src="@/assets/icon-ton-typeB.svg" alt="" width="50" height="50">
            <img v-else-if="i === 1" src="@/assets/icon-wton-typeB.svg" alt="" width="50" height="50">
            <img v-else-if="i === 2" src="@/assets/icon-deposit-manager-typeB.svg" alt="" width="50" height="50">
            <img v-else-if="i === 3" src="@/assets/icon-seig-manager-typeB.svg" alt="" width="50" height="50">
            <img v-else-if="i === 4" src="@/assets/icon-layer2-registry-typeB.svg" alt="" width="50" height="50">
            <img v-else-if="i === 5" src="@/assets/icon-dao-committee-proxy-typeB.svg" alt="" width="50" height="50">
            <img v-else-if="i === 6" src="@/assets/icon-dao-committee-typeB.svg" alt="" width="50" height="50">
            <img v-else-if="i === 7" src="@/assets/icon-dao-vault-typeB.svg" alt="" width="50" height="50">
            <div>
              <div class="contract-name"
                   :style="[indexOfTypeB === i ? { color: '#ffffff' } : {}]"
              >
                {{ contract }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 0" class="box-container-typeB">
          <div>
            <div v-for="func in tonFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 1" class="box-container-typeB">
          <div>
            <div v-for="func in wtonFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 2" class="box-container-typeB">
          <div>
            <div v-for="func in depositManagerFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 3" class="box-container-typeB">
          <div>
            <div v-for="func in seigManagerFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 4" class="box-container-typeB">
          <div>
            <div v-for="func in layer2RegistryFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 5" class="box-container-typeB">
          <div>
            <div v-for="func in daoCommitteeProxyFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 6" class="box-container-typeB">
          <div>
            <div v-for="func in daoCommitteeFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
        <div v-if="indexOfTypeB === 7" class="box-container-typeB">
          <div>
            <div v-for="func in daoVaultFunctionsOfTypeB" :key="func.name"
                 @click="showModal=true; currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box :function-name="func.name"
                   :status="currentFunction === func.name ? 'selected' : 'unselected'"
                   :type="'B'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContractABI } from '@/utils/contracts';
import { pad } from '@/utils/helpers';

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
      index: -1,
      indexOfTypeB: -1,
      showModal: false,
      isEntrance: true,

      contractsOfTypeA: ['Deposit Manager\n Contract', 'Seig Manager\n Contract', 'DAO Committee\n Contract', 'DAO Vault2\n Contract'],
      contractsOfTypeB: [
        'TON\n Contract',
        'WTON\n Contract',
        'Deposit Manager\n Contract',
        'Seig Manager\n Contract',
        'Layer2 Registry\n Contract',
        'DAO Committee\n Proxy Contract',
        'DAO Committee\n Contract',
        // 'Candidate\n Contract',
        'DAO Vault2\n Contract',
      ],

      currentContract: '',
      currentFunction: '',
      currentFunctionExplanation: '',
      currentFunctionParams: [],

      depositManagerFunctionsOfTypeA: [],
      seigManagerFunctionsOfTypeA: [],
      daoCommitteeProxyFunctionsOfTypeA: [],
      daoVaultFunctionsOfTypeA: [],

      tonFunctionsOfTypeB: [],
      wtonFunctionsOfTypeB: [],
      depositManagerFunctionsOfTypeB: [],
      seigManagerFunctionsOfTypeB: [],
      layer2RegistryFunctionsOfTypeB: [],
      daoCommitteeProxyFunctionsOfTypeB: [],
      daoCommitteeFunctionsOfTypeB: [],
      // candidateFunctionsOfTypeB: [],
      daoVaultFunctionsOfTypeB: [],

      setSeigRatesParams: [
        { 'internalType': 'uint256', 'name': 'powerTONSeigRate_', 'type': 'uint256' },
        { 'internalType': 'uint256', 'name': 'daoSeigRate_', 'type': 'uint256' },
        { 'internalType': 'uint256', 'name': 'PseigRate_', 'type': 'uint256' },
      ],

      type: 'A',
      hoverOn: '',
    };
  },
  computed: {
    pad () {
      return amount => pad(amount, 2);
    },
  },
  created () {
    this.depositManagerFunctionsOfTypeA = getContractABI('DepositManager', 'A');
    this.seigManagerFunctionsOfTypeA = getContractABI('SeigManager', 'A');
    this.daoCommitteeProxyFunctionsOfTypeA = getContractABI('DAOCommitteeProxy', 'A');
    this.daoVaultFunctionsOfTypeA = getContractABI('DAOVault', 'A');

    this.tonFunctionsOfTypeB = getContractABI('TON', 'B');
    this.wtonFunctionsOfTypeB = getContractABI('WTON', 'B');
    this.depositManagerFunctionsOfTypeB = getContractABI('DepositManager', 'B');
    this.seigManagerFunctionsOfTypeB = getContractABI('SeigManager', 'B');
    this.layer2RegistryFunctionsOfTypeB = getContractABI('Layer2Registry', 'B');
    this.daoCommitteeProxyFunctionsOfTypeB = getContractABI('DAOCommitteeProxy', 'B');
    this.daoCommitteeFunctionsOfTypeB = getContractABI('DAOCommittee', 'B');
    // this.candidateFunctionsOfTypeB         = getContractABI('Candidate', 'B');
    this.daoVaultFunctionsOfTypeB = getContractABI('DAOVault', 'B');
  },
  methods: {
    numFunctions (index) {
      if (index === 0) return this.depositManagerFunctionsOfTypeA.length;
      else if (index === 1) return this.seigManagerFunctionsOfTypeA.length;
      else if (index === 2) return this.daoCommitteeProxyFunctionsOfTypeA.length;
      else if (index === 3) return this.daoVaultFunctionsOfTypeA.length;
      else return 0;
    },
    numFunctionsOfTypeB (index) {
      if (index === 0) return this.tonFunctionsOfTypeB.length;
      else if (index === 1) return this.wtonFunctionsOfTypeB.length;
      else if (index === 2) return this.depositManagerFunctionsOfTypeB.length;
      else if (index === 3) return this.seigManagerFunctionsOfTypeB.length;
      else if (index === 4) return this.layer2RegistryFunctionsOfTypeB.length;
      else if (index === 5) return this.daoCommitteeProxyFunctionsOfTypeB.length;
      else if (index === 6) return this.daoCommitteeFunctionsOfTypeB.length;
      else if (index === 7) return this.daoVaultFunctionsOfTypeB.length;
      else return 0;
    },
    setCurrentContract (index) {
      if (index === 0) this.currentContract = 'DepositManager';
      else if (index === 1) this.currentContract = 'SeigManager';
      else if (index === 2) this.currentContract = 'DAOCommitteeProxy';
      else if (index === 3) this.currentContract = 'DAOVault';
    },
    setCurrentContractOfTypeB (index) {
      if (index === 0) this.currentContract = 'TON';
      else if (index === 1) this.currentContract = 'WTON';
      else if (index === 2) this.currentContract = 'DepositManager';
      else if (index === 3) this.currentContract = 'SeigManager';
      else if (index === 4) this.currentContract = 'Layer2Registry';
      else if (index === 5) this.currentContract = 'DAOCommitteeProxy';
      else if (index === 6) this.currentContract = 'DAOCommittee';
      else if (index === 7) this.currentContract = 'DAOVault';
    },
  },
};
</script>

<style lang="scss" scoped>
.propose {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #fafbfc;

  .entrance {
    display: flex;
    justify-content: center;
    align-items: center;

    .diagonal {
      width: 1px;
      height: 483.2px;
      background: #dfe4ee;

      transform: rotate(20deg);

      margin-right: 55px;
    }

    .entrance-typeA {
      position: relative;

      margin-bottom: 100px;
      margin-right: 20px;

      &:hover {
        cursor: pointer;

        > .type {
          color: #2a72e5;
        }
        > .explanation-1 {
          color: #3e495c
        }
        > .explanation-2 {
          color: #3e495c
        }
      }

      > .title {
        font-family: Roboto;
        font-size: 60px;
        font-weight: 900;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.32;
        letter-spacing: normal;
        color: #eff1f6;
      }

      > .type {
        font-family: Roboto;
        font-size: 135px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.32;
        letter-spacing: normal;
        color: #3e495c;

        position: absolute;
        top: 12px;
        right: 28px;
      }

      > .explanation-1 {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: 0.35px;
        color: #86929d;

        margin-top: 109px;
        margin-left: 56px;
      }
      > .explanation-2 {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: 0.35px;
        color: #86929d;

        margin-top: 2px;
        padding-left: 130px;
      }
    }

    .entrance-typeB {
      position: relative;

      margin-top: 50px;
      margin-left: -40px;

      &:hover {
        cursor: pointer;

        > .type {
          color: #f7981c;
        }
        > .explanation-1 {
          color: #3e495c
        }
        > .explanation-2 {
          color: #3e495c
        }
      }

      > .title {
        font-family: Roboto;
        font-size: 60px;
        font-weight: 900;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.32;
        letter-spacing: normal;
        color: #eff1f6;

        padding-left: 60px;
      }

      > .type {
        font-family: Roboto;
        font-size: 135px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.32;
        letter-spacing: normal;
        color: #3e495c;

        position: absolute;
        top: 8px;
        left: 66px;
      }

      > .explanation-1 {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: 0.35px;
        color: #86929d;

        margin-top: 109px;
        margin-left: 12px;
      }
      > .explanation-2 {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: 0.35px;
        color: #86929d;

        margin-top: 2px;
      }
    }
  }

  .header {
    font-family: Roboto;
    font-size: 70px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    text-align: center;
    color: #eff1f6;

    margin-top: 24px;
    margin-bottom: 33px;

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

  .propose-container {
    display: flex;

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
        right: 20px;
        top: 35px;
      }

      .function-count {
        position: absolute;
        left: -8px; top: 30px;

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
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;
      color: #3e495c;

      white-space: pre-wrap;
      margin-left: -10px;

      margin-bottom: 12px;
    }
  }

  .type-container {
    display: flex;

    .typeA {
      width: 102px;
      height: 30px;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 5px;
      background-color: #ffffff;

      font-family: Roboto;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: 0.46px;
      text-align: center;
      color: #818992;

      &:hover {
        cursor: pointer;
      }

    }

    .typeA-selected {
      background-color: #2a72e5;
      color: #ffffff;
    }

    .typeB {
      width: 102px;
      height: 30px;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 5px;
      background-color: #ffffff;

      font-family: Roboto;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: 0.46px;
      text-align: center;
      color: #818992;

      &:hover {
        cursor: pointer;
      }

    }

    .typeB-selected {
      background-color: #f7981c;
      color: #ffffff;
    }
  }

  .type-explanation {
    width: 364px;

    font-family: Roboto;
    font-size: 14px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.35px;
    text-align: center;
    color: #86929d;

    margin-top: 15px;
    margin-bottom: 50px;
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

  .box-container-typeB {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 1194px;

      display: flex;
      flex-wrap: wrap;

      margin-top: 10px;
    }
  }

  .propose-contract {
    &:hover {
      cursor: pointer;

      background: #2a72e5;

      .contract-name {
        color: #f4f6f9;
      }
    }
  }

  .propose-contract-typeB {
    &:hover {
      cursor: pointer;

      background: #f7981c;

      .contract-name {
        color: #f4f6f9;
      }
    }
  }
}
</style>
