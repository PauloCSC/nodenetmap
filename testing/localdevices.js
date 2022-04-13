const findDevs = require('local-devices');

const nameMap = "Actives devices";
let dateformat = null;
let totalMap = new Map();
let ipsDown = [];
let ipsNew = new Map();
let prevDevices = [];

function printLogs (down, up){
    // print ipsDown and print ipsUp
    if (down.length > 0 ) {
        console.log("Apagados");
        down.forEach(e => {
            console.log(e);
        });
    }
    if (up.size > 0) {
        console.log("Nuevos");
        for (const [key, value] of up) {
            console.log(`ip: ${key} - lastviewed: ${value}`);
            // console.(value);
        }
    } else {
        console.log("Inicio Clean");
    }
}

function printMap (map) {
    // process.stdout.write('\x1Bc');
    // console.clear();
    printLogs(ipsDown,ipsNew);
    if (map instanceof Map) {
        for (const [key, value] of map) {
            console.log(key);
            console.table(value);
            /*for (const dev of value) {
                console.table(dev);
            }*/
        }
    } else if (Array.isArray(map)) {
        console.log(nameMap);
        console.table(map);
    }
}

function parseDown (downArr,dateTime,state){
    let res = [];
    downArr.forEach(e => {
        res.push({ip:e.ip,timestamp:dateTime,status:state});
    })
    return res;
}

function parseNew (upArr, dateTime){
    let res = [];
    upArr.forEach(e => {
       res.push({ip:e.ip,timestamp:dateTime});
    });
    return res;
}

function checkDown (ipsDownDevices,downDevices){
    let diff = ipsDownDevices.filter( (e1) => !downDevices.find( (e2) => e1.ip === e2.ip && e1.status === e2.status ) );
    if (diff === []) return false;
    return diff;
}

function checkUp (ipsNewDevices) {
    let merge = ipsNewDevices.filter( (e1) => ipsDown.find( (e2) => e1.ip === e2.ip && e1.status === e2.status ) );
    let arrIndex = [];
    if (merge !== []) {
        merge.forEach(e => {arrIndex.push(ipsDown.findIndex(o => o.ip === e.ip))});
        arrIndex.forEach(i => {
            ipsDown[i].status = true;
        })
    }
}

function checkIPs(totalArray, dateTime){
    let actualDev = totalArray;
    // let sameActives = actualDev.filter(e => prevDevices.includes(e));
    // console.log(prevDevices);
    const downDevices = prevDevices.filter((page1) => !actualDev.find(page2 => page1.ip === page2.ip && page1.status === page2.status));
    const ipsDownDevices = parseDown(downDevices,dateTime,false);
    const toPushDown = checkDown(ipsDownDevices,downDevices);
    // console.log(toPushDown);
    if (toPushDown.length!==0) ipsDown.push(...toPushDown);
    // ipsDown.push(...downDevices);
    // console.log(`Apagados: \n${[...ipsDown]}`);
    // console.log(downDevices);
    // console.log("Prev Devices: ");
    // console.log(prevDevices);
    const newDevices = actualDev.filter((page1) => !prevDevices.find(page2 => page1.ip === page2.ip));
    const ipsNewDevices = parseNew(newDevices,dateTime);
    ipsNewDevices.forEach(e=>ipsNew.set(e.ip,e.timestamp))
    checkUp(ipsNewDevices);
    // ipsUp.push(...newDevices);
    // console.log(`Nuevos: \n${[...ipsUp]}`);
    // console.log(newDevices);
}

let flag = true;

setInterval(async function () {
    dateformat = new Date(new Date().getTime()).toLocaleString("es-MX");
    // if (flag) {
        // console.log(flag);
        await findDevs().then(devices => {
            process.stdout.write('\x1Bc');
            totalMap.set(nameMap,devices);
            checkIPs(totalMap.get(nameMap),dateformat);
            printMap(totalMap);
            prevDevices = devices;
        });
    //     flag = false;
    // } else {
    //     // console.log(flag);
    //     await findDevs().then(devices => {
    //         totalMap.set(nameMap,devices);
    //         checkIPs(totalMap.get(nameMap),dateformat);
    //         printMap(totalMap);
    //         prevDevices = devices;
    //     });
    // }
},2000);

/*
(async () => {

    await findDevs().then(devices => {
        totalMap.set("Active devices",devices);
    });

    printMap(totalMap);

})();

findDevs();*/
