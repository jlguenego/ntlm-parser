import {NTLMMessage} from '../ntlm/interfaces';

export class AbstractParser {
  constructor(protected buffer: ArrayBuffer) {}
  parse(): NTLMMessage {
    return {
      messageType: 'unknown (or not yet implemented)',
    };
  }
}
