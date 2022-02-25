# eth-multichain-bridge

## Ethereum bridge
Per utilizzare i servizi offerti da Oraclize attraverso una blockchain privata, sarà necessario importare la seguente repository git all'interno della propria directory principale.
```
git clone https://github.com/oraclize/ethereum-bridge.git
cd ethereum-bridge
npm install
```
Oppure via npm
```
npm install -g ethereum-bridge
```
Per maggiori informazioni rimando alla consultazione della repository utilizzata. https://github.com/provable-things/ethereum-bridge.

## Tunnelling
Provable richiede che i servizi siano pubblici mentre multichaindb non è pubblico, pertanto è necessario esporre la porta attraverso un tunnel così da permetterle di essere raggiunta attraverso un url pubblico. Per fare ciò possiamo utilizzare l'utility offerta da `https://localtunnel.github.io/www/` rendendo accessibile la porta utilizzata dal servizio multichain per l'accesso alle API (porta 9984).
```
npm install -g localtunnel
lt --port 9984
```

## Testing
Per testare i contratti ed eseguire i test contenuti nell'omonima directory è sufficiente eseguire il comando:
```
make test -j3
