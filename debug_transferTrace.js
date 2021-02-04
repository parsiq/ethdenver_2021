const JsonRpc = require("node-jsonrpc-client");

const rpcClient = new JsonRpc("https://ethdenver-parsiq.net:2096/");
const blockNumberOrHash = "11744626"

rpcClient.call('debug_transferTrace', [blockNumberOrHash]).then(
    function success(result) {
        console.log("Response:", JSON.stringify(result, null, 8));
    },
    function failure(err) {
        console.error("Error code " + err.code + ": " + err.message);
    }
);
