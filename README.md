# eth-multichain-bridge

## Truffle suite & Ganache
Truffle è uno strumento che permette di sviluppare smart contract ed interagire con essi, attraverso una console dedicata o attraverso degli script javascript.
E' uno strumento estremamente versatile che permette di semplificare gli aspetti più tediosi dello sviluppo di contratti ethereum.
Ganache invece è un tool che mette a disposizione una blockchain Ethereum in pochi semplicissimi step, grazie alla quale sarà poi possibile eseguire, testare e ispezionare gli smart contract sviluppati e come questi interagiscono all'interno della catena.
Per scaricare truffle suite (verrà installato anche ganache essendo una dipendenza di truffle) è sufficiente digitare il comando:
```
npm -g install truffle
```
Per maggiori informazioni rimando alla consultazione del https://trufflesuite.com/docs/index.html

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

## Esecuzione e Testing
I tool precedentemente citati vengono installati autonomamente durante l'esecuzione del comando make.
Per eseguire i contratti ed effettuare i test contenuti nell'omonima directory è sufficiente eseguire il comando:
```
make test -j3
