const Web3 = require('web3');

const manager = require('../contracts/DAOAgendaManager.json');
const proxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');
const deposit = require('../contracts/DepositManager.json');
const ton = require('../contracts/TON.json');
const wton = require('../contracts/WTON.json');
const seigManager = require('../contracts/SeigManager.json');

const deployed = {
  'TON': '0xE755219E15D4d972f09C59d3a1F26528C6B0C08f',
  'WTON': '0xc648D756599Dc768Db8A7452467bb88A3D3FF68b',
  'Layer2Registry': '0x78a72e5b2a04F3171324b6142Ba9839744573294',
  'DepositManager': '0x77e2c0c5C66D3bc303a84ee90481f9C7e7444F14',
  'CoinageFactory': '0x4b4962E524D411E47b623Dd9D3198CD8c7ecA85e',
  'DaoVault': '0xbfD599168dDEBA0dcBA7eF987436c3f3139B26bf',
  'SeigManager': '0x679F73279D59D408919DbDA4e524C0086581Cfa7',
  'PowerTON': '0x9Af0465efC117F0693D6dd9602B80b979C3af52B',
  'DAOVault2': '0x8e90c958B542ea5c0374e8197C575AbD1d121223',
  'DAOAgendaManager': '0x73996fea9c25e1462b610392DE82A5f524187a57',
  'CandidateFactory': '0x9fDc894dD7367Fb60Fb295f7AB666fd13de4967D',
  'DAOCommittee': '0x2eb14720c1b14D70e95EC83C4BC967B5cE0F61Ca',
  'DAOCommitteeProxy': '0x8d01ed892A609206B17600e75C204E342DF71eCf',
};

module.exports.getContracts = function (want, web3) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f6429583907549eca57832ec1a60b44f'));
  }
  const DAOAgendaManager = new web3.eth.Contract(manager.abi, deployed.DAOAgendaManager);
  const DAOCommitteeProxy = new web3.eth.Contract(proxy.abi, deployed.DAOCommitteeProxy);
  const DAOCommittee = new web3.eth.Contract(committee.abi, deployed.DAOCommitteeProxy); // Use proxy address.
  const DepositManager = new web3.eth.Contract(deposit.abi, deployed.DepositManager);
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

const depositManagerFunctions = [
  {
    name: 'setGlobalWithdrawalDelay',
    params: [
      {
        type: 'uint256',
        name: 'globalWithdrawalDelay_',
      },
    ],
  },
];

module.exports.getContractFunctions = function (want) {
  if (want === 'DepositManager') return depositManagerFunctions;
  return [];
};

module.exports.encodeFunctionSignature = function (contract, want) {
  const web3 = new Web3();
  if (contract === 'DepositManager') {
    const abi = deposit.abi;
    const func = abi.find(f => f.name === want);

    return web3.eth.abi.encodeFunctionSignature(func);
  }
  return '';
};

module.exports.encodeParameters = function (typesArray, parameters) {
  const web3 = new Web3();
  return web3.eth.abi.encodeParameters(typesArray, parameters);
};

module.exports.encoded = function (type, value) {
  if (type.includes('int')) {
    try {
      return parseInt(value);
    } catch (err) {
      console.log(err.message); // eslint-disable-line
      return -1;
    }
  }
};
