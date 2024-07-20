const { selectArticleByID, selectAllArticles, updateArticleVotesByArticleID } = require("../models/articles.model")

exports.getArticleByID = (request, response, next) => {
    const { article_id } = request.params
    selectArticleByID(article_id)
    .then((article) => {
        response.status(200).send({ article })
    }).catch((err) => {
        next(err)
    })
}

exports.getArticles = (request, response, next) => {
    selectAllArticles().then((articles) => {
        return response.send(articles)
    }).catch((err) => {
        next(err)
    })
}

exports.patchArticleVotesByArticleID = (request, response, next) => {
    const { article_id } = request.params
    const newVote = request.body.inc_votes
    updateArticleVotesByArticleID(article_id, newVote).then((updatedArticle) => {
        return response.send(updatedArticle)
    }).catch((err) => {
        next(err)
    })
}