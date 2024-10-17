# Community Connection News API

## About this Project

This API is the backend server of my news article website. It is designed to programmatically access application data, emulating the development of a real-world backend service (similar to Reddit) that supplies data to the front-end architecture.

This project is still under development and is continuously being improved.

## Project Links

Backend API: https://news-article-project.onrender.com<br/>
Backend Repo: https://github.com/christianaao/backend-news-article-project

To use this link, make a request to an existing endpoint, such as `/api/users`, to request and view the data. See below for a list of all available endpoints.
You can view all available endpoints on https://news-article-project.onrender.com/api/<br/>

Frontend App: https://frontend-news-article-project.netlify.app/<br/>
Frontend Repo: https://github.com/christianaao/frontend-news-article-project

## Features of this Project

This project was created using Model View Controller architecture.

This project was written in JavaScript through Test Driven Development (TDD) using Jest and SuperTest.

### Available Endpoints

* GET /api <br>
* GET /api/topics <br>
* GET /api/users <br>
* GET /api/articles <br>
* GET /api/articles/:article_id <br>
* PATCH /api/articles/:article_id <br>
* GET /api/articles/:article_id/comments <br>
* POST /api/articles/:article_id/comments <br>
* DELETE /api/comments/:comment_id <br>

You can also find this information in `endpoints.json` file.

## Running this Project Locally

### Installation

To install PostgreSQL: https://www.w3schools.com/postgresql/postgresql_install.php

To install npm: `npm install npm@latest -g`

### Setup

1. Clone or fork this repo.

2. In your terminal, locate the directory you would like to save the code to and type `git clone` followed by the cloned/forked repo link.

3. In the cloned directory, type `npm install` in your terminal to install all dependencies. 

4. Create two dotenv files: `.env.test` and `.env.development`, and insert `PGDATABASE=nc_news_test` and `PGDATABASE=nc_news` to the files respectively. This will allow you to connect to the databases.

5. Type `npm run setup-dbs` and `npm run seed` in the terminal to set up the database.

6. To run the code, run `npm run dev` or `npm test` in the terminal to seed the local database.

☺ I hope you enjoy testing my server ☺

## Software Requirements
**Node version**: 14 or higher required

**Postgres version**: 8.8 or higher required

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
