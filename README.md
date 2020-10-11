# So-Pekocko : Piquante

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/23b2c0a7b92447b383b41f9aef7a2de3)](https://app.codacy.com/gh/Pix-ggyr/SoPekocko-Piquante?utm_source=github.com&utm_medium=referral&utm_content=Pix-ggyr/SoPekocko-Piquante&utm_campaign=Badge_Grade)

![Mockup ><](https://raw.githubusercontent.com/Pix-ggyr/SoPekocko-Piquante/master/backend/assets/Web%20Screens%20Perspective%20PSD%20Mockup.jpg)

## Fonctionnement

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.


1. Dans le dossier ***frontend*** : démarrez `ng serve` pour avoir accès au serveur de développement.
2. Dans le dossier ***backend*** : démarrez `nodemon server` pour vous connecter à la base de donnée **MongoDB**.
3. Rendez-vous sur `http://localhost:4200/`. L'application va se recharger automatiquement si vous modifiez un fichier source. 

## Présentation

Projet de développement backend proposé par **Openclassrooms** dans le parcours développeur web. 

Il s'agit d'une application agissant comme une librairie de sauces et un système de notation de celle-ci. L'utilisateur doit s'enregistrer via un mail et un mot de passe avant d'avoir accès à la librairie. 

![login ><](https://raw.githubusercontent.com/Pix-ggyr/SoPekocko-Piquante/master/backend/assets/login.png)

## Fonctionnalités

L'uilisateur sera en mesure d'ajouter des sauces une fois enregistré sur l'application.

![add-sauce ><](https://raw.githubusercontent.com/Pix-ggyr/SoPekocko-Piquante/master/backend/assets/add-sauce.png)

![one-sauce ><](https://raw.githubusercontent.com/Pix-ggyr/SoPekocko-Piquante/master/backend/assets/one-sauce.png)

Une fois publiée, l'utilisateur ayant posté la sauce pourra encore l'éditer ou la supprimer. Ces fonctions d'édition ne sont pas accessibles à d'autres utilisateurs.

La sauce aura bien été ajoutée à la base de données : 

![all-sauces ><](https://raw.githubusercontent.com/Pix-ggyr/SoPekocko-Piquante/master/backend/assets/all-sauces.png)