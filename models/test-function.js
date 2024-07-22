// Controller

// exports.getArticles = (request, response, next) => {
//     const sort_by = request.query.sort_by
//     const order = request.query.order
//     const topic = request.query.topic

//     selectAllArticles(sort_by, order, topic).then((articles) => {
//         return response.send(articles)
//     }).catch((err) => {
//         next(err)
//     })
// }

// Model 

// Attempt 2

// exports.selectAllArticles = (sort_by = "created_at", order = "DESC", topic) => {

//     const ValidSortByQueries = ["title", "topic", "author", "created_at", "votes"]

//     const validOrders = ["ASC", "DESC", "asc", "desc"]

//     if(!ValidSortByQueries.includes(sort_by)) {
//         return Promise.reject({
//             status: 400,
//             message: `Invalid query: ${sort_by}`
//         })
//     } else if (!validOrders.includes(order)) {
//         return Promise.reject({
//             status: 400,
//             message: `Invalid query: ${order}`
//         })
//     }

//     let sqlString = `SELECT
//             articles.author,
//             articles.title,
//             articles.article_id,
//             articles.topic,
//             articles.created_at,
//             articles.votes,
//             articles.article_img_url,
//             COUNT(comments.comment_id) AS comment_count
//         FROM
//             articles
//         LEFT JOIN
//             comments ON articles.article_id = comments.article_id
//         `
//     const queryTopics = []

//     Promise.resolve()
//     .then(() => {
//         if (topic) {
//             return checkTopicExists(topic)
//         }
//     })
//     .then((result) => {
//         // if (result === false && topic !== undefined) {
//         //     return Promise.reject({
//         //         status: 404,
//         //         message: `Not Found: No Topic Found under ${topic}`
//         //     });
//         // }
//         if (topic) {
//             sqlString += ` WHERE topic = $1`
//             queryTopics.push(topic)
//         }

//         sqlString += ` GROUP BY
//                 articles.article_id ORDER BY articles.${sort_by} ${order};`
//             console.log(sqlString, queryTopics)
//         return db.query(sqlString, queryTopics)
//     })
//     .then((result) => {
//         console.log(result.rows)
//         return result.rows
//     })
//     .catch((err) => {
//         console.log("err")
//     })
//         // if(topic) {
//     //     return checkTopicExists(topic)
//     //     .then(() => {
//     //         return db.query(sqlString, queryTopics).then((result) => {
//     //             console.log(result.rows)
//     //             return result.rows
//     //         })
//     //     })
//     // }

//     // return checkTopicExists(topic)
//     // .then((result) => {
//     //     if(result === false && topic !== "") {
//     //         console.log(topic)
//     //     return Promise.reject({
//     //         status: 404,
//     //         message: `Not Found: No Topic Found under ${topic}`
//     //         });
//     //     }
//     // })
// }

// ***

// Attempt 1

// exports.selectAllArticles = (sort_by = "created_at", order = "DESC", topic) => {

//     const ValidSortByQueries = ["title", "topic", "author", "created_at", "votes"]

//     const validOrders = ["ASC", "DESC", "asc", "desc"]

//     if(!ValidSortByQueries.includes(sort_by)) {
//         return Promise.reject({
//             status: 400,
//             message: `Invalid query: ${sort_by}`
//         })
//     } else if (!validOrders.includes(order)) {
//         return Promise.reject({
//             status: 400,
//             message: `Invalid query: ${order}`
//         })
//     }

//     let sqlString = `SELECT
//             articles.author,
//             articles.title,
//             articles.article_id,
//             articles.topic,
//             articles.created_at,
//             articles.votes,
//             articles.article_img_url,
//             COUNT(comments.comment_id) AS comment_count
//         FROM
//             articles
//         LEFT JOIN
//             comments ON articles.article_id = comments.article_id
//         `
//     const queryTopics = []

//     if(topic) {
//         sqlString += `WHERE topic = $1`
//         queryTopics.push(topic)
//     }

//     sqlString += `GROUP BY
//             articles.article_id ORDER BY articles.${sort_by} ${order};`
    


//     // console.log(sqlString)

//     Promise.resolve()
//     .then(() => {
//         if (topic) {
//             return checkTopicExists(topic)
//         }
//     })
//     .then((result) => {
//         if (result === false && topic !== undefined) {
//             return Promise.reject({
//                 status: 404,
//                 message: `Not Found: No Topic Found under ${topic}`
//             });
//         }
//     })
//     return db.query(sqlString, queryTopics)
//     .then((result) => {
//         return result.rows
//     })