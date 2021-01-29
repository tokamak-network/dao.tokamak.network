// TODO: use test framework.

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const { encoded, getContract } = require('./contracts.js');

const contracts = getContract();
console.log(contracts);

const singleContract = getContract('daoAgendaManager', web3);
console.log(singleContract);

const strangeContract = getContract('stranger', web3);
console.log(strangeContract);

const types = [
  'uint256',
  'bool',
  'address',
  'address[]',
  'bytes32',
  'string',
];

const uint256Values = [
  10, 20, 30,
];
const boolValues = [
  'true', 'True', 'false', 'False', '?',
];
const addressValues = [
  '0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39', 'Df08F82De32B8d460adbE8D72043E3a7e25A3B39', '0x',
];
const addressArrayValues = [
  '[0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39, 0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39]',
  '[0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39, Df08F82De32B8d460adbE8D72043E3a7e25A3B39, 0x]',
];

console.log('uint256');
uint256Values.forEach(value => console.log(encoded(types[0], value)));
console.log('bool');
boolValues.forEach(value => console.log(encoded(types[1], value)));
console.log('address');
addressValues.forEach(value => console.log(encoded(types[2], value)));
console.log('address[]');
addressArrayValues.forEach(value => console.log(encoded(types[3], value)));
