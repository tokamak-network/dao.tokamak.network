// TODO: use test framework.

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const { getContracts } = require('./contracts.js');

const contracts = getContracts();
console.log(contracts);

const singleContract = getContracts('daoAgendaManager', web3);
console.log(singleContract);

const strangeContract = getContracts('stranger', web3);
console.log(strangeContract);
