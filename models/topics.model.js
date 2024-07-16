const db = require("../db/connection")

const fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then((response) => {
        // console.log("RESPONSE >> ", response)
        return response.rows
    })
}

module.exports = fetchAllTopics