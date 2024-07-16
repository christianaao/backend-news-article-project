const express = require("express")
const app = express()
const { getTopics } = require("./controllers/topics.controller")
const { getEndpoints } = require("./controllers/endpoints.controller")

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.all("*", (request, response, next) => {
    return response.status(404).send({message: "Endpoint Not Found!"})
})

module.exports = app