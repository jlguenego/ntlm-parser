import assert from 'assert';
import {ntlmParse} from '../src/index';
import {NTLMType3} from '../src/ntlm/interfaces';

describe('NTLM TYpe 3 Unit Test', () => {
  it('should NTLMT3_base64', () => {
    const base64 =
      'TlRMTVNTUAADAAAAGAAYAHQAAAAiASIBjAAAAAAAAABYAAAADAA' +
      'MAFgAAAAQABAAZAAAABAAEACuAQAANYKI4goAukcAAAAP1KMCwe' +
      'XeFIr6zmSmiHFWSWoAbABvAHUAaQBzAEMASABPAFUAQwBIAE8AV' +
      'QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC5/Vhnk2GTLD131k8c' +
      'NfZcAQEAAAAAAADSVClUh73WAX873ENT+QbPAAAAAAIABgBKAEw' +
      'ARwABABAAQwBIAE8AVQBDAEgATwBVAAQAEgBqAGwAZwAuAGwAbw' +
      'BjAGEAbAADACQAYwBoAG8AdQBjAGgAbwB1AC4AagBsAGcALgBsA' +
      'G8AYwBhAGwABQASAGoAbABnAC4AbABvAGMAYQBsAAcACADSVClU' +
      'h73WAQYABAACAAAACAAwADAAAAAAAAAAAQAAAAAgAAC4YcwjyK/' +
      'gKSgZikWqPXs8y5udtMrVNidXg4R7uFJFPgoAEAAAAAAAAAAAAA' +
      'AAAAAAAAAACQAcAEgAVABUAFAALwBsAG8AYwBhAGwAaABvAHMAd' +
      'AAAAAAAAAAAAAG7NbE8iPK1v5zqEu20+5Q=';
    const props = ntlmParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'NEGOTIATE_MESSAGE (type 3)',
      version: 3,
      lmResponse: {length: 24, allocated: 24, offset: 116},
      ntlmResponse: {length: 290, allocated: 290, offset: 140},
      targetName: {length: 0, allocated: 0, offset: 88},
      userName: {length: 12, allocated: 12, offset: 88},
      workstationName: {length: 16, allocated: 16, offset: 100},
      lmResponseData: {hex: '000000000000000000000000000000000000000000000000'},
      ntlmResponseData: {
        hex:
          'b9fd58679361932c3d77d64f1c35f65c0101000000000000d254295487' +
          'bdd6017f3bdc4353f906cf00000000020006004a004c00470001001000' +
          '430048004f005500430048004f005500040012006a006c0067002e006c' +
          '006f00630061006c0003002400630068006f007500630068006f007500' +
          '2e006a006c0067002e006c006f00630061006c00050012006a006c0067' +
          '002e006c006f00630061006c0007000800d254295487bdd60106000400' +
          '020000000800300030000000000000000100000000200000b861cc23c8' +
          'afe02928198a45aa3d7b3ccb9b9db4cad536275783847bb852453e0a00' +
          '10000000000000000000000000000000000009001c0048005400540050' +
          '002f006c006f00630061006c0068006f00730074000000000000000000',
      },
      targetNameData: '',
      userNameData: 'jlouis',
      workstationNameData: 'CHOUCHOU',
      sessionKey: {length: 16, allocated: 16, offset: 430},
      flags:
        'UNICODE NTLMSSP_REQUEST_TARGET SIGN SEAL NTLM ALWAYS_SIGN EXTENDED_SESSIONSECURITY TARGET_INFO VERSION 128 KEY_EXCH 56',
      osVersionStructure: {
        majorVersion: 10,
        minorVersion: 0,
        buildNumber: 18362,
        unknown: 15,
      },
    });
  });

  it('should NTLMT3_hex', () => {
    const hex =
      '4e544c4d5353500003000000180018006a00000018001800' +
      '820000000c000c0040000000080008004c00000016001600' +
      '54000000000000009a0000000102000044004f004d004100' +
      '49004e00750073006500720057004f0052004b0053005400' +
      '4100540049004f004e00c337cd5cbd44fc9782a667af6d42' +
      '7c6de67c20c2d3e77c5625a98c1c31e81847466b29b2df46' +
      '80f39958fb8c213a9cc6';
    const base64 = Buffer.from(hex, 'hex').toString('base64');
    const props = ntlmParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'NEGOTIATE_MESSAGE (type 3)',
      version: 2,
      lmResponse: {length: 24, allocated: 24, offset: 106},
      ntlmResponse: {length: 24, allocated: 24, offset: 130},
      targetName: {length: 12, allocated: 12, offset: 64},
      userName: {length: 8, allocated: 8, offset: 76},
      workstationName: {length: 22, allocated: 22, offset: 84},
      lmResponseData: {hex: 'c337cd5cbd44fc9782a667af6d427c6de67c20c2d3e77c56'},
      ntlmResponseData: {
        hex: '25a98c1c31e81847466b29b2df4680f39958fb8c213a9cc6',
      },
      targetNameData: 'DOMAIN',
      userNameData: 'user',
      workstationNameData: 'WORKSTATION',
      sessionKey: {length: 0, allocated: 0, offset: 154},
      flags: 'UNICODE NTLM',
    } as NTLMType3);
  });
});
