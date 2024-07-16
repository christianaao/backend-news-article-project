const fetchAllTopics = require("../models/topics.model")

const getTopics = (request, response, next) => {
    fetchAllTopics().then((topics) => {
        // console.log(topics)
        return response.send(topics)
    }).catch((err) => {
        console.log("ERROR FROM TOPICS.CONTROLLER: ", err)
        next(err)
    })
}

module.exports = { getTopics }