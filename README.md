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
### Documentation for all available methods
The list of all available methods can be retrieved by running `dingocoin-cli help`. To retrieve detailed instructions for individual methods, run e.g. `dingocoin-cli help getblock`.

For convenience, below is a list of all available methods.
<details>
  <summary>Dingocoin Core v1.16.0.4</summary>
  
  ```
  == Blockchain ==
getbestblockhash
getblock "blockhash" ( verbose )
getblockchaininfo
getblockcount
getblockhash height
getblockheader "hash" ( verbose )
getchaintips
getdifficulty
getmempoolancestors txid (verbose)
getmempooldescendants txid (verbose)
getmempoolentry txid
getmempoolinfo
getrawmempool ( verbose )
gettxout "txid" n ( include_mempool )
gettxoutproof ["txid",...] ( blockhash )
gettxoutsetinfo
preciousblock "blockhash"
pruneblockchain
verifychain ( checklevel nblocks )
verifytxoutproof "proof"

== Control ==
getinfo
getmemoryinfo
help ( "command" )
stop

== Generating ==
generate nblocks ( maxtries )
generatetoaddress nblocks address (maxtries)

== Mining ==
getauxblock (hash auxpow)
getblocktemplate ( TemplateRequest )
getmininginfo
getnetworkhashps ( nblocks height )
prioritisetransaction <txid> <priority delta> <fee delta>
submitblock "hexdata" ( "jsonparametersobject" )

== Network ==
addnode "node" "add|remove|onetry"
clearbanned
disconnectnode "address"
getaddednodeinfo ( "node" )
getconnectioncount
getnettotals
getnetworkinfo
getpeerinfo
listbanned
ping
setban "subnet" "add|remove" (bantime) (absolute)
setnetworkactive true|false

== Rawtransactions ==
createrawtransaction [{"txid":"id","vout":n},...] {"address":amount,"data":"hex",...} ( locktime )
decoderawtransaction "hexstring"
decodescript "hexstring"
fundrawtransaction "hexstring" ( options )
getrawtransaction "txid" ( verbose )
sendrawtransaction "hexstring" ( allowhighfees )
signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )

== Util ==
createmultisig nrequired ["key",...]
estimatefee nblocks
estimatepriority nblocks
estimatesmartfee nblocks
estimatesmartpriority nblocks
signmessagewithprivkey "privkey" "message"
validateaddress "address"
verifymessage "address" "signature" "message"

== Wallet ==
abandontransaction "txid"
addmultisigaddress nrequired ["key",...] ( "account" )
addwitnessaddress "address"
backupwallet "destination"
bumpfee "txid" ( options )
dumpprivkey "address"
dumpwallet "filename"
encryptwallet "passphrase"
getaccount "address"
getaccountaddress "account"
getaddressesbyaccount "account"
getbalance ( "account" minconf include_watchonly )
getnewaddress ( "account" )
getrawchangeaddress
getreceivedbyaccount "account" ( minconf )
getreceivedbyaddress "address" ( minconf )
gettransaction "txid" ( include_watchonly )
getunconfirmedbalance
getwalletinfo
importaddress "address" ( "label" rescan p2sh )
importmulti "requests" "options"
importprivkey "bitcoinprivkey" ( "label" ) ( rescan )
importprunedfunds
importpubkey "pubkey" ( "label" rescan )
importwallet "filename"
keypoolrefill ( newsize )
listaccounts ( minconf include_watchonly)
listaddressgroupings
listlockunspent
listreceivedbyaccount ( minconf include_empty include_watchonly)
listreceivedbyaddress ( minconf include_empty include_watchonly)
listsinceblock ( "blockhash" target_confirmations include_watchonly)
listtransactions ( "account" count skip include_watchonly)
listunspent ( minconf maxconf  ["addresses",...] [include_unsafe] [query_options])
lockunspent unlock ([{"txid":"txid","vout":n},...])
move "fromaccount" "toaccount" amount ( minconf "comment" )
removeprunedfunds "txid"
sendfrom "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )
sendmany "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] )
sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount )
setaccount "address" "account"
settxfee amount
signmessage "address" "message"
  ```
</details>

### Auto-conversion to RPC calls
This library utilizes modern JavaScript [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 
and [variadic arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) to convert function calls
in JavaScript to RPC calls. The name of the function called is converted into lower-case, and is passed with the rest of the parameters to the
Dingocoin daemon's RPC port. This keeps the library ultra-lightweight and future-proofed, as we do not need to hardcode all existing Dingocoin commands.

### Converting currency values as strings.
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
