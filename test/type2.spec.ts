import assert from 'assert';
import {ntlmParse} from '../src/index';
import {NTLMMessageType, NTLMType2} from '../src/ntlm/interfaces';

describe('NTLM TYpe 2 Unit Test', () => {
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
