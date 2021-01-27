const Web3 = require('web3');
const web3Utils = require('web3-utils');
const BN = web3Utils.BN;

function marshalString (str) {
  if (str.slice(0, 2) === '0x') return str;
  return '0x'.concat(str);
}

function unmarshalString (str) {
  if (str.slice(0, 2) === '0x') return str.slice(2);
  return str;
}

const agendaManager = require('../contracts/DAOAgendaManager.json');
// const candidate = require('../contracts/Candidate.json');
const committeeProxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');
const depositManager = require('../contracts/DepositManager.json');
const ton = require('../contracts/TON.json');
const wton = require('../contracts/WTON.json');
const seigManager = require('../contracts/SeigManager.json');
const daoVault = require('../contracts/DAOVault2.json');
const layer2Registry = require('../contracts/Layer2Registry.json');

const deployed = {
  'TON'              : '0xa68d07eF3254E96103B7dC3f4661D72b68c88683',
  'WTON'             : '0x72a08Efb6c9c10dE7491CC837b114123b4DB9b32',
  'Layer2Registry'   : '0xbB974DB3758Fd428058C7cf2384C9f5186264760',
  'DepositManager'   : '0x727971475F71eC885bDDc0827499c22A6014a327',
  'CoinageFactory'   : '0x1AAf1EEF5E5F34FDb2865Ca2989ebC3417122EAA',
  'DaoVault'         : '0xD795C4CC9E37Ac49752020c0B7300648961c553d',
  'SeigManager'      : '0xc7eF6F6fAbE5501b8E9643b833D2de35232B6eF8',
  'PowerTON'         : '0x937E45a0d1aec6DA0a59C853260df99FE65AEa9A',
  'DAOVault2'        : '0x4E1eDdaaAAEE692c63dbdcBc9526b4F288636D2b',
  'DAOAgendaManager' : '0x98D44C2aE6Db972b8d35dB4E7047778b91DFc850',
  'DAOCommittee'     : '0xDb0dD01CE5964A816f87211Abb0DBe1DFf25e3b5',
  'CandidateFactory' : '0xe5281527AAfe9de68AD02d330E5Fdb6A1DD252b1',
  'DAOCommitteeProxy': '0x1778Ad4A28C406Bab57742e1bdb4D873Db686A98',
  'EtherToken'       : '0x15928e97bAf0324A714560fe20DCC57a8C8A89Cb',
};

module.exports.getContracts = function (want, web3) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f6429583907549eca57832ec1a60b44f'));
  }
  const DAOAgendaManager = new web3.eth.Contract(agendaManager.abi, deployed.DAOAgendaManager);
  const DAOCommitteeProxy = new web3.eth.Contract(committeeProxy.abi, deployed.DAOCommitteeProxy);
  const DAOCommittee = new web3.eth.Contract(committee.abi, deployed.DAOCommitteeProxy); // Use proxy address.
  const DepositManager = new web3.eth.Contract(depositManager.abi, deployed.DepositManager);
  const TON = new web3.eth.Contract(ton.abi, deployed.TON);
  const WTON = new web3.eth.Contract(wton.abi, deployed.WTON);
  const SeigManager = new web3.eth.Contract(seigManager.abi, deployed.SeigManager);

  const contracts = {
    DAOAgendaManager,
    DAOCommitteeProxy,
    DAOCommittee,
    DepositManager,
    TON,
    WTON,
    SeigManager,
  };

  if (want) {
    return contracts.hasOwnProperty(want) ? contracts[want] : null; // eslint-disable-line
  } else {
    return contracts;
  }
};

const depositManagerFunctionsOfTypeA = [
  { 'name': 'setGlobalWithdrawalDelay', 'prettyName': '', 'explanation': 'It decides the Global Withdrawal Period for stakers/delegators. No single Layer2\'s withdrawal delay can\'t be shorter then this.' },
];
const seigManagerFunctionsOfTypeA = [
  { 'name': 'setPowerTONSeigRate', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for PowerTON winning prize.' },
  { 'name': 'setDaoSeigRate', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for DAO pot.' },
  { 'name': 'setPseigRate', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for propotional staking rewards.' },
  { 'name': 'setAdjustDelay', 'prettyName': '', 'explanation': 'It decides how much time should be wait until new commission rate is applied.' },
  { 'name': 'setMinimumAmount', 'prettyName': '', 'explanation': 'It sets minimum amount of staked TON for operator to maintain Layer2. It operator\'s staked TON is less than this one, operator\'s commit is alwayw reverted.' },
];
const daoCommitteeFunctionsOfTypeA = [
  { 'name': 'setActivityRewardPerSecond', 'prettyName': '', 'explanation': 'This is activity reward for Layer2 operator which occupy the Committee member. Reward is given time basis(seconds). It decide activity reward per seconds.' },
  { 'name': 'increaseMaxMember', 'prettyName': '', 'explanation': 'It increases maximum number of Committee Members.' },
  { 'name': 'decreaseMaxMember', 'prettyName': '', 'explanation': 'It decreased maximum number of Committee Members.' },
  { 'name': 'setQuorum', 'prettyName': '', 'explanation': 'It sets minimum qurom for committee members to execute agenda.' },
  { 'name': 'setCreateAgendaFees', 'prettyName': '', 'explanation': 'It sets minimum cost to propose agenda. Unit is TON.' },
  { 'name': 'setMinimumNoticePeriodSeconds', 'prettyName': '', 'explanation': 'It sets minimum notice period of agenda. Per seconds.' },
  { 'name': 'setMinimumVotingPeriodSeconds', 'prettyName': '', 'explanation': 'It sets minimum vote period of agenda. Per seconds.' },
];
const daoVaultFunctionsOfTypeA = [
  { 'name': 'approveTON', 'prettyName': '', 'explanation': 'It approves param1(address) to spend param2 amount of TON in DAO vault2.' },
  { 'name': 'approveWTON', 'prettyName': '', 'explanation': 'It approves param1(address) to spend param2 amount of WTON in DAO vault2.' },
  { 'name': 'approveERC20', 'prettyName': '', 'explanation': 'It approves param2(address) to spend param3 amount of ERC20(param1) in DAO vault2.' },
  { 'name': 'claimTON', 'prettyName': '', 'explanation': 'It allows param1 to claim param2 amount of TON.' },
  { 'name': 'claimWTON', 'prettyName': '', 'explanation': 'It allows param1 to claim param2 amount of WTON.' },
  { 'name': 'claimERC20', 'prettyName': '', 'explanation': 'It allows param2 to claim param3 amount of ERC20(param1).' },
];

const tonFunctionsOfTypeB = [
  { 'name': 'addMinter', 'prettyName': '', 'explanation': '' },
  { 'name': 'enableCallback', 'prettyName': '', 'explanation': '' },
  { 'name': 'mint', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceMinter', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'renouncePauser', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferFrom', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'prettyName': '', 'explanation': '' },
];
const wtonFunctionsOfTypeB = [
  { 'name': 'addMinter', 'prettyName': '', 'explanation': '' },
  { 'name': 'enableCallback', 'prettyName': '', 'explanation': '' },
  { 'name': 'mint', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceMinter', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'renouncePauser', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferFrom', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'burnFrom', 'prettyName': '', 'explanation': '' },
];
const depositManagerFunctionsOfTypeB = [
  { 'name': 'transferOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'prettyName': '', 'explanation': '' },
  { 'name': 'slash', 'prettyName': '', 'explanation': '' },
];
const seigManagerFunctionsOfTypeB = [
  { 'name': 'addPauser', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceMinter', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'renouncePauser', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'pause', 'prettyName': '', 'explanation': '' },
  { 'name': 'unpause', 'prettyName': '', 'explanation': '' },
  { 'name': 'setPowerTON', 'prettyName': '', 'explanation': '' },
  { 'name': 'setDao', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCoinageFactory', 'prettyName': '', 'explanation': '' },
  { 'name': 'addChallenger', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferCoinageOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceWTONMinter', 'prettyName': '', 'explanation': '' },
  { 'name': 'slash', 'prettyName': '', 'explanation': '' },
];
const layer2RegistryFunctionsOfTypeB = [
  { 'name': 'renounceOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'prettyName': '', 'explanation': '' },
];
const daoCommitteeProxyFunctionsOfTypeB = [
  { 'name': 'grantRole', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceRole', 'prettyName': '', 'explanation': '' },
  { 'name': 'revokeRole', 'prettyName': '', 'explanation': '' },
  { 'name': 'setProxyPause', 'prettyName': '', 'explanation': '' },
  { 'name': 'upgradeTo', 'prettyName': '', 'explanation': '' },
];
const daoCommitteeFunctionsOfTypeB = [
  { 'name': 'grantRole', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceRole', 'prettyName': '', 'explanation': '' },
  { 'name': 'revokeRole', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCandidatesSeigManager', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCandidatesCommittee', 'prettyName': '', 'explanation': '' },
  { 'name': 'setDaoVault', 'prettyName': '', 'explanation': '' },
  { 'name': 'setLayer2Registry', 'prettyName': '', 'explanation': '' },
  { 'name': 'setAgendaManager', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCandidateFactory', 'prettyName': '', 'explanation': '' },
  { 'name': 'setTon', 'prettyName': '', 'explanation': '' },
  { 'name': 'registerOperatorByOwner', 'prettyName': '', 'explanation': '' },
  { 'name': 'endAgendaVoting', 'prettyName': '', 'explanation': '' },
  { 'name': 'setAgendaStatus', 'prettyName': '', 'explanation': '' },
];
// const candidateFunctionsOfTypeB = [
//   { 'name': 'approveTON', 'prettyName': '', 'explanation': '' },
// ];
const daoVaultFunctionsOfTypeB = [
  { 'name': 'renounceOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'prettyName': '', 'explanation': '' },
  { 'name': 'setTON', 'prettyName': '', 'explanation': '' },
  { 'name': 'setWTON', 'prettyName': '', 'explanation': '' },
];

const depositManagerABIOfTypeA = [];
const seigManagerABIOfTypeA = [];
const daoCommitteeABIOfTypeA = [];
const daoVaultABIOfTypeA = [];

const tonABIOfTypeB = [];
const wtonABIOfTypeB = [];
const depositManagerABIOfTypeB = [];
const seigManagerABIOfTypeB = [];
const layer2RegistryABIOfTypeB = [];
const daoCommitteeProxyABIOfTypeB = [];
const daoCommitteeABIOfTypeB = [];
// const candidateABIOfTypeB = [];
const daoVaultABIOfTypeB = [];

(() => {
  const set = (functions, abis, abi) => {
    functions.forEach(func => {
      const f = abi.find(f => f.name === func.name);
      f.explanation = func.explanation;
      f.prettyName = func.prettyName;
      abis.push(f);
    });
  };

  set(depositManagerFunctionsOfTypeA, depositManagerABIOfTypeA, depositManager.abi);
  set(seigManagerFunctionsOfTypeA, seigManagerABIOfTypeA, seigManager.abi);
  set(daoCommitteeFunctionsOfTypeA, daoCommitteeABIOfTypeA, committee.abi);
  set(daoVaultFunctionsOfTypeA, daoVaultABIOfTypeA, daoVault.abi);

  set(tonFunctionsOfTypeB, tonABIOfTypeB, ton.abi);
  set(wtonFunctionsOfTypeB, wtonABIOfTypeB, wton.abi);
  set(depositManagerFunctionsOfTypeB, depositManagerABIOfTypeB, depositManager.abi);
  set(seigManagerFunctionsOfTypeB, seigManagerABIOfTypeB, seigManager.abi);
  set(layer2RegistryFunctionsOfTypeB, layer2RegistryABIOfTypeB, layer2Registry.abi);
  set(daoCommitteeProxyFunctionsOfTypeB, daoCommitteeProxyABIOfTypeB, committeeProxy.abi);
  set(daoCommitteeFunctionsOfTypeB, daoCommitteeABIOfTypeB, committee.abi);
  // set(candidateFunctionsOfTypeB, candidateABIOfTypeB, candidate.abi);
  set(daoVaultFunctionsOfTypeB, daoVaultABIOfTypeB, daoVault.abi);
})();

module.exports.getContractABI = function (want, type='A') {
  if (!want) return [];

  if (type === 'A') {
    if (want === 'DepositManager')    return depositManagerABIOfTypeA;
    else if (want === 'SeigManager')  return seigManagerABIOfTypeA;
    else if (want === 'DAOCommittee') return daoCommitteeABIOfTypeA;
    else if (want === 'DAOVault2')    return daoVaultABIOfTypeA;
    else return [];
  } else {
    if (want === 'TON')                    return tonABIOfTypeB;
    else if (want === 'WTON')              return wtonABIOfTypeB;
    else if (want === 'DepositManager')    return depositManagerABIOfTypeB;
    else if (want === 'SeigManager')       return seigManagerABIOfTypeB;
    else if (want === 'Layer2Registry')    return layer2RegistryABIOfTypeB;
    else if (want === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeB;
    else if (want === 'DAOCommittee')      return daoCommitteeABIOfTypeB;
    // else if (want === 'Candidate')         return candidateABIOfTypeB;
    else if (want === 'DAOVault2')         return daoVaultABIOfTypeB;
    else return [];
  }
};

module.exports.getContractABIFromAddress = function (address, type='A') {
  if (!address) return [];
  address = address.toLowerCase();

  if (type === 'A') {
    if (address === deployed.DepositManager.toLowerCase())    return depositManagerABIOfTypeA;
    else if (address === deployed.SeigManager.toLowerCase())  return seigManagerABIOfTypeA;
    else if (address === deployed.DAOCommittee.toLowerCase()) return daoCommitteeABIOfTypeA;
    else if (address === deployed.DAOVault2.toLowerCase())    return daoVaultABIOfTypeA;
    else return [];
  } else {
    if (address === deployed.TON.toLowerCase())                    return tonABIOfTypeB;
    else if (address === deployed.WTON.toLowerCase())              return wtonABIOfTypeB;
    else if (address === deployed.DepositManager.toLowerCase())    return depositManagerABIOfTypeB;
    else if (address === deployed.SeigManager.toLowerCase())       return seigManagerABIOfTypeB;
    else if (address === deployed.Layer2Registry.toLowerCase())    return layer2RegistryABIOfTypeB;
    else if (address === deployed.DAOCommitteeProxy.toLowerCase()) return daoCommitteeProxyABIOfTypeB;
    else if (address === deployed.DAOCommittee.toLowerCase())      return daoCommitteeABIOfTypeB;
    else if (address === deployed.DAOVault2.toLowerCase())         return daoVaultABIOfTypeB;
    else return [];
  }
};

module.exports.getContractAddress = function (target) {
  const address = deployed[target];
  if (!address) {
    console.log('bug'); // eslint-disable-line
  }
  return address ? address : '';
};

module.exports.functionSignature  = function (contract, want, type='A') {
  if (!contract || !want) return '';

  if (type === 'A') {
    if (contract === 'DepositManager')    return (depositManagerABIOfTypeA.find(f => f.name === want)).signature;
    else if (contract === 'SeigManager')  return (seigManagerABIOfTypeA.find(f => f.name === want)).signature;
    else if (contract === 'DAOCommittee') return (daoCommitteeABIOfTypeA.find(f => f.name === want)).signature;
    else if (contract === 'DAOVault')     return (daoVaultABIOfTypeA.find(f => f.name === want)).signature;
    else return '';
  } else {
    if (contract === 'TON')                    return (tonABIOfTypeB.find(f => f.name === want)).signature;
    else if (contract === 'WTON')              return (wtonABIOfTypeB.find(f => f.name === want)).signature;
    else if (contract === 'DepositManager')    return (depositManagerABIOfTypeB.find(f => f.name === want)).signature;
    else if (contract === 'SeigManager')       return (seigManagerABIOfTypeB.find(f => f.name === want)).signature;
    else if (contract === 'Layer2Registry')    return (layer2RegistryABIOfTypeB.find(f => f.name === want)).signature;
    else if (contract === 'DAOCommitteeProxy') return (daoCommitteeProxyABIOfTypeB.find(f => f.name === want)).signature;
    else if (contract === 'DAOCommittee')      return (daoCommitteeABIOfTypeB.find(f => f.name === want)).signature;
    else if (contract === 'DaoVault2')         return (daoVaultABIOfTypeB.find(f => f.name === want)).signature;
    else return '';
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
  if (index === 0) return new BN(value); // uint256
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

const getABIFromSignature = function (signature, type='A') {
  let abi;

  if (type === 'A') {
    abi = depositManagerABIOfTypeA.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = seigManagerABIOfTypeA.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = daoCommitteeABIOfTypeA.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = daoVaultABIOfTypeA.find(abi => abi.signature === signature);
    if (abi) return abi;

    if (!abi) {
      // console.log('bug'); // eslint-disable-line
    }
  } else {
    abi = tonABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = wtonABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = depositManagerABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = seigManagerABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = layer2RegistryABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = daoCommitteeProxyABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = daoCommitteeABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    abi = daoVaultABIOfTypeB.find(abi => abi.signature === signature);
    if (abi) return abi;

    if (!abi) {
      console.log('bug'); // eslint-disable-line
    }
  }
};
module.exports.getABIFromSignature = getABIFromSignature;

module.exports.parseAgendaBytecode = function (tx) {
  const params1 = marshalString(unmarshalString(tx.input).substring(8));
  const decodedParams1 = decodeParameters(['address', 'uint256', 'bytes'], params1);

  const params2 = decodedParams1[2];
  const decodedParams2 = decodeParameters(['address[]', 'uint256', 'uint256', 'bytes[]'], params2);

  const targets = decodedParams2[0];
  const commands = decodedParams2[3];

  if (targets.length !== commands.length) {
    console.log('bug'); // eslint-disable-line
  }

  const onChainEffects = [];
  for (let i = 0; i < targets.length; i++) {
    const signature = commands[i].slice(0, 10);
    const abi = getABIFromSignature(signature);

    if (!abi) {
      // console.log('bug'); // eslint-disable-line
      onChainEffects.push({
        target: '',
        name: '',
        types: [],
        bytecode: '',
      });

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

    const onChainEffect = { target, name, types, values };
    onChainEffects.push(onChainEffect);
  }
  return onChainEffects;
};
