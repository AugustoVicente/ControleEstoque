# Plataforma de Controle de estoque

Este projeto visa automatizar o controle de estoque do cliente em questão.
O projeto é composto de uma aplicação mobile híbrida e uma aplicação PHP em um servidor apache local cujo comunica com o banco de dados MySQL local também.

## Prerequisites

* NPM 6.4.1
* MySQL
* Apache Server
* Electron
* Windows 10

## Installing

* Clone the folder
* Move the ./apache folder to the apache server  
* Run the DB script on the MySQL server: db.sql
* Change the DB credentials in the file apache/conexao.php 
* Change the server credentials in the file app\orcamento\src\providers\classes\classes.ts

## Running

* Install all dependencies on ./app/ "npm i"
* run ionic cordova run android on the ./app folder
* Install all dependencies on ./desktop/ "npm i"
* run "npm start" to run electron on the ./desktop folder
* run "npm run dist" to package electron on the ./desktop folder
