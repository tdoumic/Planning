# Ma journée : mode d'emploi

« Ma journée » est une page web qui rassemble, sur un seul écran :

1. **Ma tâche n°1** : la seule chose qui compte vraiment aujourd'hui, avec un bouton **Découper** pour la diviser en 3 à 5 petites étapes.
2. **Mes rendez-vous du jour**, lus dans Google Agenda.
3. **Ma séance de sport** du jour, avec un compteur pour la semaine.
4. **Mes habitudes du jour**, à cocher, avec le nombre de jours d'affilée.
5. **La capture rapide** : pour noter une tâche ou un message à traiter plus tard, sans se disperser.
6. **Mes tâches** : 5 visibles au maximum.
7. **Les objectifs longs**, par exemple « Désencombrer et organiser la maison », découpés en zones.

En haut à droite : le **mode concentration** (icône minuteur) et les **réglages** (icône roue dentée).

Tout se fait avec des boutons dans la page. Tu n'as jamais besoin de toucher au code.

---

## 1. Ouvrir la page

- **Sur un ordinateur** : double-clique sur le fichier `index.html`. Il s'ouvre dans ton navigateur.
- **Sur un téléphone ou une tablette** : il faut d'abord mettre la page en ligne (étape 2).

Au premier lancement, la page affiche des **données d'exemple**. Pour repartir de zéro, appuie sur **Effacer les exemples** dans le bandeau du haut. Tes habitudes et tes réglages sont conservés.

## 2. Mettre la page en ligne (gratuit, avec GitHub Pages)

À faire une seule fois, de préférence sur un ordinateur ou une tablette :

1. Ouvre ton dépôt « Planning » sur github.com.
2. Va dans **Settings** puis **Pages**.
3. Dans **Build and deployment**, choisis la source **Deploy from a branch**, puis la branche **main** et le dossier **/ (root)**. Clique sur **Save**.
4. Attends quelques minutes : GitHub affiche l'adresse de ta page, du type `https://ton-nom.github.io/Planning/`.

Source : [documentation GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Les libellés peuvent changer légèrement.

> **Important :** une page publiée avec GitHub Pages est visible par tout le monde sur Internet. Ce n'est pas un problème ici, car **tes données ne sont pas dans la page** : elles restent dans le navigateur de ton appareil. Un inconnu qui ouvrirait l'adresse verrait seulement les exemples.

## 3. Ajouter la page à l'écran d'accueil

Ouvre l'adresse de la page sur ton téléphone ou ta tablette, puis :

- **iPhone / iPad (Safari)** : bouton **Partager**, puis **Sur l'écran d'accueil**.
- **Android (Chrome)** : menu **⋮**, puis **Ajouter à l'écran d'accueil** ou **Installer l'application**.

La page s'ouvre alors comme une application, avec son icône. Elle fonctionne aussi sans connexion, avec les dernières informations lues.

## 4. Brancher tes agendas Google

La page lit tes agendas **sans pouvoir les modifier**. Il y a deux méthodes.

### Méthode recommandée : le « Script Google »

Un navigateur peut refuser de lire directement un agenda Google depuis une autre page. Ce petit script, qui tourne sur **ton propre compte Google**, sert d'intermédiaire. À faire une seule fois, de préférence sur un ordinateur :

1. Va sur [script.google.com](https://script.google.com) et clique sur **Nouveau projet**.
2. Efface le contenu affiché, puis copie-colle **tout** le contenu du fichier `script-google-agenda.gs` de ce dépôt. Tu n'as rien à modifier.
3. Donne un nom au projet (par exemple « Ma journée – agenda ») et clique sur **Enregistrer**.
4. Clique sur **Déployer**, puis **Nouveau déploiement**. Choisis le type **Application Web**, puis :
   - **Exécuter en tant que** : **Moi** ;
   - **Qui a accès** : **Tout le monde**.
5. Clique sur **Déployer**. Google te demande d'autoriser l'accès à ton agenda.
   - Il peut afficher un avertissement du type « Google n'a pas validé cette application ». C'est normal : c'est **ton propre script**. Clique sur **Paramètres avancés**, puis sur **Accéder à … (non sécurisé)**, puis sur **Autoriser**.
6. Copie l'**URL de l'application Web**. Elle commence par `https://script.google.com/macros/s/` et se termine par `/exec`.
7. Dans la page « Ma journée », ouvre les **réglages ⚙️** :
   - section **Agendas Google**, méthode **Script Google (recommandé)** ;
   - colle l'adresse et clique sur **Ajouter l'agenda**.
8. La page affiche la liste de tes agendas. Pour chacun, choisis ce qu'il contient :
   - **Rendez-vous** : tes agendas habituels (principal, famille…) ;
   - **Sport** : l'agenda de ta salle, par exemple pour le CrossFit ;
   - **Routines** : l'agenda rempli chaque matin avec tes blocs de la journée (habitudes, séance de sport proposée, repas, tâches à heure fixe) ;
   - **Ignorer** : ce que tu ne veux pas voir (phases de la lune, numéros de semaine…).

Les libellés de Google peuvent varier un peu selon la langue et la version.

**Si tu modifies le script plus tard**, il faut le redéployer : **Déployer**, puis **Gérer les déploiements**.

### Autre méthode : l'adresse secrète iCal

1. Dans Google Agenda (sur ordinateur), ouvre les **Paramètres**, puis clique sur l'agenda voulu.
2. Copie l'**Adresse secrète au format iCal** ([aide Google](https://support.google.com/calendar/answer/37648)).
3. Dans les réglages de la page, méthode **Adresse secrète iCal** : colle l'adresse et choisis ce que contient l'agenda.

Cette méthode est souvent **bloquée par le navigateur**. Si c'est le cas, la page l'indique clairement : utilise alors le Script Google.

### Sécurité : à lire

- L'adresse du script et l'adresse secrète iCal **donnent accès à ton agenda**. Traite-les comme des mots de passe.
- Ne les mets **jamais** dans GitHub, dans un message ou dans une conversation avec une IA. Colle-les seulement dans les réglages de la page, sur ton appareil.
- Si une adresse a fuité :
  - **adresse iCal** : dans Google Agenda, clique sur **Réinitialiser** à côté de l'adresse secrète ;
  - **script** : dans **Gérer les déploiements**, archive le déploiement, puis crée-en un nouveau.

## 5. Comment la page trie tes événements

- **Mots à ignorer partout** (réglages) : un événement dont le titre contient un de ces mots est masqué partout.
- **Sport** : un événement dont le titre contient « CrossFit », « Musculation », « Footing », « Randonnée »… est compté dans la séance du jour et dans le compteur de la semaine. Les mots et les objectifs par semaine se règlent dans les réglages.
- **Habitudes** : dans un agenda de type **Routines**, un événement qui contient le mot-clé d'une habitude (par exemple « Cohérence ») affiche l'heure prévue à côté de cette habitude.
- **Blocs masqués** : dans un agenda de type **Routines**, les repas, pauses et blocs « Au lit » ne s'affichent pas comme rendez-vous. La liste se règle elle aussi.
- **Le reste** s'affiche dans **Mes rendez-vous du jour**.

Les cases cochées des habitudes sont enregistrées **dans la page seulement**. Elles ne modifient pas ton agenda Google.

## 6. Tes données, téléphone et tablette

- Tes tâches, habitudes, objectifs et réglages sont enregistrés **dans le navigateur de l'appareil**. Ils ne se synchronisent pas tout seuls entre ton téléphone et ta tablette.
- Pour copier tes données d'un appareil à l'autre, ouvre **Réglages**, puis **Mes données** :
  - **Exporter** sur le premier appareil : un fichier `.json` est créé ;
  - **Importer** ce fichier sur le second appareil.
- Par défaut, l'export **ne contient pas** les adresses de tes agendas. Si tu coches l'option pour les inclure, garde ce fichier secret.
- Attention : si tu effaces les données de navigation de ton navigateur, les données de la page sont effacées aussi. Pense à exporter de temps en temps.

## 7. Le mode concentration

L'icône minuteur, en haut à droite, ouvre un écran avec seulement ton étape en cours et un minuteur de 15, 25 ou 45 minutes.

- Une idée ou un message te vient en tête ? Note-le dans le champ prévu : il part dans « À répondre plus tard », sans quitter le mode concentration.
- La page ne peut pas couper les notifications de ton téléphone. Active toi-même le mode **Ne pas déranger**.

## 8. Plus tard : un budget ?

Le code est organisé pour pouvoir ajouter une partie « Budget » sans tout refaire, le jour où tu le voudras.

---

### Fichiers du projet

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page elle-même : tout est dedans. |
| `script-google-agenda.gs` | Le script à copier dans Google pour lire tes agendas. |
| `manifest.webmanifest`, `icon*.png`, `icon.svg`, `apple-touch-icon.png` | Le nom et l'icône pour l'écran d'accueil. |
| `sw.js` | Permet d'ouvrir la page sans connexion. |
