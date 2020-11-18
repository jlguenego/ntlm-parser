// import dbg from 'debug';
import {AbstractParser} from './AbstractParser';

import {NTLMMessageType, NTLMType3} from '../ntlm/interfaces';
import {getSecBuf} from '../ntlm/ntlm-utils';
import {getFlags} from '../misc';
import {ntlmFlags} from '../ntlm/flags';

// const debug = dbg('node-expose-sspi:ntlm-parser');

export class NTLMType3Parser extends AbstractParser {
  constructor(buffer: ArrayBuffer) {
    super(buffer);
  }
  parse(): NTLMType3 {
    const lmResponse = getSecBuf(this.buffer, 12);
    const ntlmResponse = getSecBuf(this.buffer, 20);
    const targetName = getSecBuf(this.buffer, 28);
    const userName = getSecBuf(this.buffer, 36);
    const workstationName = getSecBuf(this.buffer, 44);
    const sessionKey = getSecBuf(this.buffer, 52);

    const flag = new Uint32Array(this.buffer.slice(60, 64))[0];

    const result: NTLMType3 = {
      messageType: NTLMMessageType.AUTHENTICATE_MESSAGE,
      lmResponse,
      ntlmResponse,
      targetName,
      userName,
      workstationName,
      sessionKey,
      flags: getFlags(ntlmFlags, flag),
    };

    return result;
  }
}
