const Web3 = require('web3');
const web3Utils = require('web3-utils');
const BN = web3Utils.BN;

const { marshalString, unmarshalString } = require('../utils/helpers.js');

const agendaManager = require('../contracts/DAOAgendaManager.json');
const committeeProxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');
const depositManager = require('../contracts/DepositManager.json');
const ton = require('../contracts/TON.json');
const wton = require('../contracts/WTON.json');
const seigManager = require('../contracts/SeigManager.json');
const daoVault = require('../contracts/DAOVault2.json');

const deployed = {
  'TON'              : '0xEfe15d914Bcaa0C924402769942d123f25Fa79A7',
  'WTON'             : '0xB0a5C780Fcb03ce3d38B0c7c89EF192648B7E4dB',
  'Layer2Registry'   : '0x94971616637f99E4905588E350ed2D8b1D7ACFC2',
  'DepositManager'   : '0x34e04ddb1d74E758021aF64cCb82C07B50A5bE74',
  'CoinageFactory'   : '0x215e03C034E0e986313D47d2e395e819FA187E88',
  'DaoVault'         : '0xF4005EAaa4C723DBE153533DC6EcaA4e98E14204',
  'SeigManager'      : '0x715a2c8007D83505dAA8231AeF67192A01F955dA',
  'PowerTON'         : '0x532Fd3b0502802eE4948A3bA12C70d128fC616E3',
  'DAOVault2'        : '0xf178889C83e6503aCcacAC62d5Dd1A41620C10E1',
  'DAOAgendaManager' : '0xA31e96f4821130EB85216954f17D46AF78ACc093',
  'CandidateFactory' : '0x4eE287F22b5462979CE9B3d7427A6562bF539b93',
  'DAOCommittee'     : '0x8728d39Ae13279A4ACC93d1713C03cfE7cedD446',
  'DAOCommitteeProxy': '0x791e587640d10d14e78a4E716d942E6531c59DB4',
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

const depositManagerFunctions = ['setGlobalWithdrawalDelay'];
const seigManagerFunctions = [
  'setPowerTONSeigRate',
  'setDaoSeigRate',
  'setPseigRate',
  'setAdjustDelay',
  'setMinimumAmount',
];
const daoCommitteeFunctions = [
  'setActivityRewardPerSecond',
  'increaseMaxMember',
  'reduceMemberSlot',
  'setQuorum',
  'setCreateAgendaFees',
  'setMinimumNoticePeriodSeconds',
  'setMinimumVotingPeriodSeconds',
];
const daoVaultFunctions = [
  'approveTON',
  'approveWTON',
  'approveERC20',
  'claimTON',
  'claimWTON',
  'claimERC20',
];

const depositManagerABI = [];
const seigManagerABI = [];
const daoCommitteeABI = [];
const daoVaultABI = [];

(() => {
  depositManagerFunctions.forEach(func => {
    const f = depositManager.abi.find(f => f.name === func);
    depositManagerABI.push(f);
  });

  seigManagerFunctions.forEach(func => {
    const f = seigManager.abi.find(f => f.name === func);
    seigManagerABI.push(f);
  });

  daoCommitteeFunctions.forEach(func => {
    const f = committee.abi.find(f => f.name === func);
    daoCommitteeABI.push(f);
  });

  daoVaultFunctions.forEach(func => {
    const f = daoVault.abi.find(f => f.name === func);
    daoVaultABI.push(f);
  });
})();

module.exports.getContractABI = function (want) {
  if (!want) return [];

  if (want === 'DepositManager') return depositManagerABI;
  else if (want === 'SeigManager') return seigManagerABI;
  else if (want === 'DAOCommittee') return daoCommitteeABI;
  else if (want === 'DAOVault') return daoVaultABI;
  else return [];
};

module.exports.functionSignature  = function (contract, want) {
  if (!contract || !want) return '';

  if (contract === 'DepositManager') return (depositManagerABI.find(f => f.name === want)).signature;
  else if (contract === 'SeigManager') return (seigManagerABI.find(f => f.name === want)).signature;
  else if (contract === 'DAOCommittee') return (daoCommitteeABI.find(f => f.name === want)).signature;
  else if (contract === 'DAOVault') return (daoVaultABI.find(f => f.name === want)).signature;
  else return '';
};

module.exports.encodeParameters = function (typesArray, parameters) {
  const web3 = new Web3();
  return web3.eth.abi.encodeParameters(typesArray, parameters);
};

module.exports.encoded = function (type, value) {
  const types = [
    'uint256',
  ];

  const index = types.indexOf(type);
  if (index === -1) {
    console.log('bug'); // eslint-disable-line
    return '';
  }
  if (index === 0) return new BN(value);
};

const decodeParameters = function (typesArray, hexString) {
  const web3 = new Web3();
  return web3.eth.abi.decodeParameters(typesArray, hexString);
};
module.exports.decodeParameters = decodeParameters;

const getABIFromSignature = function (signature) {
  let abi;

  abi = depositManagerABI.find(abi => abi.signature === signature);
  if (abi) return abi;

  abi = seigManagerABI.find(abi => abi.signature === signature);
  if (abi) return abi;

  abi = daoCommitteeABI.find(abi => abi.signature === signature);
  if (abi) return abi;

  abi = daoVaultABI.find(abi => abi.signature === signature);
  if (abi) return abi;

  if (!abi) {
    console.log('bug'); // eslint-disable-line
  }

  return abi;
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
      console.log('bug'); // eslint-disable-line
      onChainEffects.push({
        name: '',
        types: [],
        bytecode: '',
      });

      continue;
    }

    const name = abi.name;
    const types = [];
    abi.inputs.forEach(input => {
      types.push(input.type);
    });
    const bytecode = marshalString(unmarshalString(commands[i]).substring(8));
    const values = decodeParameters(types, bytecode);

    const onChainEffect = { name, types, values };
    onChainEffects.push(onChainEffect);
  }
  return onChainEffects;
};
