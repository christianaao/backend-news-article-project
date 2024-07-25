# Back End News API Project

## About this Project

This API is the backend server of my news article website. It is designed to programmatically access application data, emulating the development of a real-world backend service (similar to Reddit) that supplies data to the front-end architecture.

## Host Link

_link here_

---

## Features of this Project

This project was created using Model View Controller architecture.

This project was written in JavaScript through test driven development (TDD) using Jest and SuperTest.

## Setup

**_In order to run this server locally:_**

First, clone or fork this repo

Next, run: `npm install` in your terminal to install all dependencies. 

#### The required dependencies include:

 - dotenv
 - pg

#### Dev Dependencies:
 - jest (including jest-extended and jest-sorted)
 - pg-format
 - supertest
 - husky

Thirdly, create two dotenv files: `.env.test` and `.env.development`, and insert `PGDATABASE=nc_news_test` and `PGDATABASE=nc_news` to the files respectively.

Finally, run `npm run setup-dbs` and `npm run seed` in the terminal.

To run the code, run `npm run dev` or `npm test` in the terminal.

☺ I hope you enjoy testing my server ☺

## Software Requirements
Node version: >= 14 required

Postgres version: >= 8.8 required

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)