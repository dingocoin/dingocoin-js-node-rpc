# dingocoin-js-node-rpc
RPC wrapper library to communicate with a Dingocoin daemon.

## Installation
`npm install @dingocoin-js/node-rpc`

## Usage
```
// Import package.
const nodeRpc = require('@dingocoin-js/node-rpc');


// Create client using default cookie path (~/.dingocoin/.cookie).
const client = nodeRpc.fromCookie();

// Create client specifying cookie path.
const client = nodeRpc.fromCookie('/path/to/cookie');

// Create client specifying username and password, and using default port (34646).
const client = nodeRpc.fromCredentials('ausername', 'somepassword');

// Create client specifying username, password, and port.
const client = nodeRpc.fromCredentials('ausername', 'somepassword', 3000);


// Call daemon method through RPC.
await client.getBlockchainInfo();

// Method name is case-insensitive, so these work too.
await client.getblockchaininfo();
await client.GETBLOCKCHAININFO();
await client.gEtBlOcKcHAiNiNfO();

// Call method with arguments.
await client.getBlock("594a42d8fe16382085dc982135df72cf8fcea12d34e6efd566e2f9e442e2136f");
```

## Notes
#### Auto-conversion to RPC calls
This library utilizes modern JavaScript [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 
and [variadic arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) to convert function calls
in JavaScript to RPC calls. The name of the function called is converted into lower-case, and is passed with the rest of the parameters to the
Dingocoin daemon's RPC port. This keeps the library ultra-lightweight and future-proofed, as we do not need to hardcode all existing Dingocoin commands.

#### Converting currency values as strings.
This library returns currency amounts as strings. The original responses from the Dingocoin daemon represent currency amounts as floats - however, 
these are often truncated by JavaScript, whose numeric type has limited precision. To prevent this from causing any unexpected behavior, we automatically
convert and return the amounts as strings.

## Testing (mocha)
`npm test`

## Contributing
Please create a PR or drop a message in our community.

## Community
- [Dev forum](https://dev.dingocoin.org)
- [General Discord](https://discord.gg/y3J946HFQM)
- [Other channels](https://dingocoin.org/community)
