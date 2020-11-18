import {
  LMResponseData,
  NTLMEncoding,
  NTLMResponseData,
  OSVersionStructure,
  SecurityBuffer,
  TargetInfo,
  TargetInfoSubBlock,
} from './interfaces';

export function getSecBuf(buffer: ArrayBuffer, offset: number): SecurityBuffer {
  const dataView = new DataView(buffer, offset);
  return {
    length: dataView.getInt16(0, true), // short little endian
    allocated: dataView.getInt16(2, true), // short little endian
    offset: dataView.getInt32(4, true), // long little endian
  };
}

export function getOSVersionStructure(
  buffer: ArrayBuffer,
  offset: number
): OSVersionStructure {
  const dataView = new DataView(buffer, offset);
  return {
    majorVersion: dataView.getInt8(0), // byte
    minorVersion: dataView.getInt8(1), // byte
    buildNumber: dataView.getInt16(2, true), // short little endian
    unknown: dataView.getInt32(4, false), // long
  };
}

export function getSecBufData(
  buffer: ArrayBuffer,
  secBuf: SecurityBuffer,
  encoding: NTLMEncoding
): string {
  const buf = buffer.slice(secBuf.offset, secBuf.offset + secBuf.length);
  return Buffer.from(buf).toString(encoding);
}

export function getNtlmEncoding(flag: number): NTLMEncoding {
  const unicode = 0x1; // NTLMSSP_NEGOTIATE_UNICODE
  if (flag | unicode) {
    return 'ucs2';
  }
  return 'utf8';
}

export function getTargetInfo(
  buffer: ArrayBuffer,
  secBuf: SecurityBuffer
): TargetInfo {
  const dataView = new DataView(buffer, secBuf.offset, secBuf.length);
  const result: TargetInfo = [];
  let offset = 0;
  while (offset < secBuf.length) {
    const type = dataView.getUint16(offset + 0, true);
    const length = dataView.getUint16(offset + 2, true);
    const item: TargetInfoSubBlock = {
      type,
      length,
      content: '',
    };
    if (type <= 5) {
      item.content = Buffer.from(
        buffer.slice(
          secBuf.offset + offset + 4,
          secBuf.offset + offset + 4 + length
        )
      ).toString('ucs2');
    }
    if (type === 7) {
      // filetime.
      const low = dataView.getUint32(offset + 4, true);
      const high = dataView.getUint32(offset + 8, true);
      const date = fileTimeToDate(high * 2 ** 32 + low);
      item.content = date.toISOString();
    }
    result.push(item);
    offset += 2 + 2 + length;
  }
  return result;
}

function fileTimeToDate(fileTime: number) {
  return new Date(fileTime / 10000 - 11644473600000);
}

export function getLmResponseData(
  buffer: ArrayBuffer,
  secBuf: SecurityBuffer
): LMResponseData {
  const buf = buffer.slice(secBuf.offset, secBuf.offset + secBuf.length);
  const str = Buffer.from(buf).toString('hex');
  return {hex: str};
}
export function getNtlmResponseData(
  buffer: ArrayBuffer,
  secBuf: SecurityBuffer
): NTLMResponseData {
  const buf = buffer.slice(secBuf.offset, secBuf.offset + secBuf.length);
  const str = Buffer.from(buf).toString('hex');
  return {hex: str};
}
