const { selectAllUsers } = require("../models/users.model")


exports.getUsers = (request, response, next) => {
    selectAllUsers().then((users) => {
        return response.send(users)
    }).catch((err) => {
        next(err)
    })
}