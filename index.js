
const localtunnel = require('localtunnel');
const fs = require('fs');

var tunnel;

// Open local tunneling 
const getLocalTunnel = async() => {
    if (tunnel === undefined) {
        // Open tunnel
        tunnel = await localtunnel({ port: 9984 })
        console.log('Il tuo url pubblico è il seguente: ' + tunnel.url);
        fs.writeFileSync('output.json', 
            JSON.stringify({'localUrl': tunnel.url}), 'utf-8');
    }
};


const loop = async() => {
    while (true) {
        await getLocalTunnel();
    }
}

// Infinite loop 
// required in order to maintain local tunnel open
loop()