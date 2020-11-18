// import dbg from 'debug';
import {AbstractParser} from './AbstractParser';

import {NTLMMessageType, NTLMType3} from '../ntlm/interfaces';

// const debug = dbg('node-expose-sspi:ntlm-parser');

export class NTLMType3Parser extends AbstractParser {
  constructor(buffer: ArrayBuffer) {
    super(buffer);
  }
  parse(): NTLMType3 {
    const result: NTLMType3 = {
      messageType: NTLMMessageType.AUTHENTICATE_MESSAGE,
    };

    return result;
  }
}
