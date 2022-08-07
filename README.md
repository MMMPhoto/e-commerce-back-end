# E-Commerce Back End

## Description

The E-Commerce Back End program is a Node.js server-side application that runs a MySql database contains product and inventory data for an e-commerce website. The program uses the Sequelize ORM to communicate with the database, and Express package to run routes. Since the program is entirely back-end, it's helpful to use an API tool such as Postman to make GET, POST, PUT, and DELETE calls to view and manipulate the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Questions](#questions)

## Installation

To install, the user simply downloads the application root folder and helper files. The user needs to be running Node v12.22.12 or newer. They then type "npm install" on the command line to download all npm dependancies, which include MySQL2, Express, Sequelize, and Dotenv. Before running the app for the first time, the user should open a MySql shell in the root folder and install the database schema file, located in the db folder. From the MySql promt, type "source db/schema.sql". To get the database connection up and running, the user will need to add thier environment variables to a .env file at the root level. The user should then run "npm run seed" to run the seed file located at seeds/index.js

## Usage

To run the app, simply type "npm start" or "node server.js" in the command line of the root folder. The app will load the database connection. Since the application is back end only, at this point the user will need to access an API tool such as Postman or Insomnia to make applicable GET, POST, PUT, and DELETE routes. The database contains 3 tables which are located at /api/ on the user's localhost port. They can access these tables via /api/categories, /api/products, and /api/tags, and can use all 4 of the above routes for eash table.

[Video walkthrough of Using the App](https://drive.google.com/file/d/18asC8ZewBIQJWJ0StMtqGgC-zsy8cSom/view)

![Usage Screenshot 1](./images/e-commerce-back-end-screenshot1.png?raw=true)

![Usage Screenshot 2](./images/e-commerce-back-end-screenshot2.png?raw=true)
  
![Usage Screenshot 2](./images/e-commerce-back-end-screenshot3.png?raw=true)

## Features

- Access the database for an E-commerce website
- Use relational database to dynamically view or alter data
- Easy to install and run

## Questions

If you have additional questions, please contact me at: max.mcdonough@gmail.com

Github: [MMMPhoto](https://github.com/MMMPhoto)
  
[Github Repo for this Application](https://github.com/MMMPhoto/e-commerce-back-end)

--------------------------------------

### &copy; 2022 Max McDonough


  
