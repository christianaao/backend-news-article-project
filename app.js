const express = require("express")
const app = express()
const { getTopics } = require("./controllers/topics.controller")
const { getEndpoints } = require("./controllers/endpoints.controller")
const { getArticleByID } = require("./controllers/articles.controllers")

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticleByID)

app.use((err, request, response, next) => {
    if(err.code === "22P02") {
        response.status(400).send({ message: "Bad Request" })
    } else {
        next(err)
    }
})

app.use((err, request, response, next) => {
    if(err.status && err.message) {
        response.status(err.status).send({ message: err.message })
    } else {
        next(err);
    }
})

app.all("*", (request, response, next) => {
    response.status(404).send({message: "404 - Requested Endpoint Not Found!"})
})

module.exports = app