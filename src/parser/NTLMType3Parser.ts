// import dbg from 'debug';
import {AbstractParser} from './AbstractParser';

import {NTLMMessageType, NTLMType3} from '../ntlm/interfaces';
import {getSecBuf} from '../ntlm/ntlm-utils';

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

    const result: NTLMType3 = {
      messageType: NTLMMessageType.AUTHENTICATE_MESSAGE,
      lmResponse,
      ntlmResponse,
      targetName,
      userName,
      workstationName,
    };

    return result;
  }
}
