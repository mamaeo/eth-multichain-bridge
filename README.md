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

## Brownie
Brownie è un tool basato sul linguaggio di programmazione Python che semplifica lo sviluppo e il testing di smart constracts per Ethereum.
```
pip3 install eth-brownie
```
NOTA: per avere maggiori informazioni sull'installazione di Brownie, consultare la documentazione https://eth-brownie.readthedocs.io/en/stable/install.html.
<br>

## Tunnelling
Provable richiede che i servizi siano pubblici mentre multichaindb non è pubblico, pertanto èà necessario esporre la porta attraverso un tunnel così da permetterle di essere raggiunta attraverso un url pubblico. Per fare ciò possiamo utilizzare l'utility offerta da `https://localtunnel.github.io/www/` rendendo accessibile la porta utilizzata dal servizio multichain per l'accesso alle API (porta 9984).
```
npm install -g localtunnel
lt --port 9984
```
