import moment from 'moment';
import web3Utils from 'web3-utils';
import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');
const _WTON = createCurrency('WTON');

export function hexSlicer (address = '') {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function shortAddress (address = '') {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 6)}......`;
}

export function date1 (timestamp) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return monthNames[parseInt(month)] + ' ' + day + ', ' + year;
}

export function date2 (timestamp) {
  return moment.utc(timestamp*1000).local().format('MMM D, YYYY, HH:mm');
}

export function fromNow (timestamp, suffix=false) {
  return moment.unix(timestamp).fromNow(suffix);
}

export function TON (amount) {
  const ton = _TON.wei(amount);
  const value = ton.toString();
  const length = value.length;

  return value.substring(0, length - 4);
}

export function WTON (amount) {
  const wton = _WTON.ray(String(amount));
  const value = wton.toString();
  const length = value.length;

  return value.substring(0, length - 5);
}

export function marshalString (str) {
  if (str.slice(0, 2) === '0x') return str;
  return '0x'.concat(str);
}

export function unmarshalString (str) {
  if (str.slice(0, 2) === '0x') return str.slice(2);
  return str;
}

export function padLeft (str, characterAmount) {
  return web3Utils.padLeft(str, characterAmount);
}

export function toWei (amount) {
  if (!amount) return 0;
  return _TON(amount).toFixed('wei');
}

export function toRay (amount) {
  if (!amount) return 0;
  return _WTON(amount).toFixed('ray');
}

export function pad (n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
