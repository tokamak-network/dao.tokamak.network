import moment from 'moment';
import web3Utils from 'web3-utils';
import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');
const _WTON = createCurrency('WTON');

export function slice (str) {
  str = String(str);
  return str.slice(0, 6);
}

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
  return moment.utc(timestamp * 1000).local().format('MMM D, YYYY');
}

export function date2 (timestamp) {
  //return moment.utc(timestamp * 1000).local().format('MMM D, YYYY, HH:mm');
  //const _time = new Date(timestamp * 1000).toUTCString()
  let _time =new Date(timestamp * 1000).toString();
  //const _time = new Date(timestamp * 1000).toLocaleString() ;
  if(_time && _time.indexOf('(')) _time = _time.substring(0, _time.indexOf('('));
  return _time;
}

export function date3 (timestamp) {
  return moment.utc(timestamp * 1000).local().format('YYYY / MM / DD / HH:mm');
}

export function votingTime (agenda) {
  if (agenda.tNoticeEndTime * 1000 > new Date().getTime() || agenda.tVotingEndTime === 0) {
    return 'VOTING IS NOT STARTED';
  } else {
    const dDay = new Date(agenda.tVotingEndTime);
    const now = new Date();
    const gap = dDay.getTime() * 1000 - now.getTime();
    if (gap < 0) {
      return 'POLL ENDED';
    } else {
      const days = Math.floor(gap / (1000 * 60 * 60 * 24));
      const hours = Math.floor((gap - days * 86400000) / 3600000);

      return days + 'D ' + hours + 'H REMAINING';
    }
  }
}

export function fromNow (timestamp, suffix=false) {
  return moment.unix(timestamp).fromNow(suffix);
}

export function TON (amount) {
  if (!amount) amount = 0;
  const ton = _TON.wei(amount);
  const value = ton.toString();
  const length = value.length;

  return value.substring(0, length - 4);
}

export function WTON (amount) {
  if (!amount) amount = 0;
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
