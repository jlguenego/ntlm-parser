// import dbg from 'debug';
import {AbstractParser} from './AbstractParser';
import {
  getOSVersionStructure,
  getSecBuf,
  getSecBufData,
} from '../ntlm/ntlm-utils';
import {getFlags} from '../misc';
import {NTLMMessageType, NTLMType1} from '../ntlm/interfaces';
import {ntlmFlags} from '../ntlm/flags';

// const debug = dbg('node-expose-sspi:ntlm-parser');

export class NTLMType1Parser extends AbstractParser {
  constructor(buffer: ArrayBuffer) {
    super(buffer);
  }
  parse(): NTLMType1 {
    const flag = new Uint32Array(this.buffer.slice(12, 16))[0];
    const result: NTLMType1 = {
      messageType: NTLMMessageType.NEGOTIATE_MESSAGE,
      flags: getFlags(ntlmFlags, flag),
    };

    if (this.buffer.byteLength === 16) {
      // NTLM version 1.
      return result;
    }
    result.suppliedDomain = getSecBuf(this.buffer, 16);
    result.suppliedWorkstation = getSecBuf(this.buffer, 24);

    if (result.suppliedDomain.offset !== 32) {
      // NTLM version 3: OS Version structure.
      result.osVersionStructure = getOSVersionStructure(this.buffer, 32);
    }

    result.suppliedDomainData = getSecBufData(
      this.buffer,
      result.suppliedDomain,
      'ascii'
    );
    result.suppliedWorkstationData = getSecBufData(
      this.buffer,
      result.suppliedWorkstation,
      'ascii'
    );

    return result;
  }
}
