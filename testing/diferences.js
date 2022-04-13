/*let ipsDown = [];
let ipsUp = [];

let prevDevices = [

];

let ActDevices = [
    { name: '?', ip: '192.168.26.129', mac: '00:0c:29:a1:5f:66' },
    { name: '?', ip: '192.168.1.34', mac: '8e:66:b5:03:11:9b' },
    { name: '?', ip: '192.168.1.38', mac: '60:ab:67:d6:ab:14' },
    { name: '?', ip: '192.168.1.40', mac: '3e:95:a7:89:4a:16' }
];

function checkIPs(){
    // let actualDev = totalMap.get(nameMap);
    // let sameActives = actualDev.filter(e => prevDevices.includes(e));
    let downDevices = [...prevDevices].filter(e => ActDevices.indexOf(e) === -1);
    ipsDown.push(...downDevices);
    console.log(downDevices);
    let newDevices = [...ActDevices].filter(e => prevDevices.indexOf(e) === -1);
    ipsUp.push(...newDevices);
    console.log(newDevices);
}

checkIPs();
prevDevices = ActDevices;
ActDevices = [
    { name: '?', ip: '192.168.26.129', mac: '00:0c:29:a1:5f:66' },
    { name: '?', ip: '192.168.1.34', mac: '8e:66:b5:03:11:9b' },
    { name: '?', ip: '192.168.1.38', mac: '60:ab:67:d6:ab:14' },
    { name: '?', ip: '192.168.1.40', mac: '3e:95:a7:89:4a:16' },
    { name: '?', ip: '192.168.1.41', mac: '3e:95:a7:89:4a:17' }
];
checkIPs();*/
// checkIPs();
const differenceBy = require('lodash/differenceBy')

const arr1 = [
    { name: '?', ip: '192.168.26.129', mac: '00:0c:29:a1:5f:66' },
    { name: '?', ip: '192.168.1.34', mac: '8e:66:b5:03:11:9b' },
    { name: '?', ip: '192.168.1.38', mac: '60:ab:67:d6:ab:14' },
    { name: '?', ip: '192.168.1.40', mac: '3e:95:a7:89:4a:16' },
    { name: '?', ip: '192.168.1.41', mac: '3e:95:a7:89:4a:17' }
]

const arr2 = [
    { name: '?', ip: '192.168.26.129', mac: '00:0c:29:a1:5f:66' },
    { name: '?', ip: '192.168.1.34', mac: '8e:66:b5:03:11:9b' },
    { name: '?', ip: '192.168.1.38', mac: '60:ab:67:d6:ab:14' },
    // { name: '?', ip: '192.168.1.40', mac: '3e:95:a7:89:4a:16' }
]

let a = ['algo'];
if (a.length!==0) console.log(a);

// Using Find Method
/*const res1 = arr1.filter((page1) => !arr2.find(page2 => page1.ip === page2.ip))
const res2 = [];
res2.push(res1.p);
console.log(res2);*/


// // Using Some Method
// const res2 = arr2.filter((page1) => !arr1.some(page2 => page1.url === page2.url ))
// console.log(res2)
//
//
// // Using Map
// const map = {};
// for(const page of arr1){
//     map[page.url] = true;
// }
// const res3 = arr2.filter(page => !map[page.url]);
// console.log(res3)
//
//
// // Using Lodash Library
// const res4 = differenceBy(arr2, arr1, 'url')
// console.log(res4)
