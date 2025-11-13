# Payment Cloud Domain Builder

<p align="center">
  <img src="docs/images/logo.png" width="500" alt="Logo"/>
</p>

## Descrizione

Payment Cloud Domain Builder è un'applicazione che permette di definire nuovi domini applicativi in modo semplificato. 
L'applicazione fornisce un'interfaccia utente intuitiva per gestire la configurazione dei domini e  successivamente crea il branch con il nuovo dominio, per revisione e creazione PR.

## Funzionalità

### Quick start

#### Selezione template
Dalla pagina principale, cliccando sul bottone _**Quick start**_ è possibile selezionare un template da caricare per definire rapidamente un nuovo dominio. Sarà poi possibile modificare i parametri caricati, aggiungere componenti e personalizzare in generale il dominio che verrà creato

<p align="center">
  <img src="docs/images/domain_builder_templates.png" width="500" alt="Selezione templates"/>
</p>

Qui si può avere un overview dei componenti inclusi nel template ed una breve descrizione.

#### Configurazione dominio
Una volta selezionato un template, si atterra nuovamente sulla pagina principale con i valori prepopolati; si devono ora definire i valori mancanti per personalizzare il dominio.
In base al template (ed ai componenti inclusi) verranno richiesti diversi parametri, ma sicuramente deve essere definito il nome del dominio (_**Domain name**_).
Navigando tra i vari tab del wizard è possibile visionare i valori mancanti e quelli predefiniti;

Nella sezione _**Add components**_ è possibile abilitare/disabilitare i vari componenti che si vogliono includere nel dominio, permettendo cosi di configurarli, ove necessario

Una volta raggiunta l'ultima pagina, prima di procedere con la creazione del dominio, viene fornito un riepilogo della configurazione scelta, dove è possibile a colpo d'occhio visionare i componenti abilitati/disabilitati e le eventuali configurazioni mancanti 

#### Creazione dominio
Dalla schermata di riepilogo, cliccando sul bottone _**Genera dominio**_ viene avviato il processo di creazione del dominio.
Viene quindi mostrata una schermata di risposta dove è possibile trovare il nome del branch che è stato creato e monitorare l'andamento del processo di build tramite il link _View workflow on github_


<p align="center">
  <img src="docs/images/domain_builder_build_response.png" width="300" alt="Output genera dominio"/>
</p>



### Configurazione manuale

A differenza del quick start, è possibile configurare manualmente il dominio senza utilizzare un template predefinito; gli unici tab predefiniti sono quelli relativi al dominio stesso, al monitoraggio ed al networking, che costituiscono le componenti minime necessarie per la definizione di un dominio.
Il flusso di lavoro non prevede differenze rispetto a quello descritto nella sezione precedente:

- abilitazione dei componenti desiderati
- configurazione dei parametri richiesti
- validazione della configurazione
- generazione del dominio

### Utilità

Nella sezione di sono censite le variabili ed i locals che vengono generati dal builder per ogni dominio; ogni variabile/local utilizzabile liberamente all'interno di ogni campo di configurazione ed è possibile trascinare ogni elemento per comporre il valore desiderato
Sfruttare la text area in basso per comporre un valore complesso e riutilizzarlo tramite copia-incolla in più campi di configurazione

<p align="center">
  <img src="docs/images/domain_builder_drag_drop.gif" width="500" alt="Logo"/>
</p>


## Cosa viene prodotto

L'applicazione genera un branch sul repository GitHub collegato, contenente la configurazione del dominio appena creato.
Il nome del branch segue la convenzione `domain-builder/domain-<domain_name>-<unique_id>`, e conterrà:

- i file terraform relativi ai componenti scelti in fase di configurazione 
- la cartella relativa all'ambiente di _**dev**_

Altre cartelle di ambiente, con le relative variabili, configurazione del backend devono essere create manualmente dall'utente.




## Avvio dell'applicazione in locale

Setup ambiente:
```bash
cd src/fe
npm install --legacy-peer-deps
```

creare il file `.env.local` nella cartella `src/fe` con il seguente contenuto:
```env
GITHUB_TOKEN=<your github token>
```
se si vuole utilizzare l'autenticazione Google, aggiungere anche:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your google app client id>
NEXT_PUBLIC_ADMIN_PASSWORD=<your google app admin password>
```


Avvio applicazione:
```bash
npm run dev
```

l'applicazione sarà raggiungibile all'indirizzo [http://localhost:3000](http://localhost:3000)


