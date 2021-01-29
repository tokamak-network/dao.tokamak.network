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

const agendaManager = require('../contracts/DAOAgendaManager.json');
const candidate = require('../contracts/Candidate.json');
const committeeProxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');
const depositManager = require('../contracts/DepositManager.json');
const ton = require('../contracts/TON.json');
const wton = require('../contracts/WTON.json');
const seigManager = require('../contracts/SeigManager.json');
const daoVault = require('../contracts/DAOVault2.json');
const layer2Registry = require('../contracts/Layer2Registry.json');

const deployed =  {
  'TON'              : '0x4273285FCb57209B6c5518307648B3357d2Dc180',
  'WTON'             : '0xA40772a4d1aB2C7b7b67356b3DBD1401Ddf7E930',
  'Layer2Registry'   : '0xF86e3f956F808C6a015146EA59280758BDB7d369',
  'DepositManager'   : '0xb463d3AE2106FD44E72a43F5e8cEeC2F8F00164A',
  'CoinageFactory'   : '0xD7f0F24FC5d63b39ca2353a297e7A160bA3FA935',
  'DAOVault'         : '0x099D1B4d63eD426ed93b85e5f775794ee3EE3028',
  'SeigManager'      : '0xc792d10605C4daED4405393dF06B84f0AB570270',
  'PowerTON'         : '0x0a6DefE120382A7aB0b381425E94716cEca924b3',
  'DAOVault2'        : '0x11cAE7877790a675EF9b0C30860DDe0F42bdC076',
  'DAOAgendaManager' : '0x908B05753462Dc3E569Db8132AeFc6e39cacfCA1',
  'CandidateFactory' : '0x8f78510b524Aea1b523d24bB882eb2A144c0bc39',
  'DAOCommittee'     : '0xaD1C782E3c16Dc45730DBb45E78b3395d771c89e',
  'DAOCommitteeProxy': '0xC3c2534AFA3673c3DD82042e6c17930F9CA4C278',
  'EtherToken'       : '0x6D5bF9764219868a341f1c04F7a082d6A9219D56',
};

module.exports.getContract = function (want, web3, address) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f6429583907549eca57832ec1a60b44f'));
  }
  const Candidate = new web3.eth.Contract(candidate.abi, address);
  const DAOAgendaManager = new web3.eth.Contract(agendaManager.abi, deployed.DAOAgendaManager);
  const DAOCommitteeProxy = new web3.eth.Contract(committee.abi, deployed.DAOCommitteeProxy); // NOTE: use committee abi.
  const DAOCommittee = new web3.eth.Contract(committee.abi, deployed.DAOCommittee); // NOTE: not used.
  const DepositManager = new web3.eth.Contract(depositManager.abi, deployed.DepositManager);
  const TON = new web3.eth.Contract(ton.abi, deployed.TON);
  const WTON = new web3.eth.Contract(wton.abi, deployed.WTON);
  const SeigManager = new web3.eth.Contract(seigManager.abi, deployed.SeigManager);

  const contracts = {
    Candidate,
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
  { 'name': 'setGlobalWithdrawalDelay', 'title':'Global withdrawal delay will be changed.', 'prettyName': '', 'explanation': 'It decides the Global Withdrawal Period for stakers/delegators. No single Layer2\'s withdrawal delay can\'t be shorter then this.' },
];
const seigManagerFunctionsOfTypeA = [
  { 'name': 'setPowerTONSeigRate', 'title':'Power TON Seigniorage rate will be changed.', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for PowerTON winning prize.' },
  { 'name': 'setDaoSeigRate', 'title':'DAO seigniorage rate will be changed.', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for DAO pot.' },
  { 'name': 'setPseigRate', 'title':'Propotional seigniorage rate will be changed.', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for propotional staking rewards.' },
  { 'name': 'setAdjustDelay', 'title':'Adjust delay will be changed', 'prettyName': '', 'explanation': 'It decides how much time should be wait until new commission rate is applied.' },
  { 'name': 'setMinimumAmount', 'title':'Minimum amount to staking TON will be changed.', 'prettyName': '', 'explanation': 'It sets minimum amount of staked TON for operator to maintain Layer2. It operator\'s staked TON is less than this one, operator\'s commit is alwayw reverted.' },
];
const daoCommitteeFunctionsOfTypeA = [
  { 'name': 'setActivityRewardPerSecond', 'title':'', 'prettyName': '', 'explanation': 'This is activity reward for Layer2 operator which occupy the Committee member. Reward is given time basis(seconds). It decide activity reward per seconds.' },
  { 'name': 'increaseMaxMember', 'title':'', 'prettyName': '', 'explanation': 'It increases maximum number of Committee Members.' },
  { 'name': 'decreaseMaxMember', 'title':'', 'prettyName': '', 'explanation': 'It decreased maximum number of Committee Members.' },
  { 'name': 'setQuorum', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum qurom for committee members to execute agenda.' },
  { 'name': 'setCreateAgendaFees', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum cost to propose agenda. Unit is TON.' },
  { 'name': 'setMinimumNoticePeriodSeconds', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum notice period of agenda. Per seconds.' },
  { 'name': 'setMinimumVotingPeriodSeconds', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum vote period of agenda. Per seconds.' },
];
const daoVaultFunctionsOfTypeA = [
  { 'name': 'approveTON', 'title':'', 'prettyName': '', 'explanation': 'It approves param1(address) to spend param2 amount of TON in DAO vault2.' },
  { 'name': 'approveWTON', 'title':'', 'prettyName': '', 'explanation': 'It approves param1(address) to spend param2 amount of WTON in DAO vault2.' },
  { 'name': 'approveERC20', 'title':'', 'prettyName': '', 'explanation': 'It approves param2(address) to spend param3 amount of ERC20(param1) in DAO vault2.' },
  { 'name': 'claimTON', 'title':'', 'prettyName': '', 'explanation': 'It allows param1 to claim param2 amount of TON.' },
  { 'name': 'claimWTON', 'title':'', 'prettyName': '', 'explanation': 'It allows param1 to claim param2 amount of WTON.' },
  { 'name': 'claimERC20', 'title':'', 'prettyName': '', 'explanation': 'It allows param2 to claim param3 amount of ERC20(param1).' },
];

const tonFunctionsOfTypeB = [
  { 'name': 'addMinter', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'enableCallback', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'mint', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceMinter', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renouncePauser', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferFrom', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '' },
];
const wtonFunctionsOfTypeB = [
  { 'name': 'addMinter', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'enableCallback', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'mint', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceMinter', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renouncePauser', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferFrom', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'burnFrom', 'title':'', 'prettyName': '', 'explanation': '' },
];
const depositManagerFunctionsOfTypeB = [
  { 'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'slash', 'title':'', 'prettyName': '', 'explanation': '' },
];
const seigManagerFunctionsOfTypeB = [
  { 'name': 'addPauser', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceMinter', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renouncePauser', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'pause', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'unpause', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setPowerTON', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setDao', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCoinageFactory', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'addChallenger', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferCoinageOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceWTONMinter', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'slash', 'title':'', 'prettyName': '', 'explanation': '' },
];
const layer2RegistryFunctionsOfTypeB = [
  { 'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
];
const daoCommitteeProxyFunctionsOfTypeB = [
  { 'name': 'grantRole', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceRole', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'revokeRole', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setProxyPause', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'upgradeTo', 'title':'', 'prettyName': '', 'explanation': '' },
];
const daoCommitteeFunctionsOfTypeB = [
  { 'name': 'grantRole', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'renounceRole', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'revokeRole', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCandidatesSeigManager', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCandidatesCommittee', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setDaoVault', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setLayer2Registry', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setAgendaManager', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setCandidateFactory', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setTon', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'registerOperatorByOwner', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'endAgendaVoting', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setAgendaStatus', 'title':'', 'prettyName': '', 'explanation': '' },
];
// const candidateFunctionsOfTypeB = [
//   { 'name': 'approveTON', 'title':'', 'prettyName': '', 'explanation': '' },
// ];
const daoVaultFunctionsOfTypeB = [
  { 'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setTON', 'title':'', 'prettyName': '', 'explanation': '' },
  { 'name': 'setWTON', 'title':'', 'prettyName': '', 'explanation': '' },
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
      f.selector = web3EthABI.encodeFunctionSignature(f);
      f.explanation = func.explanation;
      f.prettyName = func.prettyName;
      f.title = func.title;

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

module.exports.getFunctionSelector  = function (contract, want, type) {
  if (!contract || !want) return '';

  if (type === 'A') {
    if (contract === 'DepositManager')    return (depositManagerABIOfTypeA.find(f => f.name === want)).selector;
    else if (contract === 'SeigManager')  return (seigManagerABIOfTypeA.find(f => f.name === want)).selector;
    else if (contract === 'DAOCommittee') return (daoCommitteeABIOfTypeA.find(f => f.name === want)).selector;
    else if (contract === 'DAOVault2')    {
      return (daoVaultABIOfTypeA.find(f => f.name === want)).selector;
    }
    else {
      return '';
    }
  } else if (type === 'B') {
    if (contract === 'TON')                    return (tonABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'WTON')              return (wtonABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DepositManager')    return (depositManagerABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'SeigManager')       return (seigManagerABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'Layer2Registry')    return (layer2RegistryABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DAOCommitteeProxy') return (daoCommitteeProxyABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DAOCommittee')      return (daoCommitteeABIOfTypeB.find(f => f.name === want)).selector;
    else if (contract === 'DAOVault2')         return (daoVaultABIOfTypeB.find(f => f.name === want)).selector;
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

const getABIFromSelector = function (selector, type='A') {
  let abi;

  if (type === 'A') {
    abi = depositManagerABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;

    abi = seigManagerABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;

    abi = daoCommitteeABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;

    abi = daoVaultABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;

    if (!abi) {
      console.log('bug'); // eslint-disable-line
    }
  } else {
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

    if (!abi) {
      console.log('bug'); // eslint-disable-line
    }
  }
};
module.exports.getABIFromSelector = getABIFromSelector;

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
    const selector = commands[i].slice(0, 10);
    const abi = getABIFromSelector(selector);

    if (!abi) {
      console.log('bug'); // eslint-disable-line
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
