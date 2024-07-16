const express = require("express")
const app = express()
const { getTopics } = require("./controllers/topics.controller")

app.get("/api/topics", getTopics)

app.all("*", (request, response, next) => {
    return response.status(404).send({message: "Endpoint Not Found!"})
})



module.exports = app