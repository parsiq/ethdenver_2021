const JsonRpc = require("node-jsonrpc-client");

const rpcClient = new JsonRpc("https://ethdenver-parsiq.net:2096/");

getContractData("deploymentCode", '0x6f22b0e7be87f3cc989a8b94364c4d1fb72b460260fc4d283bf4a4639d3c661a');
getContractData("deployedCode", '0xfe2140ff62beeeba0798ebcef111d277693be59bea8a1f7bff8f9741ff3cd1ca');

function getContractData(name, contractHash) {
    rpcClient.call('eth_parsiqContractDataByHash', [contractHash]).then(
        function success(result) {
            console.log(name + ":", JSON.stringify(result, null, 8));
        },
        function failure(err) {
            console.error("Error code " + err.code + ": " + err.message);
        }
    );
}
