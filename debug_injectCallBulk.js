const JsonRpc = require("node-jsonrpc-client");

const rpcClient = new JsonRpc("https://ethdenver-parsiq.net:2096/");
const blockNumberOrHash = "11744626"

let txArr = [
    {
        txIndex: 159, // transaction index
        levels: [
            {
                gasTimeStamp: 21400, // execute injection at gas level >= 21400
                code: '600360095260206009F3', //EVM byte code for injection PUSH:3+MSTORE+RETURN
                credit: 1000 // top-up 1000 (tx gasLimit + 1000) elements of gas. Allow 0 value
            },
            {
                gasTimeStamp: 0, // 0 - run injection before transaction execution
                code: '73' + '82b364aebe0fd12c8a8ddfc4176d60af6093483b' + '3160095260206009F3', //get balance of any address(BALANCE+MSTORE+RETURN)
                credit: 0
            }
        ]
    }
]

rpcClient.call('debug_injectCallBulk', [blockNumberOrHash, JSON.stringify(txArr)]).then(
    function success(result) {
        console.log("Response:", JSON.stringify(result, null, 8));
    },
    function failure(err) {
        console.error("Error code " + err.code + ": " + err.message);
    }
);
