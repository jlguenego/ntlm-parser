import {Flag} from './interfaces';

export const ntlmFlags: Flag[] = [
  {label: 'NTLMSSP_NEGOTIATE_UNICODE', value: 0x1}, // A
  {label: 'NTLMSSP_NEGOTIATE_OEM', value: 0x2}, // B
  {label: 'NTLMSSP_REQUEST_TARGET', value: 0x4}, // C
  {label: 'R10', value: 0x8}, // r10 (0)

  {label: 'NTLMSSP_NEGOTIATE_SIGN', value: 0x10}, // D
  {label: 'NTLMSSP_NEGOTIATE_SEAL', value: 0x20}, // E
  {label: 'NTLMSSP_NEGOTIATE_DATAGRAM', value: 0x40}, // F
  {label: 'NTLMSSP_NEGOTIATE_LM_KEY', value: 0x80}, // G
  {label: 'R9', value: 0x100}, // r9 (0)
  {label: 'NTLMSSP_NEGOTIATE_NTLM', value: 0x200}, // H
  {label: 'R8', value: 0x400}, // r8 (0)
  {label: 'ANONYMOUS_J', value: 0x800}, // J
  {label: 'NTLMSSP_NEGOTIATE_OEM_DOMAIN_SUPPLIED', value: 0x1000}, // K
  {label: 'NTLMSSP_NEGOTIATE_OEM_WORKSTATION_SUPPLIED', value: 0x2000}, // L
  {label: 'R7', value: 0x4000}, // r7 (0)
  {label: 'NTLMSSP_NEGOTIATE_ALWAYS_SIGN', value: 0x8000}, // M
  {label: 'NTLMSSP_TARGET_TYPE_DOMAIN', value: 0x10000}, // N
  {label: 'NTLMSSP_TARGET_TYPE_SERVER', value: 0x20000}, // O
  {label: 'R6', value: 0x40000}, // r6 (0)
  {label: 'NTLMSSP_NEGOTIATE_EXTENDED_SESSIONSECURITY', value: 0x80000}, // P
  {label: 'NTLMSSP_NEGOTIATE_IDENTIFY', value: 0x100000}, // Q
  {label: 'R5', value: 0x200000}, // r5 (0)
  {label: 'NTLMSSP_REQUEST_NON_NT_SESSION_KEY', value: 0x400000}, // R
  {label: 'NTLMSSP_NEGOTIATE_TARGET_INFO', value: 0x800000}, // S
  {label: 'R4', value: 0x1000000}, // r4 (0)
  {label: 'NTLMSSP_NEGOTIATE_VERSION', value: 0x2000000}, // T
  {label: 'R3', value: 0x4000000}, // r3 (0)
  {label: 'R2', value: 0x8000000}, // r2 (0)
  {label: 'R1', value: 0x10000000}, // r1 (0)
  {label: 'NTLMSSP_NEGOTIATE_128', value: 0x20000000}, // U
  {label: 'NTLMSSP_NEGOTIATE_KEY_EXCH', value: 0x40000000}, // V
  {label: 'NTLMSSP_NEGOTIATE_56', value: 0x80000000}, // W
];
