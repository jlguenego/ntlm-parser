// import dbg from 'debug';
import {AbstractParser} from './AbstractParser';
import {
  getNtlmEncoding,
  getOSVersionStructure,
  getSecBuf,
  getSecBufData,
  getTargetInfo,
} from '../ntlm/ntlm-utils';
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
      flags: getFlags(ntlmFlags, flag),
      challenge: Buffer.from(this.buffer.slice(24, 32)).toString('hex'),
      targetNameData: getSecBufData(
        this.buffer,
        targetNameSecBuf,
        getNtlmEncoding(flag)
      ),
    };

    if (targetNameSecBuf.offset !== 32) {
      // NTLM v2
      result.context = Buffer.from(this.buffer.slice(32, 40)).toString('hex');
      result.targetInfoSecBuf = getSecBuf(this.buffer, 40);

      result.targetInfoData = getTargetInfo(
        this.buffer,
        result.targetInfoSecBuf
      );
    }

    if (targetNameSecBuf.offset !== 48) {
      // NTLM version 3: OS Version structure.
      result.osVersionStructure = getOSVersionStructure(this.buffer, 48);
    }

    return result;
  }
}
