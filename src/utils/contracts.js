const Web3 = require('web3');
const web3EthABI = require('web3-eth-abi');

function marshalString (str) {
  if (str.slice(0, 2) === '0x') return str;
  return '0x'.concat(str);
}

function unmarshalString (str) {
  if (str.slice(0, 2) === '0x') return str.slice(2);
  return str;
}
const autoRefactorCoinage = require('../contracts/AutoRefactorCoinage.json');
const agendaManager = require('../contracts/DAOAgendaManager.json');
const candidate = require('../contracts/Candidate.json');
const committeeProxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');
const depositManager = require('../contracts/DepositManager.json');
const ton = require('../contracts/TON.json');
const wton = require('../contracts/WTON.json');
const powerTON = require('../contracts/PowerTON.json');
const powerTONProxy = require('../contracts/PowerTONProxy.json');
const powerTONLogic = require('../contracts/PowerTONLogic.json');
const seigManager = require('../contracts/SeigManager.json');
const daoVault = require('../contracts/DAOVault.json');
const layer2Registry = require('../contracts/Layer2Registry.json');
const layer2 = require('../contracts/Layer2.json');
const {
  daoCommitteeFunctionsOfTypeB,
  daoCommitteeProxyFunctionsOfTypeA,
  daoCommitteeProxyFunctionsOfTypeB,
  daoVaultFunctionsOfTypeA,
  daoVaultFunctionsOfTypeB,
  depositManagerFunctionsOfTypeA,
  depositManagerFunctionsOfTypeB,
  layer2RegistryFunctionsOfTypeB,
  powerTonLogicFunctionsOfTypeB,
  powerTonProxyFunctionsOfTypeB,
  seigManagerFunctionsOfTypeA,
  seigManagerFunctionsOfTypeB,
  tonFunctionsOfTypeB,
} = require('@/utils/contractFunctions/index.js');

const { wtonFunctionsOfTypeB } = require('./contractFunctions/wtonFunctions');


const deployed = {
  'TON': '0x2be5e8c109e2197D077D13A82dAead6a9b3433C5',
  'WTON': '0xc4A11aaf6ea915Ed7Ac194161d2fC9384F15bff2',
  'Layer2Registry': '0x7846c2248a7b4de77e9c2bae7fbb93bfc286837b',
  'DepositManager': '0x0b58ca72b12f01fc05f8f252e226f3e2089bd00e',
  'CoinageFactory': '0x5b40841eeCfB429452AB25216Afc1e1650C07747',
  'SeigManager': '0x0b55a0f463b6defb81c6063973763951712d0e5f',
  'PowerTON': '0xd86d8950A4144D8a258930F6DD5f90CCE249E1CF',
  'PowerTONProxy': '0x970298189050abd4dc4f119ccae14ee145ad9371',
  'DAOVault': '0x2520CD65BAa2cEEe9E6Ad6EBD3F45490C42dd303',
  'DAOAgendaManager': '0xcD4421d082752f363E1687544a09d5112cD4f484',
  'CandidateFactory': '0xE6713aF11aDB0cFD3C60e15b23E43f5548C32942',
  'DAOCommittee': '0xd1A3fDDCCD09ceBcFCc7845dDba666B7B8e6D1fb',
  'DAOCommitteeProxy': '0xDD9f0cCc044B0781289Ee318e5971b0139602C26',
};

function getContract (want, web3, address) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/27113ffbad864e8ba47c7d993a738a10'));
  }
  const Coinage = new web3.eth.Contract(autoRefactorCoinage.abi, address);
  const Candidate = new web3.eth.Contract(candidate.abi, address);
  const Layer2 = new web3.eth.Contract(layer2.abi, address);
  const DAOAgendaManager = new web3.eth.Contract(agendaManager.abi, deployed.DAOAgendaManager);
  const DAOCommitteeProxy = new web3.eth.Contract(committee.abi, deployed.DAOCommitteeProxy); // NOTE: use committee abi.
  const DAOCommittee = new web3.eth.Contract(committee.abi, deployed.DAOCommittee); // NOTE: not used.
  const DepositManager = new web3.eth.Contract(depositManager.abi, deployed.DepositManager);
  const TON = new web3.eth.Contract(ton.abi, deployed.TON);
  const WTON = new web3.eth.Contract(wton.abi, deployed.WTON);
  const PowerTON = new web3.eth.Contract(powerTON.abi, deployed.PowerTON);
  const PowerTONProxy = new web3.eth.Contract(powerTONProxy.abi, deployed.PowerTONProxy);
  const SeigManager = new web3.eth.Contract(seigManager.abi, deployed.SeigManager);
  const Layer2Registry = new web3.eth.Contract(layer2Registry.abi, deployed.Layer2Registry);

  const contracts = {
    Candidate,
    Layer2,
    DAOAgendaManager,
    DAOCommitteeProxy,
    DAOCommittee,
    DepositManager,
    TON,
    WTON,
    PowerTON,
    PowerTONProxy,
    SeigManager,
    Coinage,
    Layer2Registry,
  };

  if (want) {
    return contracts.hasOwnProperty(want) ? contracts[want] : null; // eslint-disable-line
  } else {
    return contracts;
  }
}

module.exports.getContract = getContract;

const depositManagerABIOfTypeA = [];
const seigManagerABIOfTypeA = [];
const daoCommitteeProxyABIOfTypeA = [];
const daoVaultABIOfTypeA = [];

const tonABIOfTypeB = [];
const wtonABIOfTypeB = [];
const depositManagerABIOfTypeB = [];
const seigManagerABIOfTypeB = [];
const layer2RegistryABIOfTypeB = [];
const daoCommitteeProxyABIOfTypeB = [];
const daoCommitteeABIOfTypeB = [];
const daoVaultABIOfTypeB = [];
const powerTonProxyABIOfTypeB = [];
const powerTonLogicABIOfTypeB = [];

(() => {
  const set = (functions, abis, abi) => {
    functions.forEach(func => {
      const f = abi.find(f => f.name === func.name);
      f.selector = web3EthABI.encodeFunctionSignature(f);
      f.explanation = func.explanation;
      f.prettyName = func.prettyName;
      f.title = func.title;
      f.params = func.params;

      abis.push(f);
    });
  };

  set(depositManagerFunctionsOfTypeA, depositManagerABIOfTypeA, depositManager.abi);
  set(seigManagerFunctionsOfTypeA, seigManagerABIOfTypeA, seigManager.abi);
  set(daoCommitteeProxyFunctionsOfTypeA, daoCommitteeProxyABIOfTypeA, committee.abi);
  set(daoVaultFunctionsOfTypeA, daoVaultABIOfTypeA, daoVault.abi);

  set(tonFunctionsOfTypeB, tonABIOfTypeB, ton.abi);
  set(wtonFunctionsOfTypeB, wtonABIOfTypeB, wton.abi);
  set(depositManagerFunctionsOfTypeB, depositManagerABIOfTypeB, depositManager.abi);
  set(seigManagerFunctionsOfTypeB, seigManagerABIOfTypeB, seigManager.abi);
  set(layer2RegistryFunctionsOfTypeB, layer2RegistryABIOfTypeB, layer2Registry.abi);
  set(daoCommitteeProxyFunctionsOfTypeB, daoCommitteeProxyABIOfTypeB, committeeProxy.abi);
  set(daoCommitteeFunctionsOfTypeB, daoCommitteeABIOfTypeB, committee.abi);
  set(daoVaultFunctionsOfTypeB, daoVaultABIOfTypeB, daoVault.abi);
  set(powerTonProxyFunctionsOfTypeB, powerTonProxyABIOfTypeB, powerTONProxy.abi);
  set(powerTonLogicFunctionsOfTypeB, powerTonLogicABIOfTypeB, powerTONLogic.abi);
})();

module.exports.getContractABI = function (want, type = 'A') {
  if (!want) return [];

  if (type === 'A') {
    if (want === 'DepositManager') return depositManagerABIOfTypeA;
    else if (want === 'SeigManager') return seigManagerABIOfTypeA;
    else if (want === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeA;
    else if (want === 'DAOVault') return daoVaultABIOfTypeA;
    else return [];
  } else {
    if (want === 'TON') return tonABIOfTypeB;
    else if (want === 'WTON') return wtonABIOfTypeB;
    else if (want === 'DepositManager') return depositManagerABIOfTypeB;
    else if (want === 'SeigManager') return seigManagerABIOfTypeB;
    else if (want === 'Layer2Registry') return layer2RegistryABIOfTypeB;
    else if (want === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeB;
    else if (want === 'DAOCommittee') return daoCommitteeABIOfTypeB;
    else if (want === 'DAOVault') return daoVaultABIOfTypeB;
    else if (want === 'PowerTONProxy') return powerTonProxyABIOfTypeB;
    else if (want === 'PowerTONLogic') return powerTonLogicABIOfTypeB;
    else return [];
  }
};

module.exports.getContractABIFromAddress = function (address, type) {
  if (!address) return [];
  address = address.toLowerCase();

  if (type === 'A') {
    if (address === deployed.DepositManager.toLowerCase()) return depositManagerABIOfTypeA;
    else if (address === deployed.SeigManager.toLowerCase()) return seigManagerABIOfTypeA;
    else if (address === deployed.DAOCommitteeProxy.toLowerCase()) return daoCommitteeProxyABIOfTypeA;
    else if (address === deployed.DAOVault.toLowerCase()) return daoVaultABIOfTypeA;
    else return [];
  } else if (type === 'B') {
    if (address === deployed.TON.toLowerCase()) return tonABIOfTypeB;
    else if (address === deployed.WTON.toLowerCase()) return wtonABIOfTypeB;
    else if (address === deployed.DepositManager.toLowerCase()) return depositManagerABIOfTypeB;
    else if (address === deployed.SeigManager.toLowerCase()) return seigManagerABIOfTypeB;
    else if (address === deployed.Layer2Registry.toLowerCase()) return layer2RegistryABIOfTypeB;
    else if (address === deployed.DAOCommitteeProxy.toLowerCase()) return daoCommitteeProxyABIOfTypeB;
    else if (address === deployed.DAOCommittee.toLowerCase()) return daoCommitteeABIOfTypeB;
    else if (address === deployed.DAOVault.toLowerCase()) return daoVaultABIOfTypeB;
    else if (address === deployed.PowerTONProxy.toLowerCase()) return powerTonProxyABIOfTypeB;
    else return [];
  } else {
    console.log('bug', 'no type'); // eslint-disable-line
  }
};

module.exports.getContractAddress = function (target) {
  const address = deployed[target];
  if (!address) {
    console.log('bug'); // eslint-disable-line
  }
  return address ? address : '';
};

module.exports.getFunctionSelector = function (contract, want, type) {
  if (!contract || !want) return '';

  if (type === 'A') {
    if (contract === 'DepositManager') return (depositManagerABIOfTypeA.find(f => f.name === want)).selector;
    else if (contract === 'SeigManager') return (seigManagerABIOfTypeA.find(f => f.name === want)).selector;
    else if (contract === 'DAOCommitteeProxy') return (daoCommitteeProxyABIOfTypeA.find(f => f.name === want)).selector;
    else if (contract === 'DAOVault') {
      return (daoVaultABIOfTypeA.find(f => f.name === want)).selector;
    }
    else {
      return '';
    }
  } else if (type === 'B') {
    if (contract === 'TON') return (tonABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'WTON') return (wtonABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DepositManager') return (depositManagerABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'SeigManager') return (seigManagerABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'Layer2Registry') return (layer2RegistryABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DAOCommitteeProxy') return (daoCommitteeProxyABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DAOCommittee') return (daoCommitteeABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DAOVault') return (daoVaultABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'PowerTONProxy') return (powerTonProxyABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'PowerTONLogic') return (powerTonLogicABIOfTypeB.find(f => f.name === want)).selector;
    else return '';
  } else {
    return '';
  }
};

module.exports.encodeParameters = function (typesArray, parameters) {
  const web3 = new Web3();
  return web3.eth.abi.encodeParameters(typesArray, parameters);
};

module.exports.encoded = function (type, value) {
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
    console.log('bug'); // eslint-disable-line
    return '';
  }
  if (index === 0) return String(value); // uint256
  else if (index === 1) { // bool
    value = value.toLowerCase();

    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return -1;
  }
  else if (index === 2) { // address
    if (value.length !== 42) return -1;
    else return value;
  }
  else if (index === 3) { // address[]
    let bug = false;

    const values = [];
    value = value.replace(/\s/g, '');
    value = value.substring(1, value.length - 1);
    value.split(',').forEach(address => {
      if (address.length !== 42) bug = true;
      else values.push(value);
    });

    if (bug) return -1;
    return values;
  }
  else {
    return value;
  }
};

const decodeParameters = function (typesArray, hexString) {
  const web3 = new Web3();
  return web3.eth.abi.decodeParameters(typesArray, hexString);
};
module.exports.decodeParameters = decodeParameters;

const getABIFromSelector = function (selector, type) {
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

    abi = daoCommitteeABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;

    abi = daoVaultABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;

    abi = powerTonProxyABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;

    abi = powerTonLogicABIOfTypeB.find(abi => abi.selector === selector);
    if (abi) return abi;

    if (!abi) {
      console.log('bug'); // eslint-disable-line
    }
  } else {
    console.log('bug', 'no type'); // eslint-disable-line
  }
};
module.exports.getABIFromSelector = getABIFromSelector;

module.exports.parseAgendaBytecode = function (tx, type) {
  // TODO: to fix case of using mixed type with 'A' and 'B'
  console.log(tx);
  const params1 = marshalString(unmarshalString(tx.input).substring(8));
  const decodedParams1 = decodeParameters(['address', 'uint256', 'bytes'], params1);
  const params2 = decodedParams1[2];
  const decodedParams2 = decodeParameters(['address[]', 'uint256', 'uint256', 'bool', 'bytes[]'], params2);

  const targets = decodedParams2[0];
  const commands = decodedParams2[4];

  if (targets.length !== commands.length) {
    console.log('bug'); // eslint-disable-line
  }

  const onChainEffects = [];
  for (let i = 0; i < targets.length; i++) {
    const selector = commands[i].slice(0, 10);
    let abi = getABIFromSelector(selector, type);
    if (!abi) {
      abi = getABIFromSelector(selector, type === 'A' ? 'B' : 'A');
    }

    if (!abi) {
      onChainEffects.push({
        target: '',
        name: '',
        types: [],
        bytecode: '',
      });
      console.log('bug', 'no abi'); // eslint-disable-line
      continue;
    }

    const target = targets[i];
    const name = abi.name;
    const types = [];
    abi.inputs.forEach(input => {
      types.push(input.type);
    });
    const bytecode = marshalString(unmarshalString(commands[i]).substring(8));
    const values = decodeParameters(types, bytecode);

    const onChainEffect = {
      target,
      name,
      types,
      values,
    };
    onChainEffects.push(onChainEffect);
  }
  return onChainEffects;
};

module.exports.metamaskErrorMessage = function (errorString) {
  let errString = '';
  if (errorString !== null && errorString.length > 0) {
    const key = 'message';
    const positionKey = errorString.indexOf(key);
    const startMessage = errorString.indexOf('"', positionKey + key.length + 2);
    const endMessage = errorString.indexOf('"', startMessage + 3);
    errString = errorString.substring(startMessage + 1, endMessage);
  }
  return errString;
};

module.exports.canExecute = async function (agendaId, _web3) {
  let canExecute = false;
  try {
    const AgendaManager = await getContract('DAOAgendaManager', _web3);
    if (AgendaManager !== null) {
      canExecute = await AgendaManager.methods.canExecuteAgenda(agendaId).call();
    } else {
      console.log('Utils.canExecuteAgenda AgendaManager is null') ; // eslint-disable-line
    }
  } catch (err) {
    console.log('Utils.canExecuteAgenda err', err) ; // eslint-disable-line
  }
  return canExecute;
};

module.exports.stakedOfCandidateContracts = async function (_web3, _candidateContract, account) {
  let amount = 0;
  if (_candidateContract !== null && _candidateContract.length > 0 && account !== null && account.length > 0) {
    const seigManager = await getContract('SeigManager', _web3);
    if (seigManager !== null) {
      const coinageAddress = await seigManager.methods.coinages(_candidateContract).call();
      if (coinageAddress) {
        const coinage = await getContract('Coinage', _web3, coinageAddress);
        if (coinage) {
          amount = await coinage.methods.balanceOf(account).call();
        } else {
          console.log('Utils.stakedOfCandidateContracts coinage is null') ; // eslint-disable-line
        }
      } else {
        console.log('Utils.stakedOfCandidateContracts coinageAddress is null') ; // eslint-disable-line
      }
    } else {
      console.log('Utils.stakedOfCandidateContracts is null') ; // eslint-disable-line
    }

  }
  return amount;
};

module.exports.minimumAmountOfOperator = async function (_web3) {
  let amount = 0;
  try {
    const seigManager = await getContract('SeigManager', _web3);
    if (seigManager !== null) {
      amount = await seigManager.methods.minimumAmount().call();
    } else {
      console.log('Utils.minimumAmountOfOperator is null') ; // eslint-disable-line
    }
  } catch (err) {
    console.log('Utils.minimumAmountOfOperator err', err) ; // eslint-disable-line
  }
  return amount;
};

// module.exports.getBlockTimeStamp = async function (blockNumber, web3) {
//   if (!web3) {
//     web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/27113ffbad864e8ba47c7d993a738a10'));
//   }
//   const block = await web3.eth.getBlock(blockNumber);
//   this.timestamp = block.timestamp;
//   return block.timestamp;
// };
