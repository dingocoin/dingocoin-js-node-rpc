const assert = require("assert");
const rpc = require("../");

describe("rpc", () => {
  let rpcClient = null;
  it("Create RPC client using default cookie", () => {
    rpcClient = rpc.fromCookie();
  });
  it("Call getblockchaininfo", async () => {
    const info = await rpcClient.getBlockchainInfo();
    assert(info.blocks !== undefined);
  });
});
