import {ParserFactory} from './parser/ParserFactory';
import {decode} from 'base64-arraybuffer';
import {NTLMMessage} from './ntlm/interfaces';

export function ntlmParse(base64: string): NTLMMessage {
  const buffer = decode(base64);
  const parser = ParserFactory.instantiateFromContent(buffer);
  const object = parser.parse();
  return object;
}
