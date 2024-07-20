const { selectCommentsByArticleID, insertComment } = require("../models/comments.model")

exports.getCommentsByArticleID = (request, response, next) => {
    const { article_id } = request.params
    selectCommentsByArticleID(article_id)
    .then((comments) => {
        response.status(200).send({ comments })
    }).catch((err) => {
        next(err)
    })
}

exports.postComment = (request, response, next) => {
    const { article_id } = request.params
    const body = request.body.body
    const username = request.body.username
    insertComment(article_id, body, username)
    .then((comment) => {
        response.status(201).send({ comment })
    }).catch((err) => {
        next(err)
    })
}