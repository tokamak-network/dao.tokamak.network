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
  'TON'              : '0xeF2cd138De0c0e0369A0daf41A45b51d50D608B1',
  'WTON'             : '0x73d950D6074Aa76f123903E040349b007F9d570e',
  'Layer2Registry'   : '0xdA773c5f94F0573a9aCbAA0d4a0D9470cc9DC1f1',
  'DepositManager'   : '0x3588F691C6E91a449CB8e82CaFA41A591e40229c',
  'CoinageFactory'   : '0x80bD7dd5a760E0349780ca205865f31492143bCd',
  'DaoVault'         : '0x648FC895B7019C13E00cC801A78d3105dfe37B37',
  'SeigManager'      : '0xfB160cBb8e1665e230Ee421A31D02E0A5Da09172',
  'PowerTON'         : '0x55914667b2487233FC7A68E5cA0CdBA708338E18',
  'DAOVault2'        : '0x7C6A6188B5360530528C6eA64Fb8F4d5A8D406fc',
  'DAOAgendaManager' : '0xa08883f1Bf4D70862C0f0D96233E556893986434',
  'CandidateFactory' : '0xA35B64519B1feAcF4111F58bDa7288bBE3139aC9',
  'DAOCommittee'     : '0x7F7551BBDa4fCe30462aD35f59B7fBf35b07219e',
  'DAOCommitteeProxy': '0x8bF69cC968b81f62a2CDC72A8A7024C3E9fCE067',
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
