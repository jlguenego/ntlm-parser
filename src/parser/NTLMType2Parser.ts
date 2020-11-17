// import dbg from 'debug';
import {AbstractParser} from './AbstractParser';
import {getSecBuf} from '../ntlm/ntlm-utils';
import {getFlags} from '../misc';
import {NTLMMessageType, NTLMType2} from '../ntlm/interfaces';
import {ntlmFlags} from '../ntlm/flags';

// const debug = dbg('node-expose-sspi:ntlm-parser');

export class NTLMType2Parser extends AbstractParser {
  constructor(buffer: ArrayBuffer) {
    super(buffer);
  }
  parse(): NTLMType2 {
    const targetNameSecBuf = getSecBuf(this.buffer, 12);
    const flag = new Uint32Array(this.buffer.slice(20, 24))[0];
    const result: NTLMType2 = {
      messageType: NTLMMessageType.CHALLENGE_MESSAGE,
      targetNameSecBuf,
      flags: getFlags(ntlmFlags, flag).replace(/NTLMSSP_NEGOTIATE_/g, ''),
      challenge: Buffer.from(this.buffer.slice(24, 32)).toString('hex'),
    };

    if (targetNameSecBuf.offset !== 32) {
      // NTLM v2
      result.context = Buffer.from(this.buffer.slice(32, 40)).toString('hex');
    }

    return result;
  }
}
