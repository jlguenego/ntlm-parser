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
  flags: string;
  suppliedDomain?: SecurityBuffer;
  suppliedWorkstation?: SecurityBuffer;
  osVersionStructure?: OSVersionStructure;
  suppliedDomainData?: string;
  suppliedWorkstationData?: string;
}
