import assert from 'assert';
import {ntlmParse} from '../src/index';
import {NTLMType1} from '../src/ntlm/interfaces';

describe('NTLM TYpe 1 Unit Test', () => {
  it('should parse NTLM type 1 message', () => {
    const base64 = 'TlRMTVNTUAABAAAAB4IIogAAAAAAAAAAAAAAAAAAAAAKALpHAAAADw==';
    const props = ntlmParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'NEGOTIATE_MESSAGE (type 1)',
      flags:
        'UNICODE OEM NTLMSSP_REQUEST_TARGET NTLM ALWAYS_SIGN EXTENDED_SESSIONSECURITY VERSION 128 56',
      suppliedDomain: {length: 0, allocated: 0, offset: 0},
      suppliedWorkstation: {length: 0, allocated: 0, offset: 0},
      osVersionStructure: {
        majorVersion: 10,
        minorVersion: 0,
        buildNumber: 18362,
        unknown: 15,
      },
      suppliedDomainData: '',
      suppliedWorkstationData: '',
    } as NTLMType1);
  });
  it('should NTLMT1_hex', () => {
    const hex =
      '4e544c4d53535000010000000732000006000600330000000b000b0028000000050093080000000f574f524b53544154494f4e444f4d41494e';
    const base64 = Buffer.from(hex, 'hex').toString('base64');
    const props = ntlmParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'NEGOTIATE_MESSAGE (type 1)',
      flags:
        'UNICODE OEM NTLMSSP_REQUEST_TARGET NTLM OEM_DOMAIN_SUPPLIED OEM_WORKSTATION_SUPPLIED',
      suppliedDomain: {length: 6, allocated: 6, offset: 51},
      suppliedWorkstation: {length: 11, allocated: 11, offset: 40},
      osVersionStructure: {
        majorVersion: 5,
        minorVersion: 0,
        buildNumber: 2195,
        unknown: 15,
      },
      suppliedDomainData: 'DOMAIN',
      suppliedWorkstationData: 'WORKSTATION',
    });
  });
});
