const arp = require("@network-utils/arp-lookup");
const is_ip_private = require('private-ip');

function delay(t, val) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val);
        }, t);
    });
}

function filterBroadcastIP(arpTable){
    let res = [];
    arpTable.forEach(e => {
        if (!is_ip_private(e.ip)) { res.push(e) }
        else { console.log (e)}
    });
    return res;
}

(async () => {
    const arpTable = await arp.getTable();
    // console.log(arpTable);
    // console.log("--------------------")
    console.log(filterBroadcastIP(arpTable));
    await delay(1000);
})();