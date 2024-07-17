const selectAllTopics = require("../models/topics.model")

const getTopics = (request, response, next) => {
    selectAllTopics().then((topics) => {
        return response.send(topics)
    }).catch((err) => {
        next(err)
    })
}

module.exports = { getTopics }