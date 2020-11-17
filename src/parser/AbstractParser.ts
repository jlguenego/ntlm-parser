import {NTLMMessage, NTLMMessageType} from '../ntlm/interfaces';

export class AbstractParser {
  constructor(protected buffer: ArrayBuffer) {}
  parse(): NTLMMessage {
    return {
      messageType: NTLMMessageType.UNKNOWN,
    };
  }
}
