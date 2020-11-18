// import dbg from 'debug';
import {AbstractParser} from './AbstractParser';

import {
  NTLMMessageType,
  NTLMType3,
  NTLMType3v2,
  NTLMType3v3,
} from '../ntlm/interfaces';
import {
  getLmResponseData,
  getNtlmEncoding,
  getNtlmResponseData,
  getOSVersionStructure,
  getSecBuf,
  getSecBufData,
} from '../ntlm/ntlm-utils';
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

    const flag = new Uint32Array(this.buffer.slice(60, 64))[0];
    const encoding = getNtlmEncoding(flag);

    const lmResponseData = getLmResponseData(this.buffer, lmResponse);
    const ntlmResponseData = getNtlmResponseData(this.buffer, ntlmResponse);
    const targetNameData = getSecBufData(this.buffer, targetName, encoding);
    const userNameData = getSecBufData(this.buffer, userName, encoding);
    const workstationNameData = getSecBufData(
      this.buffer,
      workstationName,
      encoding
    );

    const result: NTLMType3 = {
      messageType: NTLMMessageType.AUTHENTICATE_MESSAGE,
      version: 1,
      lmResponse,
      ntlmResponse,
      targetName,
      userName,
      workstationName,
      lmResponseData,
      ntlmResponseData,
      targetNameData,
      userNameData,
      workstationNameData,
    };

    const firstOffset = Math.min(
      ...[lmResponse, ntlmResponse, targetName, userName, workstationName].map(
        s => s.offset
      )
    );

    if (firstOffset !== 52) {
      // NTLM version 2
      const r2 = result as NTLMType3v2;
      r2.version = 2;
      const sessionKey = getSecBuf(this.buffer, 52);
      r2.sessionKey = sessionKey;
      r2.flags = getFlags(ntlmFlags, flag);

      if (firstOffset !== 64) {
        // NTLM version 3
        const r3 = result as NTLMType3v3;
        r3.version = 3;
        r3.osVersionStructure = getOSVersionStructure(this.buffer, 64);
      }
    }

    return result;
  }
}
