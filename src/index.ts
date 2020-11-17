import {ParserFactory} from './parser/ParserFactory';
import {decode} from 'base64-arraybuffer';
import {NTLMMessage, NtlmParseOptions} from './ntlm/interfaces';

export function ntlmParse(
  str: string,
  opts?: Partial<NtlmParseOptions>
): NTLMMessage {
  const defaultOptions: NtlmParseOptions = {encoding: 'base64'};
  const options = {...defaultOptions, ...opts};
  if (options.encoding === 'hex') {
    str = Buffer.from(str, 'hex').toString('base64');
  }
  const buffer = decode(str);
  const parser = ParserFactory.instantiateFromContent(buffer);
  const object = parser.parse();
  return object;
}
