# Inventory Control Platform

**Inventory Control Platform** is a project aimed at automating inventory management for clients.
The system consists of a hybrid mobile application and a PHP application running on a local Apache server, which communicates with a local MySQL database.

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
