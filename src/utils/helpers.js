import moment from 'moment';
import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');
const _WTON = createCurrency('WTON');

export function hexSlicer (address = '') {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function date1 (timestamp) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return monthNames[parseInt(month)] + ' ' + day + ', ' + year;
}

export function fromNow (timestamp, suffix=false) {
  return moment.unix(timestamp).fromNow(suffix);
}

export function TON (amount) {
  const ton = _TON.wei(amount);
  const tonAmount = ton.toBigNumber().toString();

  const index = tonAmount.indexOf('.');
  return index > -1 ? `${tonAmount.slice(0, index + 3)}` : tonAmount + '.00';
}

export function WTON (amount) {
  const wton = _WTON.ray(amount);
  const wtonAmount = wton.toBigNumber().toString();

  const index = wtonAmount.indexOf('.');
  return index > -1 ? `${wtonAmount.slice(0, index + 3)}` : wtonAmount + '.00';
}
