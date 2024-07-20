const express = require("express")
const app = express()
app.use(express.json())

const { getTopics } = require("./controllers/topics.controller")
const { getEndpoints } = require("./controllers/endpoints.controller")
const { getArticleByID, getArticles } = require("./controllers/articles.controllers")
const { getCommentsByArticleID, postComment } = require("./controllers/comments.controllers")

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleByID)

app.get("/api/articles/:article_id/comments", getCommentsByArticleID)

app.post("/api/articles/:article_id/comments", postComment)

// Error Handling

app.use((err, request, response, next) => {
    if(err.code === "22P02") {
        response.status(400).send({ message: "Bad Request: Invalid Data Entered" })
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
    response.status(404).send({message: "Not Found: Requested Endpoint Not Found!"})
})

module.exports = app