import assert from 'assert';
import {ntlmParse} from '../src/index';
import {NTLMMessageType, NTLMType2} from '../src/ntlm/interfaces';

describe('NTLM TYpe 2 Unit Test', () => {
  it('should NTLMT2 bas64', () => {
    const base64 =
      'TlRMTVNTUAACAAAABgAGADgAAAA1goniaaCGDXCRRNUAAAAAAAAAAIIAggA+AAAACgC6RwAAAA9KAEwARwACAAYASgBMAEcAAQAQAEMASABPAFUAQwBIAE8AVQAEABIAagBsAGcALgBsAG8AYwBhAGwAAwAkAGMAaABvAHUAYwBoAG8AdQAuAGoAbABnAC4AbABvAGMAYQBsAAUAEgBqAGwAZwAuAGwAbwBjAGEAbAAHAAgAQH6UJ9691gEAAAAA';
    const props = ntlmParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'CHALLENGE_MESSAGE (type 2)',
      targetNameSecBuf: {length: 6, allocated: 6, offset: 56},
      flags:
        'UNICODE NTLMSSP_REQUEST_TARGET SIGN SEAL NTLM ALWAYS_SIGN NTLMSSP_TARGET_TYPE_DOMAIN EXTENDED_SESSIONSECURITY TARGET_INFO VERSION 128 KEY_EXCH 56',
      challenge: '69a0860d709144d5',
      targetNameData: 'JLG',
      context: '0000000000000000',
      targetInfoSecBuf: {length: 130, allocated: 130, offset: 62},
      targetInfoData: [
        {type: 2, length: 6, content: 'JLG'},
        {type: 1, length: 16, content: 'CHOUCHOU'},
        {type: 4, length: 18, content: 'jlg.local'},
        {type: 3, length: 36, content: 'chouchou.jlg.local'},
        {type: 5, length: 18, content: 'jlg.local'},
        {type: 7, length: 8, content: '2020-11-18T19:08:09.844Z'},
        {type: 0, length: 0, content: ''},
      ],
      osVersionStructure: {
        majorVersion: 10,
        minorVersion: 0,
        buildNumber: 18362,
        unknown: 15,
      },
    } as NTLMType2);
  });

  it('should NTLMT2_hex', () => {
    const hex =
      '4e544c4d53535000020000000c000c003000000001028100' +
      '0123456789abcdef0000000000000000620062003c000000' +
      '44004f004d00410049004e0002000c0044004f004d004100' +
      '49004e0001000c0053004500520056004500520004001400' +
      '64006f006d00610069006e002e0063006f006d0003002200' +
      '7300650072007600650072002e0064006f006d0061006900' +
      '6e002e0063006f006d0000000000';
    const base64 = Buffer.from(hex, 'hex').toString('base64');
    const props = ntlmParse(base64);
    assert.deepStrictEqual(props, {
      messageType: NTLMMessageType.CHALLENGE_MESSAGE,
      flags: 'UNICODE NTLM NTLMSSP_TARGET_TYPE_DOMAIN TARGET_INFO',
      targetNameSecBuf: {
        length: 12,
        allocated: 12,
        offset: 48,
      },
      challenge: '0123456789abcdef',
      context: '0000000000000000',
      targetInfoSecBuf: {
        length: 98,
        allocated: 98,
        offset: 60,
      },
      targetNameData: 'DOMAIN',
      targetInfoData: [
        {type: 2, length: 12, content: 'DOMAIN'},
        {type: 1, length: 12, content: 'SERVER'},
        {type: 4, length: 20, content: 'domain.com'},
        {type: 3, length: 34, content: 'server.domain.com'},
        {type: 0, length: 0, content: ''},
      ],
    } as NTLMType2);
  });
});
