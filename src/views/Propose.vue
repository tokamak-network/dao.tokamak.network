<template>
  <div class="propose">
    <modal v-if="showModal" :width="$mq === 'mobile' ? '90%' : '786px'">
      <template #body>
        <modal-propose
          :contract="currentContract"
          :function-name="currentFunction"
          :params="currentFunctionParams"
          :explanation="currentFunctionExplanation"
          :type="type"
          @on-closed="closeModal(); currentFunction = ''; currentFunctionParams = []"
        />
      </template>
    </modal>
    <div v-if="$mq === 'desktop' || $mq === 'tablet'" class="propose-desktop">
      <div class="header">
        Propose Agenda
      </div>
      <div class="type-container">
        <div class="type">
          <div class="type-a" :class="{'type-a-selected': type === 'A'}" @click="type = 'A'; index = -1;">
            Type A
          </div>
          <div class="type-b" :class="{'type-b-selected': type === 'B'}" @click="type = 'B'; indexOfTypeB = -1;">
            Type B
          </div>
        </div>
        <div class="type-explanation">
          {{ type === 'A'
            ? 'You can create a sound Tokamak Network ecosystem. Please participate in various suggestions.'
            : 'Tokamak Network infrastructure may be affected. Careful suggestions are required.' }}
        </div>
      </div>
      <div class="wrapper">
        <div
          v-if="type === 'A'"
          class="contract-container"
          :style="setContractGridTemplateColumns"
        >
          <div
            v-for="(contract, i) in contractsOfTypeA"
            :key="contract"
            class="contract-card contract-card-type-a"
            :style="[
              index !== -1 ? { height: 124 + 'px', transition: 'height 0.5s' } : { height: 320 + 'px' },
              index === i ? { background: '#2a72e5', 'box-shadow': '0 10px 15px 0 rgba(42, 114, 229, 0.25)' } : { 'box-shadow': '0 10px 15px 0 rgba(223, 228, 238, 0.25)' },
            ]"
            @click="index = i; setCurrentContract();"
          >
            <div class="contract-num-functions" :style="[index !== -1 ? { display: 'none' } : {}]">
              {{ pad(numFunctions(i)) }}
            </div>
            <div class="contract-name" :style="[index === i ? { color: '#ffffff' } : {}]">
              {{ contract }}
            </div>
            <img class="contract-icon" :src="getImg(i, contract, type)" alt="" width="50" height="50" />
          </div>
        </div>
        <div
          v-else-if="type === 'B'"
          class="contract-container"
          :style="setContractGridTemplateColumns"
        >
          <div
            v-for="(contract, i) in contractsOfTypeB"
            :key="contract"
            class="contract-card contract-card-type-b"
            :style="[
              indexOfTypeB !== -1 ? { height: 124 + 'px', transition: 'height 0.5s' } : { height: 320 + 'px' },
              indexOfTypeB === i ? { background: '#f7981c', 'box-shadow': '0 10px 15px 0 rgba(247, 152, 28, 0.25)' } : { 'box-shadow': '0 10px 15px 0 rgba(223, 228, 238, 0.25)' },
            ]"
            @click="indexOfTypeB = i; setCurrentContract();"
          >
            <div class="contract-num-functions" :style="[indexOfTypeB !== -1 ? { display: 'none' } : {}]">
              {{ pad(numFunctionsOfTypeB(i)) }}
            </div>
            <div class="contract-name" :style="[indexOfTypeB === i ? { color: '#ffffff' } : {}]">
              {{ contract }}
            </div>
            <img class="contract-icon" :src="getImg(i, contract, type)" alt="" width="50" height="50" />
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div
          class="function-container function-container-desktop"
          :style="setFunctionGridTemplateColumns"
        >
          <div
            v-if="index === 1"
            class="function-box"
            @click="openModal(); currentFunction = 'setSeigRates'; currentFunctionParams = setSeigRatesParams; currentFunctionExplanation = ''"
          >
            <box
              :function-name="'setSeigRates'"
              :status="currentFunction === 'setSeigRates' ? 'selected' : 'unselected'"
              :type="'A'"
            />
          </div>
          <div
            v-for="func in getFunctions()"
            :key="func.name"
            class="function-box"
            @click="func.disabled ? '' : openModal(); currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
          >
            <box
              :function-name="func.name"
              :status="func.disabled ? 'disabled' : currentFunction === func.name ? 'selected' : 'unselected'"
              :type="type"
            />
            <div v-if="func.disabled" class="tooltip">
              <img src="@/assets/tooltip-mobile.png" alt="" width="4" height="6" style="margin-top: 30px" />
              <div class="tooltip-content">
                This function will become available after the DAO contract is upgraded
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="$mq === 'mobile'" class="propose-mobile">
      <div class="header">Propose Agenda</div>
      <div class="type-container">
        <div class="type">
          <div class="type-a" :class="{'type-a-selected': type === 'A'}" @click="type = 'A'; index = -1;">
            Type A
          </div>
          <div class="type-b" :class="{'type-b-selected': type === 'B'}" @click="type = 'B'; indexOfTypeB = -1;">
            Type B
          </div>
        </div>
        <div class="type-explanation">
          {{ type === 'A'
            ? 'You can create a sound Tokamak Network ecosystem. Please participate in various suggestions.'
            : 'Tokamak Network infrastructure may be affected. Careful suggestions are required.' }}
        </div>
      </div>
      <div v-if="type === 'A'" class="contract-container" :style="setContractGridTemplateColumns">
        <div v-for="(contract, i) in contractsOfTypeA" :key="contract">
          <div
            class="contract-card contract-card-type-a"
            :style="[
              index === i ? { background: '#2a72e5', 'box-shadow': '0 10px 15px 0 rgba(42, 114, 229, 0.25)' } : { 'box-shadow': '0 10px 15px 0 rgba(223, 228, 238, 0.25)' },
            ]"
            @click="selectContract(i, type); setCurrentContract();"
          >
            <div class="contract-name" :style="[index === i ? { color: '#ffffff' } : {}]">
              {{ contract }}
            </div>
            <img class="contract-icon" :src="getImg(i, contract, type)" alt="" width="30" height="30" />
          </div>
          <div v-if="index === i" class="function-container" :style="setFunctionGridTemplateColumns">
            <div
              v-if="index === 1"
              @click="openModal(); currentFunction = 'setSeigRates'; currentFunctionParams = setSeigRatesParams; currentFunctionExplanation = ''"
            >
              <box
                :function-name="'setSeigRates'"
                class="function-box"
                :status="currentFunction === 'setSeigRates' ? 'selected' : 'unselected'"
                :type="'A'"
              />
            </div>
            <div
              v-for="func in getFunctions()"
              :key="func.name"
              class="function-box"
              @click="func.disabled ? '' : openModal(); currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box
                :function-name="func.name"
                :status="func.disabled ? 'disabled' : currentFunction === func.name ? 'selected' : 'unselected'"
                :type="type"
                class="box"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="type === 'B'" class="contract-container" :style="setContractGridTemplateColumns">
        <div v-for="(contract, i) in contractsOfTypeB" :key="contract">
          <div
            class="contract-card contract-card-type-b"
            :style="[
              indexOfTypeB === i ? { background: '#f7981c', 'box-shadow': '0 10px 15px 0 rgba(247, 152, 28, 0.25)' } : { 'box-shadow': '0 10px 15px 0 rgba(223, 228, 238, 0.25)' },
            ]"
            @click="selectContract(i, type); setCurrentContract();"
          >
            <div class="contract-name" :style="[indexOfTypeB === i ? { color: '#ffffff' } : {}]">
              {{ contract }}
            </div>
            <img class="contract-icon" :src="getImg(i, contract, type)" alt="" width="30" height="30" />
          </div>
          <div v-if="indexOfTypeB === i" class="function-container" :style="setFunctionGridTemplateColumns">
            <div
              v-for="func in getFunctions()"
              :key="func.name"
              @click="func.disabled ? '' : openModal(); currentFunction = func.name; currentFunctionParams = func.inputs; currentFunctionExplanation = func.explanation;"
            >
              <box
                :function-name="func.name"
                :status="func.disabled ? 'disabled' : currentFunction === func.name ? 'selected' : 'unselected'"
                :type="type"
                class="box"
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

// Type A assets
import depositManagerActive from '@/assets/contract-deposit-manager-active.svg';
import depositManagerInactive from '@/assets/contract-deposit-manager-inactive.svg';
import seigManagerActive from '@/assets/contract-seig-manager-active.svg';
import seigManagerInactive from '@/assets/contract-seig-manager-inactive.svg';
import daoCommitteeProxyActive from '@/assets/contract-dao-committee-active.svg';
import daoCommitteeProxyInactive from '@/assets/contract-dao-committee-inactive.svg';
import daoVaultActive from '@/assets/contract-dao-vault-active.svg';
import daoVaultInactive from '@/assets/contract-dao-vault-inactive.svg';

// Type B assets
import tonActive from '@/assets/contract-ton-active-typeB.svg';
import tonInactive from '@/assets/contract-ton-inactive-typeB.svg';
import wtonActive from '@/assets/contract-wton-active-typeB.svg';
import wtonInactive from '@/assets/contract-wton-inactive-typeB.svg';
import depositManagerActiveTypeB from '@/assets/contract-deposit-manager-active-typeB.svg';
import depositManagerInactiveTypeB from '@/assets/contract-deposit-manager-inactive-typeB.svg';
import seigManagerActiveTypeB from '@/assets/contract-seig-manager-active-typeB.svg';
import seigManagerInactiveTypeB from '@/assets/contract-seig-manager-inactive-typeB.svg';
import layer2RegistryActive from '@/assets/contract-layer2-registry-active-typeB.svg';
import layer2RegistryInactive from '@/assets/contract-layer2-registry-inactive-typeB.svg';
import daoCommitteeProxyActiveTypeB from '@/assets/contract-dao-committee-proxy-active-typeB.svg';
import daoCommitteeProxyInactiveTypeB from '@/assets/contract-dao-committee-proxy-inactive-typeB.svg';
import daoCommitteeActiveTypeB from '@/assets/contract-dao-committee-active-typeB.svg';
import daoCommitteeInactiveTypeB from '@/assets/contract-dao-committee-inactive-typeB.svg';
import daoVaultActiveTypeB from '@/assets/contract-dao-vault-active-typeB.svg';
import daoVaultInactiveTypeB from '@/assets/contract-dao-vault-inactive-typeB.svg';
// For PowerTON Proxy, we reuse the seigManager type B assets per original code

export default {
  name: 'ProposeAgenda',
  components: {
    box: Box,
    modal: Modal,
    'modal-propose': ModalPropose,
  },
  data() {
    return {
      index: -1,
      indexOfTypeB: -1,
      showModal: false,

      contractsOfTypeA: [
        'Deposit Manager\nContract',
        'Seig Manager\nContract',
        'DAO Committee\nProxy Contract',
        'DAO Vault\nContract',
        'L1 Bridge Registry\nContract',
      ],
      contractsOfTypeB: [
        'TON\nContract',
        'WTON\nContract',
        'Deposit Manager\nContract',
        'Seig Manager\nContract',
        'Layer2 Registry\n Contract',
        'DAO Committee\nProxy Contract',
        'DAO Committee\nContract',
        'DAO Vault\nContract',
        'L1 Bridge Registry\nContract',
        'PowerTON Proxy\nContract',
      ],

      currentContract: '',
      currentFunction: '',
      currentFunctionExplanation: '',
      currentFunctionParams: [],

      depositManagerFunctionsOfTypeA: [],
      seigManagerFunctionsOfTypeA: [],
      daoCommitteeProxyFunctionsOfTypeA: [],
      daoVaultFunctionsOfTypeA: [],
      l1BridgeRegistryFunctionsOfTypeA: [],

      tonFunctionsOfTypeB: [],
      wtonFunctionsOfTypeB: [],
      depositManagerFunctionsOfTypeB: [],
      seigManagerFunctionsOfTypeB: [],
      layer2RegistryFunctionsOfTypeB: [],
      daoCommitteeProxyFunctionsOfTypeB: [],
      daoCommitteeFunctionsOfTypeB: [],
      daoVaultFunctionsOfTypeB: [],
      l1BridgeRegistryFunctionsOfTypeB: [],
      powerTonProxyFunctionsOfTypeB: [],

      setSeigRatesParams: [
        { internalType: 'uint256', name: 'powerTONSeigRate_', type: 'uint256' },
        { internalType: 'uint256', name: 'daoSeigRate_', type: 'uint256' },
        { internalType: 'uint256', name: 'PseigRate_', type: 'uint256' },
      ],

      type: 'A',
      hoverOn: '',

      width: 0,
    };
  },
  computed: {
    pad() {
      return (amount) => pad(amount, 2);
    },
    setContractGridTemplateColumns() {
      if (this.width >= 1250) {
        return { 'grid-template-columns': 'repeat(4, 1fr)' };
      } else if (this.width >= 920 && this.width < 1250) {
        return { 'grid-template-columns': 'repeat(3, 1fr)' };
      } else if (this.width >= 620 && this.width < 920) {
        return { 'grid-template-columns': 'repeat(2, 1fr)' };
      } else {
        return { 'grid-template-columns': 'repeat(1, 1fr)' };
      }
    },
    setFunctionGridTemplateColumns() {
      if (this.width >= 1250) {
        return { 'grid-template-columns': 'repeat(6, 1fr)' };
      } else if (this.width >= 920 && this.width < 1250) {
        return { 'grid-template-columns': 'repeat(4, 1fr)' };
      } else if (this.width >= 620 && this.width < 920) {
        return { 'grid-template-columns': 'repeat(2, 1fr)' };
      } else {
        return { 'grid-template-columns': 'repeat(1, 1fr)' };
      }
    },
  },
  created() {
    this.depositManagerFunctionsOfTypeA = getContractABI('DepositManager', 'A');
    this.seigManagerFunctionsOfTypeA = getContractABI('SeigManager', 'A');
    this.daoCommitteeProxyFunctionsOfTypeA = getContractABI('DAOCommitteeProxy', 'A');
    this.daoVaultFunctionsOfTypeA = getContractABI('DAOVault', 'A');
    this.l1BridgeRegistryFunctionsOfTypeA = getContractABI('L1BridgeRegistry', 'A');
    this.tonFunctionsOfTypeB = getContractABI('TON', 'B');
    this.wtonFunctionsOfTypeB = getContractABI('WTON', 'B');
    this.depositManagerFunctionsOfTypeB = getContractABI('DepositManager', 'B');
    this.seigManagerFunctionsOfTypeB = getContractABI('SeigManager', 'B');
    this.layer2RegistryFunctionsOfTypeB = getContractABI('Layer2Registry', 'B');
    this.daoCommitteeProxyFunctionsOfTypeB = getContractABI('DAOCommitteeProxy', 'B');
    this.daoCommitteeFunctionsOfTypeB = getContractABI('DAOCommittee', 'B');
    this.daoVaultFunctionsOfTypeB = getContractABI('DAOVault', 'B');
    this.powerTonProxyFunctionsOfTypeB = getContractABI('PowerTONProxy', 'B');

    this.width = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
    },
    openModal() {
      this.showModal = true;
      const element = document.getElementById('app');
      element.classList.add('modal-open');
    },
    closeModal() {
      this.showModal = false;
      const element = document.getElementById('app');
      element.classList.remove('modal-open');
    },
    numFunctions(index) {
      if (index === 0) return this.depositManagerFunctionsOfTypeA.length;
      else if (index === 1) return this.seigManagerFunctionsOfTypeA.length;
      else if (index === 2) return this.daoCommitteeProxyFunctionsOfTypeA.length;
      else if (index === 3) return this.daoVaultFunctionsOfTypeA.length;
      else if (index === 4) return this.l1BridgeRegistryFunctionsOfTypeA.length;
      else return 0;
    },
    numFunctionsOfTypeB(index) {
      if (index === 0) return this.tonFunctionsOfTypeB.length;
      else if (index === 1) return this.wtonFunctionsOfTypeB.length;
      else if (index === 2) return this.depositManagerFunctionsOfTypeB.length;
      else if (index === 3) return this.seigManagerFunctionsOfTypeB.length;
      else if (index === 4) return this.layer2RegistryFunctionsOfTypeB.length;
      else if (index === 5) return this.daoCommitteeProxyFunctionsOfTypeB.length;
      else if (index === 6) return this.daoCommitteeFunctionsOfTypeB.length;
      else if (index === 7) return this.daoVaultFunctionsOfTypeB.length;
      else if (index === 8) return this.powerTonProxyFunctionsOfTypeB.length;
      else return 0;
    },
    selectContract(index, type) {
      if (type === 'A') {
        this.index = this.index === index ? -1 : index;
      } else {
        this.indexOfTypeB = this.indexOfTypeB === index ? -1 : index;
      }
    },
    setCurrentContract() {
      const type = this.type;
      let index = type === 'A' ? this.index : this.indexOfTypeB;
      if (index === -1) return [];
      if (type === 'A') {
        if (index === 0) this.currentContract = 'DepositManager';
        else if (index === 1) this.currentContract = 'SeigManager';
        else if (index === 2) this.currentContract = 'DAOCommitteeProxy';
        else if (index === 3) this.currentContract = 'DAOVault';
        else if (index === 4) this.currentContract = 'L1BridgeRegistry';
        else console.log('bug', 'no type');
      } else if (type === 'B') {
        if (index === 0) this.currentContract = 'TON';
        else if (index === 1) this.currentContract = 'WTON';
        else if (index === 2) this.currentContract = 'DepositManager';
        else if (index === 3) this.currentContract = 'SeigManager';
        else if (index === 4) this.currentContract = 'Layer2Registry';
        else if (index === 5) this.currentContract = 'DAOCommitteeProxy';
        else if (index === 6) this.currentContract = 'DAOCommittee';
        else if (index === 7) this.currentContract = 'DAOVault';
        else if (index === 8) this.currentContract = 'PowerTONProxy';
        else console.log('bug', 'no type');
      } else {
        console.log('bug', 'no type');
      }
    },
    getImg(index, contract, type) {
      if (type === 'A') {
        switch (contract) {
          case 'Deposit Manager\nContract':
            return this.index === index ? depositManagerActive : depositManagerInactive;
          case 'Seig Manager\nContract':
            return this.index === index ? seigManagerActive : seigManagerInactive;
          case 'DAO Committee\nProxy Contract':
            return this.index === index ? daoCommitteeProxyActive : daoCommitteeProxyInactive;
          case 'DAO Vault\nContract':
            return this.index === index ? daoVaultActive : daoVaultInactive;
          case 'L1 Bridge\nRegistry Contract':
            return this.index === index ? daoVaultActive : daoVaultInactive;
          default:
            console.log('bug', 'no contract img for type A');
            return '';
        }
      } else if (type === 'B') {
        switch (contract) {
          case 'TON\nContract':
            return this.indexOfTypeB === index ? tonActive : tonInactive;
          case 'WTON\nContract':
            return this.indexOfTypeB === index ? wtonActive : wtonInactive;
          case 'Deposit Manager\nContract':
            return this.indexOfTypeB === index ? depositManagerActiveTypeB : depositManagerInactiveTypeB;
          case 'Seig Manager\nContract':
            return this.indexOfTypeB === index ? seigManagerActiveTypeB : seigManagerInactiveTypeB;
          case 'Layer2 Registry\n Contract':
            return this.indexOfTypeB === index ? layer2RegistryActive : layer2RegistryInactive;
          case 'DAO Committee\nProxy Contract':
            return this.indexOfTypeB === index ? daoCommitteeProxyActiveTypeB : daoCommitteeProxyInactiveTypeB;
          case 'DAO Committee\nContract':
            return this.indexOfTypeB === index ? daoCommitteeActiveTypeB : daoCommitteeInactiveTypeB;
          case 'DAO Vault\nContract':
            return this.indexOfTypeB === index ? daoVaultActiveTypeB : daoVaultInactiveTypeB;
          case 'PowerTON Proxy\nContract':
            return this.indexOfTypeB === index ? seigManagerActiveTypeB : seigManagerInactiveTypeB;
          default:
            console.log('bug', 'no contract img for type B');
            return '';
        }
      } else {
        console.log('bug', 'no contact img');
        return '';
      }
    },
    getFunctions() {
      const type = this.type;
      let index = type === 'A' ? this.index : this.indexOfTypeB;
      if (index === -1) return [];
      if (type === 'A') {
        if (index === 0) return this.depositManagerFunctionsOfTypeA;
        else if (index === 1) return this.seigManagerFunctionsOfTypeA;
        else if (index === 2) return this.daoCommitteeProxyFunctionsOfTypeA;
        else if (index === 3)
          return this.daoVaultFunctionsOfTypeA
            .filter(f => f.name !== 'claimTON')
            .filter(f => f.name !== 'claimWTON');
        else if (index === 4) return this.l1BridgeRegistryFunctionsOfTypeA;
        else {
          console.log('bug', 'no type A functions');
          return [];
        }
      } else if (type === 'B') {
        if (index === 0) return this.tonFunctionsOfTypeB;
        else if (index === 1) return this.wtonFunctionsOfTypeB;
        else if (index === 2) return this.depositManagerFunctionsOfTypeB;
        else if (index === 3) return this.seigManagerFunctionsOfTypeB;
        else if (index === 4) return this.layer2RegistryFunctionsOfTypeB;
        else if (index === 5) return this.daoCommitteeProxyFunctionsOfTypeB;
        else if (index === 6) return this.daoCommitteeFunctionsOfTypeB;
        else if (index === 7) return this.daoVaultFunctionsOfTypeB;
        else if (index === 8) return this.powerTonProxyFunctionsOfTypeB;
        else {
          console.log('bug', 'no type B functions');
          return [];
        }
      } else {
        console.log('bug', 'no type');
        return [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.propose {
  flex: 1;
  background: #fafbfc;
}

.propose-desktop {
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
    margin-top: 36px;
  }
  .type-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    .type {
      display: flex;
      .type-a {
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
        &-selected {
          background-color: #2a72e5;
          color: #ffffff;
        }
      }
      .type-b {
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
        &-selected {
          background-color: #f7981c;
          color: #ffffff;
        }
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
      margin-bottom: 30px;
    }
  }
  .wrapper {
    display: flex;
    justify-content: center;
  }
  .contract-container {
    display: grid;
    gap: 30px;
    .contract-card {
      display: flex;
      flex-direction: column;
      padding-left: 25px;
      padding-bottom: 30px;
      padding-top: 30px;
      width: 276px;
      border-radius: 15px;
      position: relative;
      color: #3e495c;
      &:hover {
        color: #ffffff;
      }
      &-type-a {
        &:hover {
          background: #2a72e5;
          cursor: pointer;
        }
      }
      &-type-b {
        &:hover {
          background: #f7981c;
          cursor: pointer;
        }
      }
      .contract-num-functions {
        flex: 1;
        opacity: 0.2;
        font-family: Roboto;
        font-size: 64px;
        font-weight: 100;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #dde2ed;
        margin-top: -10px;
      }
      .contract-name {
        font-family: Roboto;
        font-size: 24px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        white-space: pre-line;
      }
      .contract-icon {
        position: absolute;
        top: 30px;
        right: 25px;
      }
    }
  }
  .function-container {
    display: grid;
    grid-gap: 30px;
    margin-top: 40px;
    &-desktop {
      margin-bottom: 40px;
    }
  }
}

.tooltip {
  display: none;
  position: absolute;
  left: 39%;
  top: -17px;
  width: 300px;
  z-index: 999;
}

.tooltip-content {
  max-width: 317px;
  background: #353c48;
  border-radius: 3px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  padding: 8px;
}

.propose-mobile {
  .header {
    display: flex;
    justify-content: center;
    font-family: Roboto;
    font-size: 35px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    text-align: left;
    color: #eff1f6;
    margin-top: 10px;
  }
  .type-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    .type {
      display: flex;
      .type-a {
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
        &-selected {
          background-color: #2a72e5;
          color: #ffffff;
        }
      }
      .type-b {
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
        &-selected {
          background-color: #f7981c;
          color: #ffffff;
        }
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
      margin-bottom: 30px;
    }
  }
  .contract-container {
    padding: 0px 20px;
    .contract-card {
      display: flex;
      align-items: center;
      padding: 0px 30px;
      height: 90px;
      border-radius: 15px;
      position: relative;
      margin-bottom: 20px;
      color: #3e495c;
      &:hover {
        cursor: pointer;
        color: #ffffff;
      }
      &-type-a {
        box-shadow: 0 10px 15px 0 rgba(42, 114, 229, 0.25);
        &:hover {
          background: #2a72e5;
        }
      }
      &-type-b {
        box-shadow: 0 10px 15px 0 rgba(247, 152, 28, 0.25);
        &:hover {
          background: #f7981c;
        }
      }
    }
    .contract-name {
      font-family: Roboto;
      font-size: 20px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.3;
      letter-spacing: normal;
      text-align: left;
      white-space: pre-line;
    }
    .contract-icon {
      position: absolute;
      top: 30px;
      right: 30px;
    }
  }
  .function-container {
    margin-top: 20px;
    .box {
      margin-bottom: 15px;
    }
  }
}
</style>
