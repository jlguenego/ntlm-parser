# NTLM Parser

Parse base64 or hex NTLM messages.

Useful to better understand what's going on during a SPNEGO Negotiate NTLM authentication phase.

[![license](https://img.shields.io/badge/license-ISC-green.svg)](./LICENSE)
[![npm version](https://badge.fury.io/js/ntlm-parser.svg)](https://badge.fury.io/js/ntlm-parser)
[![sponsor](https://img.shields.io/badge/github-sponsor-blue.svg)](https://github.com/sponsors/jlguenego)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

## Install

Global:

```
npm i -g ntlm-parser
```

Local:

```
npm i ntlm-parser
```

## Usage

### Command line

```
ntlm-parser <message-base64>
ntlm-parser -x <message-hex>
```

Example:

Base64 message:

```
ntlm-parser TlRMTVNTUAABAAAAB4IIogAAAAAAAAAAAAAAAAAAAAAKALpHAAAADw==
```

Hex message:

```
ntlm-parser 4e544c4d53535000010000000732000006000600330000000b000b0028000000050093080000000f574f524b53544154494f4e444f4d41494e
```

### Javascript

```js
const {ntlmParse} = require('ntlm-parser');

const object = ntlmParse(base64);
console.log('object: ', object);
```

### Output

```
object:  {
  messageType: 'NEGOTIATE_MESSAGE (type 1)',
  flags: 'NEGOTIATE_UNICODE NEGOTIATE_OEM REQUEST_TARGET NEGOTIATE_NTLM NEGOTIATE_ALWAYS_SIGN NEGOTIATE_EXTENDED_SESSIONSECURITY NEGOTIATE_VERSION NEGOTIATE_128 NEGOTIATE_56',
  suppliedDomain: { length: 0, allocated: 0, offset: 0 },
  suppliedWorkstation: { length: 0, allocated: 0, offset: 0 },
  osVersionStructure: {
    majorVersion: 10,
    minorVersion: 0,
    buildNumber: 18362,
    unknown: 15
  },
  suppliedDomainData: '',
  suppliedWorkstationData: ''
}
```

### Typescript

This module already works with Typescript.

Same program as above:

```ts
import {ntlmParse} from 'ntlm-parser';

const object = ntlmParse(base64);
console.log('object: ', object);
```

## References

NTLM specification can be found for free on the Microsoft website at: https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-nlmp/b38c36ed-2804-4868-a9ff-8dd3182128e4

A more understandable document describing NTLM can also be found here: http://davenport.sourceforge.net/ntlm.html

## TODO

When I will have time:

- Building, or modifying NTLM message, not just parsing.

## Author

Made with :heart: by me, Jean-Louis GUENEGO <jlguenego@gmail.com> on my free time.
