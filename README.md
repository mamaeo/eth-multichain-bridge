# eth-multichain-bridge

## Descrizione
In questa sezione svilupperemo un bridge (collegamento) tra ethereum e multichaindb utilizzando un oracle.
Tale collegamento potrà essere utilizzato per sviluppare smart contracts accedendo direttamente alle informazioni
contenute nel database decentralizzato.
Entrambe le piattaforme saranno private, per questo sarà necessario prestare attenzione a come verrà predisposto
l'ambiente di sviluppo
## Installazione
Prima di preparare l'ambiente di sviluppo è necessario assicurarsi di avere già installato una versione recente di python
(si consiglia almento la versione 3.6) oltre ad una versione recente di un package manager per javascript (npm). 
E' richiesto inoltre una conoscenza base sulle blockchains, smart contracts e i principi di
funzionamento di un oracle.

Una volta verificati i requisiti possiamo cominciare a preparare l'ambiente di sviluppo, iniziando da Brownie, un tool
basato sul linguaggio di programmazione Python che semplifica lo sviluppo e il testing di smart constracts
per Ethereum. Prima di procedere assicuratevi di creare una directory vuota all'interno della vostra directory principale, successivamente installate il tool attraverso il package installer (pip3) di python:
```
mkdir project
cd project
pip3 install eth-brownie
brownie init
```
NOTA: per avere maggiori informazioni sull'installazione di Brownie, consultare la documentazione https://eth-brownie.readthedocs.io/en/stable/install.html 


