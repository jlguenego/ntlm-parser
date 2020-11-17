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
  messageType: string;
}

export interface NTLMType1 extends NTLMMessage {
  messageType: 'NTLM Type 1';
  flags: string;
  suppliedDomain?: SecurityBuffer;
  suppliedWorkstation?: SecurityBuffer;
  osVersionStructure?: OSVersionStructure;
  suppliedDomainData?: string;
  suppliedWorkstationData?: string;
}

export interface NTLMType2 extends NTLMMessage {
  messageType: 'NTLM Type 2';
  flags: string;
  suppliedDomain?: SecurityBuffer;
  suppliedWorkstation?: SecurityBuffer;
  osVersionStructure?: OSVersionStructure;
  suppliedDomainData?: string;
  suppliedWorkstationData?: string;
}
