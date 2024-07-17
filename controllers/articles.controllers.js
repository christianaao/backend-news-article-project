const { selectArticleByID, selectAllArticles } = require("../models/articles.model")

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