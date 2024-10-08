const db = require("../db/connection");
const format = require('pg-format');
const { checkArticleIDExists, checkUsernameExists } = require("../db/seeds/utils");
const { selectArticleByID } = require("./articles.model");

exports.selectCommentsByArticleID = (article_id) => {
    return db.query(`SELECT * FROM comments 
        WHERE article_id = $1 ORDER BY comments.created_at DESC;`, [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return checkArticleIDExists(article_id)
                .then((checkArticleIDResult) => {
                    if(checkArticleIDResult === true) {
                        return []
                    } else {
                        return Promise.reject({
                        status: 404,
                        message: "Not Found: No Comments Found under This Article"
                        });
                    }
                })
            }
        return result.rows
    })
}

exports.insertComment = (article_id, body, username) => {
    const commentSqlString = format("INSERT INTO comments (article_id, body, author) VALUES %L RETURNING *;", [[article_id, body, username]])

    if (username === undefined || body === undefined) {
        return Promise.reject({
        status: 400,
        message: "Bad Request: Missing Fields"
        })
    }

    return selectArticleByID(article_id)
    .then(() => {
        return checkUsernameExists(username)
        .then((validUsername) => {
            if (validUsername === false) {
                return Promise.reject({
                    status: 404,
                    message: `Not Found: Username ${username} Not Found`
                });
            }
        })
    })

    .then(() => {
        return db.query(commentSqlString)
        .then((result) => {
            return result.rows[0]
        })
    })
}

exports.removeCommentByCommentID = (comment_id) => {
    return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [comment_id])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                message: "Not Found: No Comment Found under This Article"
            });
    }
    return result.rows[0];
    });
}