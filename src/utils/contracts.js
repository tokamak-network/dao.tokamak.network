const Web3 = require('web3');

const manager = require('../contracts/DAOAgendaManager.json');
const proxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');

const deployed = {
  'TON': '0x72F0D405Da600874C63871d94026872f5F6A2555',
  'WTON': '0x8F8B0dfc113452255F2a5312BEa2aABf265767CE',
  'Layer2Registry': '0xC3515A2f66907646EBa48341BAFcE1c0Baa39888',
  'DepositManager': '0xFBfAdADE413CCF9a82C25bd57f8eAdaA66b992a7',
  'CoinageFactory': '0x98C6AcCB80683764B391384BF1f9E13e657eEaCa',
  'DaoVault': '0xd4CD470B741beec2AD119Ee72dD417D39b5DB544',
  'SeigManager': '0x6460432E08D6B823871699416b32F3838Be293b8',
  'PowerTON': '0x74fb331470E571d82CF567F5F0aF4553e3828A29',
  'DAOVault2': '0x01ac06FaF2B1B45b7a4eF77961Fcb893CbC4EcCA',
  'DAOAgendaManager': '0x22801F237C2876f19772cB8628439dfE3eAedeA3',
  'CandidateFactory': '0x2FA14FD77392b6AB6dAcE14a241c8792E74605Cf',
  'DAOCommittee': '0xE56c6Bc75648d854b06D8129cD0f016e6accB8ba',
  'DAOCommitteeProxy': '0xD0E5054258dBe60d5a03214882C4119fCeDdC150',
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
