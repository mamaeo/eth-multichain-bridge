# eth-multichain-bridge

<<<<<<< HEAD
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
=======
## Descrizione
Questa repository contiene il codice necessario a sviluppare ed utilizzare un bridge (collegamento) tra ethereum e multichaindb utilizzando un oracle.
Tale collegamento potrà essere utilizzato per sviluppare smart contracts accedendo direttamente alle informazioni
contenute nel database decentralizzato.
Entrambe le piattaforme saranno private, per questo sarà necessario prestare attenzione a come verrà predisposto
l'ambiente di sviluppo
## Installazione
Prima di preparare l'ambiente è necessario assicurarsi di avere già installato una versione recente di python
(si consiglia almento la versione 3.6) oltre ad una versione recente del package manager di javascript (npm). 

Una volta verificati i requisiti è possibile procedere con la preparazione dell'ambiente di sviluppo richiesto, iniziando da Brownie, un tool
basato sul linguaggio di programmazione Python che semplifica lo sviluppo e il testing di smart constracts
per Ethereum. E' necessario creare una directory vuota all'interno della directory principale, richiesta dal tool per l'inizializzazione della struttura del progetto.
>>>>>>> 1a2222f77a54db8bd8f06009a9557ae2d96e0774
```
pip3 install eth-brownie
```
NOTA: per avere maggiori informazioni sull'installazione di Brownie, consultare la documentazione https://eth-brownie.readthedocs.io/en/stable/install.html.