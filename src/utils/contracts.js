const Web3 = require('web3');

const manager = require('../contracts/DAOAgendaManager.json');
const proxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');

const deployed = {
  'TON': '0xE755219E15D4d972f09C59d3a1F26528C6B0C08f',
  'WTON': '0xc648D756599Dc768Db8A7452467bb88A3D3FF68b',
  'Layer2Registry': '0x78a72e5b2a04F3171324b6142Ba9839744573294',
  'DepositManager': '0x77e2c0c5C66D3bc303a84ee90481f9C7e7444F14',
  'CoinageFactory': '0x4b4962E524D411E47b623Dd9D3198CD8c7ecA85e',
  'DaoVault': '0xbfD599168dDEBA0dcBA7eF987436c3f3139B26bf',
  'SeigManager': '0x679F73279D59D408919DbDA4e524C0086581Cfa7',
  'PowerTON': '0x9Af0465efC117F0693D6dd9602B80b979C3af52B',
  'DAOVault2': '0x51e85b3ef76Df03cF5a9D54e2FEf1A9Cc3aB7fd9',
  'DAOAgendaManager': '0x72007Cc15551DeA3bF1e9bedee2A138c7e20ADcb',
  'CandidateFactory': '0xF95618B712fb00d7ee1070c4E7B922c440826620',
  'DAOCommittee': '0x2CFC2f501a1589c7C83F59C35B2404f6f09121DD',
  'DAOCommitteeProxy': '0x666463C4D94bed5a12F6171E1AC967627E00D8bA',
};

module.exports.getContracts = function (want, web3) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f6429583907549eca57832ec1a60b44f'));
  }
  const DAOAgendaManager = new web3.eth.Contract(manager.abi, deployed.DAOAgendaManager);
  const DAOCommitteeProxy = new web3.eth.Contract(proxy.abi, deployed.DAOCommitteeProxy);
  const DAOCommittee = new web3.eth.Contract(committee.abi, deployed.DAOCommitteeProxy); // Use proxy address.

  const contracts = {
    DAOAgendaManager,
    DAOCommitteeProxy,
    DAOCommittee,
  };

  if (want) {
    return contracts.hasOwnProperty(want) ? contracts[want] : null; // eslint-disable-line
  } else {
    return contracts;
  }
};
