const { Netmask } = require ('netmask');
const ip_regex = require ('ip-regex');
const is_ip = require ('is-ip');
const { is_valid, parse, IPv4 } = require ('ipaddr.js');
// https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
const PRIVATE_IP_RANGES = [
    '0.0.0.0/8',
    '10.0.0.0/8',
    '100.64.0.0/10',
    '127.0.0.0/8',
    '169.254.0.0/16',
    '172.16.0.0/12',
    '192.0.0.0/24',
    '192.0.0.0/29',
    '192.0.0.8/32',
    '192.0.0.9/32',
    '192.0.0.10/32',
    '192.0.0.170/32',
    '192.0.0.171/32',
    '192.0.2.0/24',
    '192.31.196.0/24',
    '192.52.193.0/24',
    '192.88.99.0/24',
    '192.168.0.0/16',
    '192.175.48.0/24',
    '198.18.0.0/15',
    '198.51.100.0/24',
    '203.0.113.0/24',
    '240.0.0.0/4',
    '255.255.255.255/32',
    '224.0.0.0/24',
    '224.0.1.0/24',
    '224.1.0.0/16',
    '224.2.0.0/16',

]

const NETMASK_RANGES = PRIVATE_IP_RANGES.map(ip_range => new Netmask(ip_range))

function ipv4_check (ip) {
    for (let r of NETMASK_RANGES) {
        if (r.includes(ip)) return true;
    }
    return false;
}

export default (ip) => {
    if (is_valid(ip)) {
        const parsed = parse(ip);
        if (parsed.kind() === 'ipv4') return ipv4_check(parsed.toNormalizedString());
    }
    return undefined;
}