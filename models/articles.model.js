const db = require("../db/connection")
const format = require('pg-format');
const { checkTopicExists } = require("../db/seeds/utils");

exports.selectArticleByID = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                message: `Not Found: No Article Found under Article ID ${article_id}`
            });
    }
    return result.rows[0];
    });
}

exports.selectAllArticles = (sort_by = "created_at", order = "DESC", topic) => {

    const ValidSortByQueries = ["title", "topic", "author", "created_at", "votes"]

    const validOrders = ["ASC", "DESC", "asc", "desc"]

    if(!ValidSortByQueries.includes(sort_by)) {
        return Promise.reject({
            status: 400,
            message: `Invalid query: ${sort_by}`
        })
    } else if (!validOrders.includes(order)) {
        return Promise.reject({
            status: 400,
            message: `Invalid query: ${order}`
        })
    }

    let sqlString = `SELECT
            articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.comment_id) AS comment_count
        FROM
            articles
        LEFT JOIN
            comments ON articles.article_id = comments.article_id
        `
    const queryTopics = []

        // if (result === false && topic !== undefined) {
        //     return Promise.reject({
        //         status: 404,
        //         message: `Not Found: No Topic Found under ${topic}`
        //     });
        // }
    if (topic) {
        sqlString += ` WHERE topic = $1`
        queryTopics.push(topic)
    }

    sqlString += ` GROUP BY
            articles.article_id ORDER BY articles.${sort_by} ${order};`

    return db.query(sqlString, queryTopics)
    .then((result) => {
        return result.rows
    })

        // if(topic) {
    //     return checkTopicExists(topic)
    //     .then(() => {
    //         return db.query(sqlString, queryTopics).then((result) => {
    //             console.log(result.rows)
    //             return result.rows
    //         })
    //     })
    // }

    // return checkTopicExists(topic)
    // .then((result) => {
    //     if(result === false && topic !== "") {
    //         console.log(topic)
    //     return Promise.reject({
    //         status: 404,
    //         message: `Not Found: No Topic Found under ${topic}`
    //         });
    //     }
    // })
}

exports.updateArticleVotesByArticleID = (article_id, newVote) => {
    const votesSqlString = "UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;"

    if(typeof newVote !== "number") {
        return Promise.reject({
            status: 400,
            message: `Bad Request: Invalid Data Entered in Votes Object: ${newVote}`
            })
        }
    
    return exports.selectArticleByID(article_id)
    .then((result) => {
        const articleVotes = result.votes
        const updatedVotes = articleVotes + newVote
        return updatedVotes
    })

    .then((updatedVotes) => {
        return db.query(votesSqlString, [updatedVotes, article_id])
        .then((result) => {
            return result.rows[0]
        })
    })
}