
# Struttura del progetto

Ciascun progetto Brownie prevede le seguenti directory:

## **- contracts folder**
Questa directory contiene tutti i sorgenti dei contratti scritti per questo progetto. Ogni volta che Brownie viene eseguito, effettua una ricerca all'interno di questa directory alla ricerca di nuovi file o file modificati e, in presenza di uno o più di essi, procede alla loro compilazione nonchè inclusione all'interno del progetto.

## **- interfaces folder**
Questa directory contiene i file interfaccia che possono essere utilizzati dai contratti ma che non sono considerati come elementi primari del progetto. Aggiungere o modificare uno di questi file interfaccia determina una ricompilazione solo se questi sono richiesti da almeno uno dei contratti principali.

## **- scripts folder**
Questa interfaccia conterrà tutti i file python attraverso i quali accederemo ai contratti al fine di automatizzare alcuni task o interagire con gli stessi. Gli script possono essere eseguiti attraverso il comando:
```
brownie run
```