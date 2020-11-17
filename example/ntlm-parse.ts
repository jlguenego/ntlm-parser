import {ntlmParse} from '../src';

const hex =
  '4e544c4d53535000010000000732000006000600330000000b000b0028000000050093080000000f574f524b53544154494f4e444f4d41494e';

const object = ntlmParse(hex, {encoding: 'hex'});
console.log('object: ', object);
