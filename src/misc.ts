// import dbg from 'debug';
import {Flag} from './ntlm/interfaces';

// const debug = dbg('ntlm-parser');

export function toHex(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString('hex');
}

export function getFlags(flags: Flag[], value: number): string {
  const str = flags
    .filter(flag => value & flag.value)
    .map(flag => flag.label)
    .join(' ');
  return str.replace(/NTLMSSP_NEGOTIATE_/g, '');
}

export function decode(base64: string): ArrayBuffer {
  const b = Buffer.from(base64, 'base64');
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}
