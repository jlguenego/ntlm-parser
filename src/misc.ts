// import dbg from 'debug';
import {Flag} from './interfaces';

// const debug = dbg('ntlm-parser');

export function toHex(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString('hex');
}

export function hex2a(hex: string) {
  let str = '';
  for (let i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

export function getFlags(flags: Flag[], value: number): string {
  const str = flags
    .filter(flag => value & flag.value)
    .map(flag => flag.label)
    .join(' ');
  return str;
}
