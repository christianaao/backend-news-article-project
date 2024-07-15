const fetchAllTopics = require("../models/topics.model")

const getTopics = (request, response) => {
    fetchAllTopics().then((topics) => {
        // console.log(topics)
        return response.send(topics)
    }).catch((err) => {
        next(err)
    })
}

module.exports = { getTopics }