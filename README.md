# Le jeu du pong à 4 joueurs

##Règles
Le jeu du Pong consiste à faire voyager une balle d'une partie à l'autre d'un terrain en utilisant des raquettes représentées par des barre verticale. Lorsqu'une balle touche le côté droit, l'équipe gauche gagne le point et inversement.

##Lancement
- Commencez par cloner le dépôt git sur votre ordinateur : ``git clone https://github.com/GabG02/PongM1Technolog.git``
- Placez vous dans le dossier télécharger : ``cd ./PongM1Technolog/``
- Pour lancer le jeu, lancez la commande : ``npm install && npm start ``
- Vous pouvez ensuite lancer sur votre ordinateur 4 navigateurs sous l'adresse ***localhost:3000*** (Le port peut être changé à la **ligne 45** du fichier **[server.js](./server.js)**)

Pour aller plus vite : placez vous dans le dossier souhaitez et lancer 
```
git clone https://github.com/GabG02/PongM1Technolog.git && cd ./PongM1Technolog/ && npm install && npm start
```
## Outils utilisés
Les langages utilisés sont :
- Coté serveur : 
  - JavaScript (avec Node)
- Côté client :
  - HTML
  - CSS
  - JavaScript
    
Pour la communication entre les différents clients, le module **[Socket.io](https://socket.io/)** a été utilisé. Il permet de créer facilement une communication entre clients en ajoutant une route au server vers le fichier récupérant la bibliothèque et la configuration des sockets. Les messages envoyés par les clients peuvent ainsi être interceptés par le serveur et être redistribués au besoin aux autres client. L'utilisation de requête HTTP pour ce projet créerai un handicap en raison du temps de traitement et de renvoi des informations aux autres clients.

## Questions et support
Pour toute question, n'hésitez pas à **[ouvrir un ticket](https://github.com/GabG02/PongM1Technolog/issues/new)**. 