const Web3 = require('web3');

const manager = require('../contracts/DAOAgendaManager.json');
const proxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');

const deployed = {
  'TON'              : '0x8AE57549880d13D81295F0Acb1EDFA6910087E14',
  'WTON'             : '0x1d35a9ac97f8ae430f3A361F70296fe549d947B5',
  'Layer2Registry'   : '0xA57D3dc7c7F05269F65bF73B9bb5e291712Bada9',
  'DepositManager'   : '0xd69E04AF075300bF6C8468dED8170F6dFa84F1Ef',
  'CoinageFactory'   : '0xB1551155D98E799258E5405e8152d8EBF37c615E',
  'DaoVault'         : '0x95F915908eF6128f2dC747271E5FB16fd3f2397E',
  'SeigManager'      : '0x53440df24DF7A99dBd1f121d26153368AE09e781',
  'PowerTON'         : '0x37baE31351616F14d451915dC07E85a5A4A8de64',
  'DAOVault2'        : '0x94cad8DB5b44bCEd4621299E3605129318802ef8',
  'DAOAgendaManager' : '0x616C08d08450C11CF3CBfA8565ca5a73A11d3e55',
  'CandidateFactory' : '0x67B51fa5B0a58AA8c49239751456c112A1F6554d',
  'DAOCommittee'     : '0x2C019b66d41998388e83E7dcc5BA32F565B691cA',
  'DAOCommitteeProxy': '0xDa82db146327fafb4837DB8c23aC17fd7d4E2e1F',
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
