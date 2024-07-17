const { selectCommentsByArticleID } = require("../models/comments.model")

exports.getCommentsByArticleID = (request, response, next) => {
    const { article_id } = request.params
    selectCommentsByArticleID(article_id)
    .then((comments) => {
        response.status(200).send({ comments })
    }).catch((err) => {
        next(err)
    })
}