const Web3 = require('web3');

const manager = require('../contracts/DAOAgendaManager.json');
const proxy = require('../contracts/DAOCommitteeProxy.json');
const committee = require('../contracts/DAOCommittee.json');
const deposit = require('../contracts/DepositManager.json');
const ton = require('../contracts/TON.json');

const deployed = {
  'TON': '0x0f44b55e6cDb2a068cFB720b7DDE609327820b22',
  'WTON': '0xaCF52733c8746761Fcf06D922048A6Fb46F98bA9',
  'Layer2Registry': '0x8865b3F27E0c07A98dc4ad23989461cBE9bd32db',
  'DepositManager': '0xa923ad9b00d13C1f71Af7786154A8aF597ea1ba1',
  'CoinageFactory': '0x99409d4d5593C5B9300e3685E8711Bd268411ABa',
  'DaoVault': '0x8029C97619Ef0b437D14aDff3e093b0383E935b6',
  'SeigManager': '0x49A32342726BcD769A2141df230B1D4f2CED0102',
  'PowerTON': '0x0713f81CDd1c9c82214995f888da45c0b6bF8114',
  'DAOVault2': '0x11D755d3A6fb4945dE68550AAbF47a852Ec3eb55',
  'DAOAgendaManager': '0xdF03CC7e2502Cbc3dF91795Ed054952a0974BA4d',
  'CandidateFactory': '0xDfd85cA63F466A6Ec946D7aBF23DeCF28fBFec41',
  'DAOCommittee': '0x5EEfdd208A38e51A2E0825d452785Ad525fdcc03',
  'DAOCommitteeProxy': '0xb52efEBd68c9633F7DF9d601bD1F4e285B041d7a',
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

  const contracts = {
    DAOAgendaManager,
    DAOCommitteeProxy,
    DAOCommittee,
    DepositManager,
    TON,
  };

  if (want) {
    return contracts.hasOwnProperty(want) ? contracts[want] : null; // eslint-disable-line
  } else {
    return contracts;
  }
};
