import {NTLMMessage} from './ntlm/interfaces';
import {program} from 'commander';
import {ntlmParse} from '.';
import {version} from '../package.json';

export function ntlmParseFromCmdLine(): NTLMMessage {
  program
    .version(version)
    .arguments('<message>')
    .option('-x, --hex', 'accept hex string (base64 is default)')
    .description('Parse an NTLM message', {
      message: 'base64 NTLM message',
    });

  program.parse(process.argv);
  const encoding = program.hex ? 'hex' : 'base64';
  if (!program.args[0]) {
    console.log('<message> missing.');
    program.help();
  }
  return ntlmParse(program.args[0], {encoding});
}
