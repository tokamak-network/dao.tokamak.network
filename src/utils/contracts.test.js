// TODO: use test framework.

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const account = '0x62d4A3ba02649f849326a1c6Dce40dFB084c6713';

const { getContracts } = require('./contracts.js');

const contracts = getContracts(web3, account);
console.log(contracts);

const singleContract = getContracts(web3, account, 'daoAgendaManager');
console.log(singleContract);

const strangeContract = getContracts(web3, account, 'stranger');
console.log(strangeContract);
