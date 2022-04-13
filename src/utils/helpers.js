import moment from 'moment';
import web3Utils from 'web3-utils';
import { ethers } from 'ethers';
const formatUnits = ethers.utils.formatUnits;
const parseUnits = ethers.utils.parseUnits;
const commify = ethers.utils.commify;
const BigNumber = ethers.BigNumber;

import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');
const _WTON = createCurrency('WTON');

export function slice (str) {
  str = String(str);
  return str.slice(0, 6);
}

export function nameSlice (str) {
  str = String(str);
  if (str.length > 10) {
    return `${str.slice(0, 8)}...`;
  }
  return str;
}

export function tonFloor (input) {
  if (input != null && input.length > 0) {
    const pointPosition = input.indexOf('.');
    let rounds = input.split('');
    rounds = rounds.map((e, idx) => {
      if (idx < pointPosition + 3) return e;
      else return '';
    });
    return rounds.join('') + ' TON';
  }
  else return '0.0 TON';
}

export function hexSlicer (address = '') {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function hexSlicer2 (address = '') {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 6)}...`;
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
  return moment.utc(timestamp * 1000).local().format('MMM D, YYYY, HH:mm');
  /*
  const _timeUtc = new Date(timestamp * 1000).toUTCString()
  let _time =new Date(timestamp * 1000).toString();
  //const _time = new Date(timestamp * 1000).toLocaleString() ;
  //if(_time && _time.indexOf('(')) _time = _time.substring(0, _time.indexOf('('));
  return _time; */
}

export function date3 (timestamp) {
  if (!timestamp) return '';
  return moment.utc(timestamp * 1000).local().format('YYYY / MM / DD / HH:mm');
}

export function date4 (timestamp) {
  if (!timestamp) return '';
  return moment.utc(timestamp * 1000).local().format('MMM, DD');
}

export function votingTime (agenda) {
  if (!agenda.tNoticeEndTime) return '';
  if (agenda.tNoticeEndTime * 1000 > new Date().getTime() || agenda.tVotingEndTime === 0) {
    return 'VOTING IS NOT STARTED';
  } else {
    const dDay = new Date(agenda.tVotingEndTime);
    const now = new Date();
    const gap = dDay.getTime() * 1000 - now.getTime();
    if (gap < 0) {
      return 'POLL ENDED';
    } else {
      return 'VOTING IS STARTED';
      // const days = Math.floor(gap / (1000 * 60 * 60 * 24));
      // const hours = Math.floor((gap - days * 86400000) / 3600000);

      // return days + 'D ' + hours + 'H REMAINING';
    }
  }
}

export function agendaStatus (status) {
  switch (status) {
  case 0:
    return 'NONE';
  case 1:
    return 'NOTICE';
  case 2:
    return 'VOTING';
  case 3:
    return 'WAITING_EXEC';
  case 4:
    return 'EXECUTED';
  case 5:
    return 'ENDED';
  default:
    console.log('bug', 'no agenda status'); // eslint-disable-line
    return '';
  }
}

export function agendaStatusNumber (status) {
  switch (status) {
  case 'NONE':
    return 1;
  case 'NOTICE':
    return 2;
  case 'VOTING':
    return 3;
  case 'WAITING_EXEC':
    return 4;
  case 'EXECUTED':
    return 5;
  case 'ENDED':
    return 6;
  default:
    console.log('bug', 'no agenda status'); // eslint-disable-line
    return '';
  }
}

export function agendaResult (result) {
  switch (result) {
  case 0:
    return 'PENDING';
  case 1:
    return 'ACCEPT';
  case 2:
    return 'REJECT';
  case 3:
    return 'DISMISS';
  default:
    console.log('bug', 'no agenda status'); // eslint-disable-line
    return '';
  }
}

export function agendaResultNumber (result) {
  switch (result) {
  case 'PENDING':
    return 0;
  case 'ACCEPT':
    return 1;
  case 'REJECT':
    return 3;
  case 'DISMISS':
    return 4;
  default:
    console.log('bug', 'no agenda status'); // eslint-disable-line
    return '';
  }
}

export function fromNow (timestamp, suffix = false) {
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

// version 2 uses `ethers` library.
export function toWei2 (amount) {
  return parseUnits(String(amount), '18');
}

export function toRay2 (amount) {
  return parseUnits(String(amount), '27');
}

export function fromWei2 (amount) {
  const amountBN = BigNumber.from(amount);
  return commify(formatUnits(amountBN, 18));
}

export function fromRay2 (amount) {
  const amountBN = BigNumber.from(amount);
  return commify(formatUnits(amountBN, 27));
}

export function pad (n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function withComma (n) {
  try {
    n = parseFloat(n);
  } catch (err) {
    if (err) console.log('bug', 'parse float'); // eslint-disable-line
  }

  return n.toLocaleString('en-US', { minimumFractionDigits: 2 });
}

export function truncate (str, maxDecimalDigits) {
  if (str.includes('.')) {
    const parts = str.split('.'); // [ '1,234', '999999999999999999999999999' ]

    const l = maxDecimalDigits - parts[1].length > 0 ? maxDecimalDigits - parts[1].length : 0;
    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits) + '0'.repeat(l);
  }
  return str;
}
