const Web3 = require('web3');

const manager = require('../contracts/DAOAgendaManager.json');
const proxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');

const deployed = {
  'TON': '0xEfe15d914Bcaa0C924402769942d123f25Fa79A7',
  'WTON': '0xB0a5C780Fcb03ce3d38B0c7c89EF192648B7E4dB',
  'Layer2Registry': '0x94971616637f99E4905588E350ed2D8b1D7ACFC2',
  'DepositManager': '0x34e04ddb1d74E758021aF64cCb82C07B50A5bE74',
  'CoinageFactory': '0x215e03C034E0e986313D47d2e395e819FA187E88',
  'DaoVault': '0xF4005EAaa4C723DBE153533DC6EcaA4e98E14204',
  'SeigManager': '0x715a2c8007D83505dAA8231AeF67192A01F955dA',
  'PowerTON': '0x532Fd3b0502802eE4948A3bA12C70d128fC616E3',
  'DAOVault2': '0xf178889C83e6503aCcacAC62d5Dd1A41620C10E1',
  'DAOAgendaManager': '0xA31e96f4821130EB85216954f17D46AF78ACc093',
  'CandidateFactory': '0x4eE287F22b5462979CE9B3d7427A6562bF539b93',
  'DAOCommittee': '0x8728d39Ae13279A4ACC93d1713C03cfE7cedD446',
  'DAOCommitteeProxy': '0x791e587640d10d14e78a4E716d942E6531c59DB4',
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
