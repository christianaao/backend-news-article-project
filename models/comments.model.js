const db = require("../db/connection")

exports.selectCommentsByArticleID = (article_id) => {
    return db.query(`SELECT * FROM comments 
        WHERE article_id = $1 ORDER BY comments.created_at DESC;`, [article_id]
        )
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    message: `No Comments Found under Article ID ${article_id}`
                });
            }
        return result.rows
    })
}