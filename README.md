# Back End News API Project

## About this Project

This API is the backend server of my news article website. It is designed to programmatically access application data, emulating the development of a real-world backend service (similar to Reddit) that supplies data to the front-end architecture.

This project is still under development and is continuously being improved.

## Project Links

Backend API: https://news-article-project.onrender.com<br/>
Backend Repo: https://github.com/christianaao/backend-news-article-project

To use this link, make a request to an existing endpoint, such as `/api/users`, to request the data.You can view all available endpoints on https://news-article-project.onrender.com/api/<br/>

Check out `endpoints.json` for all the available endpoints.

Frontend App: https://frontend-news-article-project.netlify.app/<br/>
Frontend Repo: https://github.com/christianaao/frontend-news-article-project

## Features of this Project

This project was created using Model View Controller architecture.

This project was written in JavaScript through Test Driven Development (TDD) using Jest and SuperTest.

## Setup

**_In order to run this server locally:_**

1. Clone or fork this repo.

2. In your terminal, locate the directory you would like to save the code to and type `git clone` followed by the cloned/forked repo link.

3. In the cloned directory, type `npm install` in your terminal to install all dependencies. 

4. Create two dotenv files: `.env.test` and `.env.development`, and insert `PGDATABASE=nc_news_test` and `PGDATABASE=nc_news` to the files respectively.

5. Type `npm run setup-dbs` and `npm run seed` in the terminal.

6. To run the code, run `npm run dev` or `npm test` in the terminal.

☺ I hope you enjoy testing my server ☺

## Software Requirements
**Node version**: 14 or higher required

**Postgres version**: 8.8 or higher required

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
