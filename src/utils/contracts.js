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
const daoVault = require('../contracts/DAOVault.json');
const layer2Registry = require('../contracts/Layer2Registry.json');
const layer2 = require('../contracts/Layer2.json');

/*
const deployed = {
  'TON'              : '0x122594eFc1653C86B97065d1B7C29d2Ca8db9081',
  'WTON'             : '0xC3c44E2F55A093Eb67C6B2A0A936bF1B3DA8D17F',
  'Layer2Registry'   : '0xbb20a7A837616dAB58E54dBfdc03F258aC27791a',
  'DepositManager'   : '0x0430e7138F4981479F43F6e7d67081900028EEdD',
  'CoinageFactory'   : '0x1C6bc7841303c3dc5c5D6bc0D6428a58B6F8190D',
  'OldDAOVaultMock'  : '0x0a915BD4aD8b684f730012a12B52A629f842D5c4',
  'SeigManager'      : '0x5bCbE9e523707200869FaeAac9C903786bD0fD57',
  'PowerTON'         : '0x4C0946e3aEaDFD36ab7f09755d6b9CFDF081defb',
  'DAOVault'         : '0x45cc5238047834C7CA7C3782E2EB4Af7544D2aAC',
  'DAOAgendaManager' : '0x7Ce981B536d49Fe08bf876b2d699b240052DC058',
  'CandidateFactory' : '0x78e1916595BFbb9D396f7bd3B5D4529cE9f55E53',
  'DAOCommittee'     : '0x6b12f4e068D6ed23111cDcb9dB56b659C9898B3D',
  'DAOCommitteeProxy': '0x586caFca57613B864aDaC6b3F8A9d3390A128768',
  'EtherToken'       : '0xFE9d9D39C34ce186E2b59089Ca1abB93F7dd8455',
};*/
const deployed = {
  'TON': '0xD2F2b955C64B2aBefBee95157441B26E93d73F98',
  'WTON': '0xb3e121740a8b53edcd2AcebBE04C08E0337e9E2C',
  'Layer2Registry': '0x5A39F68e53cCBe0092F4D7f1098905F7C55e30a5',
  'DepositManager': '0xA8CF64F159C337DA3e465a3910C61F0f536bAb48',
  'CoinageFactory': '0xcc61736cb4D75BcBfA7188d913012f49B225c77A',
  'OldDAOVaultMock': '0xE51B320e6FeD07e6f3A4846444810CBAE717e71d',
  'SeigManager': '0x481291f9Dbb81e05d4C1b9f707eF5d2e94108476',
  'PowerTON': '0x4A36a630E027e55eC9b29eFe5dBecd2b42eBC35c',
  'DAOVault': '0x37ACb37Ad64297363cc6D1a51217c9c0dA34d7ed',
  'DAOAgendaManager': '0x8CfaB05718b607D45E3DF0f9B6F25dF81C7e5Ecb',
  'CandidateFactory': '0x0A19fe7860Df2bb6711Ea6Cbd76507ceab005952',
  'DAOCommittee': '0xE14FE4AaA9752E2587D74Aa51A92cd22E5fEb14c',
  'DAOCommitteeProxy': '0x692A8C6b8c8Fdb6Af9c30119470874AD3fa3C5b1',
  'EtherToken': '0x7e38f98DbdCb825Fe0BD7ae14DB7e70869a12927',
};


function getContract (want, web3, address) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f6429583907549eca57832ec1a60b44f'));
  }
  const Candidate = new web3.eth.Contract(candidate.abi, address);
  const Layer2 = new web3.eth.Contract(layer2.abi, address);
  const DAOAgendaManager = new web3.eth.Contract(agendaManager.abi, deployed.DAOAgendaManager);
  const DAOCommitteeProxy = new web3.eth.Contract(committee.abi, deployed.DAOCommitteeProxy); // NOTE: use committee abi.
  const DAOCommittee = new web3.eth.Contract(committee.abi, deployed.DAOCommittee); // NOTE: not used.
  const DepositManager = new web3.eth.Contract(depositManager.abi, deployed.DepositManager);
  const TON = new web3.eth.Contract(ton.abi, deployed.TON);
  const WTON = new web3.eth.Contract(wton.abi, deployed.WTON);
  const SeigManager = new web3.eth.Contract(seigManager.abi, deployed.SeigManager);

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
  };

  if (want) {
    return contracts.hasOwnProperty(want) ? contracts[want] : null; // eslint-disable-line
  } else {
    return contracts;
  }
}

module.exports.getContract = getContract;

const depositManagerFunctionsOfTypeA = [
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setGlobalWithdrawalDelay', 'title':'Global withdrawal delay will be changed.', 'prettyName': '', 'explanation': 'It decides the Global Withdrawal Period for stakers/delegators. No single Layer2\'s withdrawal delay can\'t be shorter then this.',
  },
];
const seigManagerFunctionsOfTypeA = [
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setPowerTONSeigRate', 'title':'Power TON Seigniorage rate will be changed.', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for PowerTON winning prize.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setDaoSeigRate', 'title':'DAO seigniorage rate will be changed.', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for DAO pot.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setPseigRate', 'title':'Propotional seigniorage rate will be changed.', 'prettyName': '', 'explanation': 'It represents how much of newly minted TON per block is deducted for propotional staking rewards.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setAdjustDelay', 'title':'Adjust delay will be changed', 'prettyName': '', 'explanation': 'It decides how much time should be wait until new commission rate is applied.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setMinimumAmount', 'title':'Minimum amount to staking TON will be changed.', 'prettyName': '', 'explanation': 'It sets minimum amount of staked TON for operator to maintain Layer2. It operator\'s staked TON is less than this one, operator\'s commit is alwayw reverted.',
  },
];
const daoCommitteeProxyFunctionsOfTypeA = [
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setActivityRewardPerSecond', 'title':'', 'prettyName': '', 'explanation': 'This is activity reward for Layer2 operator which occupy the Committee member. Reward is given time basis(seconds). It decide activity reward per seconds.',
  },
  {
    'params': {
      'aboutParam0': '0',
      'exampleParam0': '0',
      'aboutParam1': '1',
      'exampleParam1': '1',
    },
    'name': 'increaseMaxMember', 'title':'', 'prettyName': '', 'explanation': 'It increases maximum number of Committee Members.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
      'aboutParam1': '',
      'exampleParam1': '',
    },
    'name': 'decreaseMaxMember', 'title':'', 'prettyName': '', 'explanation': 'It decreased maximum number of Committee Members.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setQuorum', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum qurom for committee members to execute agenda.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setCreateAgendaFees', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum cost to propose agenda. Unit is TON.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setMinimumNoticePeriodSeconds', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum notice period of agenda. Per seconds.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
    },
    'name': 'setMinimumVotingPeriodSeconds', 'title':'', 'prettyName': '', 'explanation': 'It sets minimum vote period of agenda. Per seconds.',
  },
];
const daoVaultFunctionsOfTypeA = [
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
      'aboutParam1': '',
      'exampleParam1': '',
    },
    'name': 'approveTON', 'title':'', 'prettyName': '', 'explanation': 'It approves param1(address) to spend param2 amount of TON in DAO vault2.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
      'aboutParam1': '',
      'exampleParam1': '',
    },
    'name': 'approveWTON', 'title':'', 'prettyName': '', 'explanation': 'It approves param1(address) to spend param2 amount of WTON in DAO vault2.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
      'aboutParam1': '',
      'exampleParam1': '',
      'aboutParam2': '',
      'exampleParam2': '',
    },
    'name': 'approveERC20', 'title':'', 'prettyName': '', 'explanation': 'It approves param2(address) to spend param3 amount of ERC20(param1) in DAO vault2.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
      'aboutParam1': '',
      'exampleParam1': '',
    },
    'name': 'claimTON', 'title':'', 'prettyName': '', 'explanation': 'It allows param1 to claim param2 amount of TON.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
      'aboutParam1': '',
      'exampleParam1': '',
    },
    'name': 'claimWTON', 'title':'', 'prettyName': '', 'explanation': 'It allows param1 to claim param2 amount of WTON.',
  },
  {
    'params': {
      'aboutParam0': '',
      'exampleParam0': '',
      'aboutParam1': '',
      'exampleParam1': '',
      'aboutParam2': '',
      'exampleParam2': '',
    },
    'name': 'claimERC20', 'title':'', 'prettyName': '', 'explanation': 'It allows param2 to claim param3 amount of ERC20(param1).',
  },
];

const tonFunctionsOfTypeB = [
  {
    'name': 'addMinter', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'enableCallback', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'mint', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceMinter', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renouncePauser', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferFrom', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '',
  },
];
const wtonFunctionsOfTypeB = [
  {
    'name': 'addMinter', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'enableCallback', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'mint', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceMinter', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renouncePauser', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferFrom', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'burnFrom', 'title':'', 'prettyName': '', 'explanation': '',
  },
];
const depositManagerFunctionsOfTypeB = [
  {
    'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'slash', 'title':'', 'prettyName': '', 'explanation': '',
  },
];
const seigManagerFunctionsOfTypeB = [
  {
    'name': 'addPauser', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceMinter', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renouncePauser', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'pause', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'unpause', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setPowerTON', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setDao', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setCoinageFactory', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'addChallenger', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferCoinageOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceWTONMinter', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'slash', 'title':'', 'prettyName': '', 'explanation': '',
  },
];
const layer2RegistryFunctionsOfTypeB = [
  {
    'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
];
const daoCommitteeProxyFunctionsOfTypeB = [
  {
    'name': 'grantRole', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceRole', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'revokeRole', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setProxyPause', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'upgradeTo', 'title':'', 'prettyName': '', 'explanation': '',
  },
];
const daoCommitteeFunctionsOfTypeB = [
  {
    'name': 'grantRole', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'renounceRole', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'revokeRole', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setSeigManager', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setCandidatesSeigManager', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setCandidatesCommittee', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setDaoVault', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setLayer2Registry', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setAgendaManager', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setCandidateFactory', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setTon', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'registerOperatorByOwner', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'endAgendaVoting', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setAgendaStatus', 'title':'', 'prettyName': '', 'explanation': '',
  },
];
const daoVaultFunctionsOfTypeB = [
  {
    'name': 'renounceOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'transferOwnership', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setTON', 'title':'', 'prettyName': '', 'explanation': '',
  },
  {
    'name': 'setWTON', 'title':'', 'prettyName': '', 'explanation': '',
  },
];

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
})();

module.exports.getContractABI = function (want, type='A') {
  if (!want) return [];

  if (type === 'A') {
    if (want === 'DepositManager')         return depositManagerABIOfTypeA;
    else if (want === 'SeigManager')       return seigManagerABIOfTypeA;
    else if (want === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeA;
    else if (want === 'DAOVault')         return daoVaultABIOfTypeA;
    else return [];
  } else {
    if (want === 'TON')                    return tonABIOfTypeB;
    else if (want === 'WTON')              return wtonABIOfTypeB;
    else if (want === 'DepositManager')    return depositManagerABIOfTypeB;
    else if (want === 'SeigManager')       return seigManagerABIOfTypeB;
    else if (want === 'Layer2Registry')    return layer2RegistryABIOfTypeB;
    else if (want === 'DAOCommitteeProxy') return daoCommitteeProxyABIOfTypeB;
    else if (want === 'DAOCommittee')      return daoCommitteeABIOfTypeB;
    else if (want === 'DAOVault')         return daoVaultABIOfTypeB;
    else return [];
  }
};

module.exports.getContractABIFromAddress = function (address, type='A') {
  if (!address) return [];
  address = address.toLowerCase();

  if (type === 'A') {
    if (address === deployed.DepositManager.toLowerCase())    return depositManagerABIOfTypeA;
    else if (address === deployed.SeigManager.toLowerCase())  return seigManagerABIOfTypeA;
    else if (address === deployed.DAOCommitteeProxy.toLowerCase()) return daoCommitteeProxyABIOfTypeA;
    else if (address === deployed.DAOVault.toLowerCase())    return daoVaultABIOfTypeA;
    else return [];
  } else {
    if (address === deployed.TON.toLowerCase())                    return tonABIOfTypeB;
    else if (address === deployed.WTON.toLowerCase())              return wtonABIOfTypeB;
    else if (address === deployed.DepositManager.toLowerCase())    return depositManagerABIOfTypeB;
    else if (address === deployed.SeigManager.toLowerCase())       return seigManagerABIOfTypeB;
    else if (address === deployed.Layer2Registry.toLowerCase())    return layer2RegistryABIOfTypeB;
    else if (address === deployed.DAOCommitteeProxy.toLowerCase()) return daoCommitteeProxyABIOfTypeB;
    else if (address === deployed.DAOCommittee.toLowerCase())      return daoCommitteeABIOfTypeB;
    else if (address === deployed.DAOVault.toLowerCase())         return daoVaultABIOfTypeB;
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
    else if (contract === 'DAOCommitteeProxy') return (daoCommitteeProxyABIOfTypeA.find(f => f.name === want)).selector;
    else if (contract === 'DAOVault')    {
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
    else if (contract === 'DAOVault')         return (daoVaultABIOfTypeB.find(f => f.name === want)).selector;
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

    abi = daoCommitteeProxyABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;

    abi = daoVaultABIOfTypeA.find(abi => abi.selector === selector);
    if (abi) return abi;
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

module.exports.metamaskErrorMessage = function (errorString) {
  let errString='';
  if (errorString !== null && errorString.length > 0 ) {
    const key = 'message';
    const positionKey = errorString.indexOf(key);
    const startMessage = errorString.indexOf('"', positionKey+key.length+2);
    const endMessage = errorString.indexOf('"', startMessage+3);
    errString = errorString.substring(startMessage+1, endMessage);
  }
  return errString;
};

module.exports.isVotableStatusOfAgenda = async function (agendaId, _web3) {
  let isVotableStatus = false;
  try {
    const AgendaManager = await getContract('DAOAgendaManager', _web3);
    if (AgendaManager !== null){
      isVotableStatus = await AgendaManager.methods.isVotableStatus(agendaId).call();
    } else {
      console.log('Utils.isVotableStatus AgendaManager is null') ; // eslint-disable-line
    }
  } catch (err) {
    console.log('Utils.isVotableStatus err', err) ; // eslint-disable-line
  }
  return isVotableStatus;
};

module.exports.canExecute = async function (agendaId, _web3) {
  let canExecute = false;
  try {
    const AgendaManager = await getContract('DAOAgendaManager', _web3);
    if (AgendaManager !== null){
      canExecute = await AgendaManager.methods.canExecuteAgenda(agendaId).call();
    } else {
      console.log('Utils.canExecuteAgenda AgendaManager is null') ; // eslint-disable-line
    }
  } catch (err) {
    console.log('Utils.canExecuteAgenda err', err) ; // eslint-disable-line
  }
  return canExecute;
};
