// ES module 방식으로 변환 (import / export 사용)
import Web3 from 'web3';
import web3EthABI from 'web3-eth-abi';

// 문자열 처리 유틸
export function marshalString(str) {
  if (str.slice(0, 2) === '0x') return str;
  return '0x' + str;
}

export function unmarshalString(str) {
  if (str.slice(0, 2) === '0x') return str.slice(2);
  return str;
}

// JSON 계약 파일들
import autoRefactorCoinage from '../contracts/AutoRefactorCoinage.json';
import agendaManager from '../contracts/DAOAgendaManager.json';
import candidate from '../contracts/Candidate.json';
import committeeProxy from '../contracts/DAOCommitteeProxy.json';
import committeeProxy2 from '../contracts/DAOCommitteeProxy2.json';
import committee from '../contracts/DAOCommittee.json';
import depositManager from '../contracts/DepositManager.json';
import ton from '../contracts/TON.json';
import wton from '../contracts/WTON.json';
import seigManager from '../contracts/SeigManager.json';
import daoVault from '../contracts/DAOVault.json';
import layer2Registry from '../contracts/Layer2Registry.json';
import layer2 from '../contracts/Layer2.json';
import refactorCoinageSnapshot from '../contracts/RefactorCoinageSnapshot.json';
import l1BridgeRegistry from '../contracts/L1BridgeRegistryV1_1.json';
import layer2Manager from '../contracts/Layer2ManagerV1_1.json';

// contractFunctions의 일부 (이미 변환된 ES module 혹은 alias 사용)
import {
  daoCommitteeFunctionsOfTypeB,
  daoCommitteeProxyFunctionsOfTypeA,
  daoCommitteeProxyFunctionsOfTypeB,
  daoVaultFunctionsOfTypeA,
  daoVaultFunctionsOfTypeB,
  depositManagerFunctionsOfTypeA,
  depositManagerFunctionsOfTypeB,
  layer2RegistryFunctionsOfTypeB,
  seigManagerFunctionsOfTypeA,
  seigManagerFunctionsOfTypeB,
  tonFunctionsOfTypeB,
  l1BridgeRegistryFunctionsOfTypeA,
  l1BridgeRegistryFunctionsOfTypeB,
  layer2ManagerFunctionsOfTypeB,
} from '@/utils/contractFunctions/index.js';

import { wtonFunctionsOfTypeB } from './contractFunctions/wtonFunctions';

const deployed = {
  'TON': '0xa30fe40285b8f5c0457dbc3b7c8a280373c40044',
  'WTON': '0x79e0d92670106c85e9067b56b8f674340dca0bbd',
  'Layer2Registry': '0xA0a9576b437E52114aDA8b0BC4149F2F5c604581',
  'DepositManager': '0x90ffcc7F168DceDBEF1Cb6c6eB00cA73F922956F',
  'CoinageFactory': '0x93258413Ef2998572AB4B269b5DCb963dD35D440',
  'SeigManager': '0x2320542ae933FbAdf8f5B97cA348c7CeDA90fAd7',
  'PowerTON': '0x68808D5379763fA07FDb53c707100e1930900F5c',
  'PowerTONProxy': '0xbe16830EeD019227892938Ae13C54Ec218772f48',
  'DAOVault': '0xB9F6c9E75418D7E5a536ADe08f0218196BB3eBa4',
  'DAOAgendaManager': '0x1444f7a8bC26a3c9001a13271D56d6fF36B44f08',
  'CandidateFactory': '0x04e3C2B720FB8896A7f9Ea59DdcA85fD45189C7f',
  'DAOCommittee': '0x79cfbEaCB5470bBe3B8Fe76db2A61Fc59e588C38',
  'DAOCommitteeProxy': '0xA2101482b28E3D99ff6ced517bA41EFf4971a386',
  'L1BridgeRegistry': '0x2D47fa57101203855b336e9E61BC9da0A6dd0Dbc',
  'Layer2Manager': '0xab303E7CBFd19C998268e19d830770e215AbDF7F',
};

export function getContract(want, web3, address) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/fcda353fe57a4c70803274ed05d1f047'));
  }
  const Coinage = new web3.eth.Contract(autoRefactorCoinage.abi, address);
  const Candidate = new web3.eth.Contract(candidate.abi, address);
  const Layer2 = new web3.eth.Contract(layer2.abi, address);
  const DAOAgendaManager = new web3.eth.Contract(agendaManager.abi, deployed.DAOAgendaManager);
  const DAOCommitteeProxy = new web3.eth.Contract(committee.abi, deployed.DAOCommitteeProxy); // NOTE: committee abi 사용
  const DAOCommittee = new web3.eth.Contract(committee.abi, deployed.DAOCommittee); // NOTE: 사용되지 않음.
  const DepositManager = new web3.eth.Contract(depositManager.abi, deployed.DepositManager);
  const TON = new web3.eth.Contract(ton.abi, deployed.TON);
  const WTON = new web3.eth.Contract(wton.abi, deployed.WTON);
  const SeigManager = new web3.eth.Contract(seigManager.abi, deployed.SeigManager);
  const Layer2Registry = new web3.eth.Contract(layer2Registry.abi, deployed.Layer2Registry);
  const Tot = new web3.eth.Contract(refactorCoinageSnapshot, address);
  const L1BridgeRegistry = new web3.eth.Contract(l1BridgeRegistry.abi, address);
  const Layer2Manager = new web3.eth.Contract(layer2Manager.abi, address);

  const contracts = {
    Candidate,
    Layer2,
    DAOAgendaManager,
    DAOCommitteeProxy,
    DAOCommittee,
    DepositManager,
    TON,
    WTON,
    SeigManager,
    Coinage,
    Layer2Registry,
    Tot,
    L1BridgeRegistry,
    Layer2Manager,
  };

  if (want) {
    return Object.prototype.hasOwnProperty.call(contracts, want) ? contracts[want] : null;
  } else {
    return contracts;
  }
}

const depositManagerABIOfTypeA = [];
const seigManagerABIOfTypeA = [];
const daoCommitteeProxyABIOfTypeA = [];
const daoVaultABIOfTypeA = [];
const l1BridgeRegistryABIOfTypeA = [];

const tonABIOfTypeB = [];
const wtonABIOfTypeB = [];
const depositManagerABIOfTypeB = [];
const seigManagerABIOfTypeB = [];
const layer2RegistryABIOfTypeB = [];
const daoCommitteeProxyABIOfTypeB = [];
const daoCommitteeProxy2ABIOfTypeB = [];
const daoCommitteeABIOfTypeB = [];
const daoVaultABIOfTypeB = [];
const powerTonProxyABIOfTypeB = [];
const powerTonLogicABIOfTypeB = [];
const l1BridgeRegistryABIOfTypeB = [];
const layer2ManagerABIOfTypeB = [];

(() => {
  const set = (functions, abis, abi) => {
    if (!functions || !Array.isArray(functions)) {
      return;
    }
    functions.forEach((func) => {
      const f = abi.find((f) => f.name === func.name);
      if (f) {
        f.selector = web3EthABI.encodeFunctionSignature(f);
        f.explanation = func.explanation;
        f.prettyName = func.prettyName;
        f.title = func.title;
        f.params = func.params;
        f.disabled = func.disabled;
        abis.push(f);
      }
    });
  };

  set(depositManagerFunctionsOfTypeA, depositManagerABIOfTypeA, depositManager.abi);
  set(seigManagerFunctionsOfTypeA, seigManagerABIOfTypeA, seigManager.abi);
  set(daoCommitteeProxyFunctionsOfTypeA, daoCommitteeProxyABIOfTypeA, committee.abi);
  set(daoVaultFunctionsOfTypeA, daoVaultABIOfTypeA, daoVault.abi);
  set(l1BridgeRegistryFunctionsOfTypeA, l1BridgeRegistryABIOfTypeA, l1BridgeRegistry.abi);

  set(tonFunctionsOfTypeB, tonABIOfTypeB, ton.abi);
  set(wtonFunctionsOfTypeB, wtonABIOfTypeB, wton.abi);
  set(depositManagerFunctionsOfTypeB, depositManagerABIOfTypeB, depositManager.abi);
  set(seigManagerFunctionsOfTypeB, seigManagerABIOfTypeB, seigManager.abi);
  set(layer2RegistryFunctionsOfTypeB, layer2RegistryABIOfTypeB, layer2Registry.abi);
  set(daoCommitteeProxyFunctionsOfTypeB, daoCommitteeProxyABIOfTypeB, committeeProxy.abi);
  set(daoCommitteeProxyFunctionsOfTypeB, daoCommitteeProxy2ABIOfTypeB, committeeProxy2.abi);
  set(daoCommitteeFunctionsOfTypeB, daoCommitteeABIOfTypeB, committee.abi);
  set(daoVaultFunctionsOfTypeB, daoVaultABIOfTypeB, daoVault.abi);
  set(l1BridgeRegistryFunctionsOfTypeB, l1BridgeRegistryABIOfTypeB, l1BridgeRegistry.abi);
  set(layer2ManagerFunctionsOfTypeB, layer2ManagerABIOfTypeB, layer2Manager.abi);
})();


export function getContractABI(want, type = 'A') {
  if (!want) return [];
  if (type === 'A') {
    if (want === 'DepositManager') return depositManagerABIOfTypeA;
    else if (want === 'SeigManager') return seigManagerABIOfTypeA;
    else if (want === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeA;
    else if (want === 'DAOVault') return daoVaultABIOfTypeA;
    else if (want === 'L1BridgeRegistry') return l1BridgeRegistryABIOfTypeA;
    else return [];
  } else {
    if (want === 'TON') return tonABIOfTypeB;
    else if (want === 'WTON') return wtonABIOfTypeB;
    else if (want === 'DepositManager') return depositManagerABIOfTypeB;
    else if (want === 'SeigManager') return seigManagerABIOfTypeB;
    else if (want === 'Layer2Registry') return layer2RegistryABIOfTypeB;
    else if (want === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeB;
    else if (want === 'DAOCommitteeProxy2') return daoCommitteeProxy2ABIOfTypeB;
    else if (want === 'DAOCommittee') return daoCommitteeABIOfTypeB;
    else if (want === 'DAOVault') return daoVaultABIOfTypeB;
    else if (want === 'PowerTONProxy') return powerTonProxyABIOfTypeB;
    else if (want === 'PowerTONLogic') return powerTonLogicABIOfTypeB;
    else if (want === 'L1BridgeRegistry') return l1BridgeRegistryABIOfTypeB;
    else if (want === 'Layer2Manager') return layer2ManagerABIOfTypeB;
    else return [];
  }
}

export function getContractABIFromAddress(address, type) {
  if (!address) return [];
  address = address.toLowerCase();
  if (type === 'A') {
    // console.log(agendaId, address, deployed.L1BridgeRegistry.toLowerCase(), address === deployed.L1BridgeRegistry.toLowerCase());
    if (address === deployed.DepositManager.toLowerCase()) return depositManagerABIOfTypeA;
    else if (address === deployed.SeigManager.toLowerCase()) return seigManagerABIOfTypeA;
    else if (address === deployed.DAOCommitteeProxy.toLowerCase()) return daoCommitteeProxyABIOfTypeA;
    else if (address === deployed.DAOVault.toLowerCase()) return daoVaultABIOfTypeA;
    else if (address === deployed.L1BridgeRegistry.toLowerCase()) return l1BridgeRegistryABIOfTypeA;
    else if (address === deployed.OldDepositManager.toLowerCase()) return depositManagerABIOfTypeA;
    else if (address === deployed.OldSeigManager.toLowerCase()) return seigManagerABIOfTypeA;
    else return [];
  } else if (type === 'B') {
    if (address === deployed.TON.toLowerCase()) return tonABIOfTypeB;
    else if (address === deployed.WTON.toLowerCase()) return wtonABIOfTypeB;
    else if (address === deployed.DepositManager.toLowerCase()) return depositManagerABIOfTypeB;
    // else if (address === deployed.OldDepositManager.toLowerCase()) return depositManagerABIOfTypeB;
    else if (address === deployed.SeigManager.toLowerCase()) return seigManagerABIOfTypeB;
    // else if (address === deployed.OldSeigManager.toLowerCase()) return seigManagerABIOfTypeB;
    else if (address === deployed.Layer2Registry.toLowerCase()) return layer2RegistryABIOfTypeB;
    else if (address === deployed.DAOCommitteeProxy.toLowerCase()) return daoCommitteeProxyABIOfTypeB;
    else if (address === deployed.DAOCommitteeProxy2.toLowerCase()) return daoCommitteeProxy2ABIOfTypeB;
    else if (address === deployed.DAOCommittee.toLowerCase()) return daoCommitteeABIOfTypeB;
    else if (address === deployed.DAOVault.toLowerCase()) return daoVaultABIOfTypeB;
    else if (address === deployed.PowerTONProxy.toLowerCase()) return powerTonProxyABIOfTypeB;
    else if (address === deployed.L1BridgeRegistry.toLowerCase()) return l1BridgeRegistryABIOfTypeB;
    else if (address === deployed.Layer2Manager.toLowerCase()) return layer2ManagerABIOfTypeB;
    else return [];
  } else {
    console.log('bug', 'no type');
  }
}

export function getContractAddress(target) {
  const address = deployed[target];
  if (!address) {
    console.log('bug');
  }
  return address ? address : '';
}

export function getFunctionSelector(contract, want, type) {
  if (!contract || !want) return '';
  if (type === 'A') {
    if (contract === 'DepositManager') return depositManagerABIOfTypeA.find(f => f.name === want).selector;
    else if (contract === 'SeigManager') return seigManagerABIOfTypeA.find(f => f.name === want).selector;
    else if (contract === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeA.find(f => f.name === want).selector;
    else if (contract === 'DAOVault') return daoVaultABIOfTypeA.find(f => f.name === want).selector;
    else if (contract === 'L1BridgeRegistry') return l1BridgeRegistryABIOfTypeA.find(f => f.name === want).selector;
    else return '';
  } else if (type === 'B') {
    if (contract === 'TON') return tonABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'WTON') return wtonABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'DepositManager') return depositManagerABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'SeigManager') return seigManagerABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'Layer2Registry') return layer2RegistryABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'DAOCommitteeProxy2') return daoCommitteeProxy2ABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'DAOCommittee') return daoCommitteeABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'DAOVault') return daoVaultABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'PowerTONProxy') return powerTonProxyABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'PowerTONLogic') return powerTonLogicABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'L1BridgeRegistry') return l1BridgeRegistryABIOfTypeB.find(f => f.name === want).selector;
    else if (contract === 'Layer2Manager') return layer2ManagerABIOfTypeB.find(f => f.name === want).selector;
    else return '';
  } else {
    return '';
  }
}

export function encodeParameters(typesArray, parameters) {
  const web3 = new Web3();
  return web3.eth.abi.encodeParameters(typesArray, parameters);
}

export function encoded(type, value) {
  const types = [
    'uint256',
    'bool',
    'address',
    'address[]',
    'bytes32',
    'string',
  ];
  const index = types.indexOf(type);
  if (index === -1) {
    console.log('bug');
    return '';
  }
  if (index === 0) return String(value);
  else if (index === 1) {
    value = value.toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return -1;
  }
  else if (index === 2) {
    if (value.length !== 42) return -1;
    else return value;
  }
  else if (index === 3) {
    let bug = false;
    const values = [];
    value = value.replace(/\s/g, '');
    value = value.substring(1, value.length - 1);
    value.split(',').forEach(address => {
      if (address.length !== 42) bug = true;
      else values.push(address);
    });
    if (bug) return -1;
    return values;
  }
  else {
    return value;
  }
}

const decodeParameters = function(typesArray, hexString) {
  const web3 = new Web3();
  return web3.eth.abi.decodeParameters(typesArray, hexString);
};
export { decodeParameters };

export function getABIFromSelector(selector, type, agendaId) {
  let abi;
  if (type === 'A') {
    abi = depositManagerABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = seigManagerABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = daoCommitteeProxyABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = daoVaultABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = l1BridgeRegistryABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;
  } else if (type === 'B') {
    abi = tonABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = wtonABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = depositManagerABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = seigManagerABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = layer2RegistryABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = daoCommitteeProxyABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = daoCommitteeProxy2ABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = daoCommitteeABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = daoVaultABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = powerTonProxyABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = powerTonLogicABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = l1BridgeRegistryABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    abi = layer2ManagerABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;
    if (!abi) {
      // console.log('bug, cannot find abi', agendaId);
    }
  } else {
    console.log('bug', 'no type', agendaId);
  }
}

export function parseAgendaBytecode(tx, type, agendaId) {
  try {
    const params1 = marshalString(unmarshalString(tx.input).substring(8));
    const decodedParams1 = decodeParameters(['address', 'uint256', 'bytes'], params1);
    const params2 = decodedParams1[2];
    const decodedParams2 = decodeParameters(['address[]', 'uint256', 'uint256', 'bool', 'bytes[]'], params2);
    const targets = decodedParams2[0];
    const commands = decodedParams2[4];
    if (targets.length !== commands.length) {
      // console.log('bug', agendaId);
    }
    const onChainEffects = [];
    for (let i = 0; i < targets.length; i++) {
      const selector = commands[i].slice(0, 10);
      // if (agendaId === 44) console.log(selector, daoCommitteeProxyABIOfTypeB);
      let abi = getABIFromSelector(selector, type, agendaId);
      if (!abi) {
        abi = getABIFromSelector(selector, type === 'A' ? 'B' : 'A', agendaId);
      }
      if (!abi) {
        onChainEffects.push({
          target: '',
          name: '',
          types: [],
          bytecode: '',
        });
        // console.log('bug', 'no abi for onchain effect', agendaId, selector);
        continue;
      }
      const target = targets[i];
      const name = abi.name;
      const types = abi.inputs.map(input => input.type);
      const bytecode = marshalString(unmarshalString(commands[i]).substring(8));
      const values = decodeParameters(types, bytecode);
      const onChainEffect = { target, name, types, values };
      onChainEffects.push(onChainEffect);
    }
    return onChainEffects;
  } catch (e) {
    console.log(agendaId, e);
  }
}

export function metamaskErrorMessage(errorString) {
  let errString = '';
  if (errorString !== null && errorString.length > 0) {
    const key = 'message';
    const positionKey = errorString.indexOf(key);
    const startMessage = errorString.indexOf('"', positionKey + key.length + 2);
    const endMessage = errorString.indexOf('"', startMessage + 3);
    errString = errorString.substring(startMessage + 1, endMessage);
  }
  return errString;
}

export async function canExecute(agendaId, _web3) {
  let canExecute = false;
  try {
    const AgendaManager = await getContract('DAOAgendaManager', _web3);
    if (AgendaManager !== null) {
      canExecute = await AgendaManager.methods.canExecuteAgenda(agendaId).call();
    } else {
      console.log('Utils.canExecuteAgenda AgendaManager is null');
    }
  } catch (err) {
    console.log('Utils.canExecuteAgenda err', err);
  }
  return canExecute;
}

export async function stakedOfCandidateContracts(_web3, _candidateContract, account) {
  let amount = 0;
  if (_candidateContract && _candidateContract.length > 0 && account && account.length > 0) {
    const seigManagerInst = await getContract('SeigManager', _web3);
    if (seigManagerInst !== null) {
      const coinageAddress = await seigManagerInst.methods.coinages(_candidateContract).call();
      if (coinageAddress) {
        const coinage = await getContract('Coinage', _web3, coinageAddress);
        if (coinage) {
          amount = await coinage.methods.balanceOf(account).call();
        } else {
          console.log('Utils.stakedOfCandidateContracts coinage is null');
        }
      } else {
        console.log('Utils.stakedOfCandidateContracts coinageAddress is null');
      }
    } else {
      console.log('Utils.stakedOfCandidateContracts is null');
    }
  }
  return amount;
}

export async function minimumAmountOfOperator(_web3) {
  let amount = 0;
  try {
    const seigManagerInst = await getContract('SeigManager', _web3);
    if (seigManagerInst !== null) {
      amount = await seigManagerInst.methods.minimumAmount().call();
    } else {
      console.log('Utils.minimumAmountOfOperator is null');
    }
  } catch (err) {
    console.log('Utils.minimumAmountOfOperator err', err);
  }
  return amount;
}

// export function getABIFromSelectorWrapper(selector, type) {
//   return getABIFromSelector(selector, type);
// }

// export function parseAgendaBytecodeWrapper(tx, type) {
//   return parseAgendaBytecode(tx, type);
// }

export function metamaskErrorMessageWrapper(errorString) {
  return metamaskErrorMessage(errorString);
}
