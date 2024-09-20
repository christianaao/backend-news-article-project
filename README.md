# Back End News API Project

## About this Project

This API is the backend server of my news article website. It is designed to programmatically access application data, emulating the development of a real-world backend service (similar to Reddit) that supplies data to the front-end architecture.

This project is still under development and is continuously being improved.

## Project Links

Backend API: https://news-article-project.onrender.com/<br/>
Backend Repo: https://github.com/christianaao/backend-news-article-project

To use this link, make a request to an existing endpoint, such as `/api/users`, to request the data.

Check out `endpoints.json` for all the available endpoints.

Frontend App: https://frontend-news-article-project.netlify.app/<br/>
Frontend Repo: https://github.com/christianaao/frontend-news-article-project

## Features of this Project

This project was created using Model View Controller architecture.

This project was written in JavaScript through Test Driven Development (TDD) using Jest and SuperTest.

## Setup

**_In order to run this server locally:_**

1. Clone or fork this repo.

2. Run `npm install` in your terminal to install all dependencies. 

3. Create two dotenv files: `.env.test` and `.env.development`, and insert `PGDATABASE=nc_news_test` and `PGDATABASE=nc_news` to the files respectively.

4. Run `npm run setup-dbs` and `npm run seed` in the terminal.

5. To run the code, run `npm run dev` or `npm test` in the terminal.

☺ I hope you enjoy testing my server ☺

## Software Requirements
**Node version**: 14 required or higher

**Postgres version**: 8.8 required or higher

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
