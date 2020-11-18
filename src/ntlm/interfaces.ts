export interface Props {
  [key: string]: unknown;
}

export interface Flag {
  label: string;
  value: number;
}

export interface NtlmParseOptions {
  encoding: 'hex' | 'base64';
}

export enum NTLMMessageType {
  NEGOTIATE_MESSAGE = 'NEGOTIATE_MESSAGE (type 1)',
  CHALLENGE_MESSAGE = 'CHALLENGE_MESSAGE (type 2)',
  AUTHENTICATE_MESSAGE = 'NEGOTIATE_MESSAGE (type 3)',
  UNKNOWN = 'unknown (or not yet implemented)',
}

export interface SecurityBuffer {
  length: number;
  allocated: number;
  offset: number;
}

export type NTLMEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';

export interface OSVersionStructure {
  majorVersion: number;
  minorVersion: number;
  buildNumber: number;
  unknown: number;
}

export interface NTLMMessage {
  messageType: NTLMMessageType;
}

export interface NTLMType1 extends NTLMMessage {
  messageType: NTLMMessageType.NEGOTIATE_MESSAGE;
  flags: string;
  suppliedDomain?: SecurityBuffer;
  suppliedWorkstation?: SecurityBuffer;
  osVersionStructure?: OSVersionStructure;
  suppliedDomainData?: string;
  suppliedWorkstationData?: string;
}

export interface NTLMType2 extends NTLMMessage {
  messageType: NTLMMessageType.CHALLENGE_MESSAGE;
  targetNameSecBuf: SecurityBuffer;
  flags: string;
  challenge: string;
  context?: string;
  targetInfoSecBuf?: SecurityBuffer;
  osVersionStructure?: OSVersionStructure;
  targetNameData: string;
  targetInfoData?: TargetInfo;
}

export interface NTLMType3v1 extends NTLMMessage {
  messageType: NTLMMessageType.AUTHENTICATE_MESSAGE;
}

export type NTLMType3 = NTLMType3v1;

export type TargetInfo = Array<TargetInfoSubBlock>;

export interface TargetInfoSubBlock {
  type: number;
  length: number;
  content: string;
}
