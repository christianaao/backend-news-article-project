const data = require("../db/data/test-data/index")
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const request = require("supertest")
const endpoints = require("../endpoints.json")

beforeEach(() => {
    return seed(data)
})
afterAll(() => {
    if (db.end){
        return db.end()
    }
})

describe("deals with all bad requests", () => {
    test("all bad url requests that are not listed in as a possible endpoint are handled with 404 error", () => {
        return request(app)
        .get("/api/not-an-endpoint")
        .expect(404)
        .then(({body}) => {
            const {message} = body
            expect(message).toBe("Not Found: Requested Endpoint Not Found!")
        })
    })
})
describe("GET ENDPOINTS - /api/ Endpoints", () => {
    test("GET /api returns status 200 and an array of all possible endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(body.endpoints).toEqual(endpoints)
        })
    })
})
describe('GET TOPICS - /api/topics', () => {
    test("GET /api/topics returns status 200 and returns an array of all topics data to the client", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(Array.isArray(body)).toBe(true)
            expect(body.length).toBe(3);
            body.forEach((topic) => {
                expect(topic).toEqual({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })
        })
    })
});
describe('GET ARTICLE BY ID - /api/articles/:article_id', () => {
    test("GET /api/articles/:article_id returns status 200 and an article object to client with the following properties when given an article ID: author, title, article_id, body, topic, created_at, votes, and article_img_url", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(body.article).toMatchObject({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: expect.any(String),
                votes: 100,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              })
        })
    })
    test("GET /api/articles/:article_id returns status 404 and error message when given a valid article_id data type which does not exist", () => {
        return request(app)
        .get("/api/articles/99")
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("Not Found: No Article Found under Article ID 99")
        })
    })
    test("GET /api/articles/:article_id returns status 400 and error message when an invalid article_id is given", () => {
        return request(app)
        .get("/api/articles/not-an-id")
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request: Invalid Data Entered in URL")
        })
    })
});
describe('GET ARTICLES - /api/articles', () => {
    test("GET /api/articles returns status 200 and returns an array of article objects to the client with the following properties: author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(Array.isArray(body)).toBe(true)
            expect(body.length).toBe(13);
            body.forEach((article) => {
                expect(article).not.toHaveProperty("body")
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    created_at: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(String)
                })
            })
        })
    })
    test("/api/articles returns status 200 and an array of article objects sorted by date in descending order", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(body).toBeSortedBy("created_at", { descending: true })
        })
    })
});
describe('GET COMMENTS BY ARTICLE ID - /api/articles/:article_id/comments', () => {
    test("GET /api/articles/:article_id/comments returns status 200 and an array of comment objects for the given article ID with the following properties: comment_id, votes, created_at, author, body, article_id", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((response) => {
            const comments = response.body.comments
            expect(Array.isArray(comments)).toBe(true)
            expect(comments.length).toBe(11)
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number)
                })
            })
        })
    })
    test("GET /api/articles/:article_id/comments returns comments with the most recent comments first", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((response) => {
            const comments = response.body.comments
            expect(comments).toBeSortedBy("created_at", { descending: true })
        })
    })
    test("GET /api/articles/:article_id/comments returns status 200 and an empty array of comments when a valid article ID is given which has no comments", () => {
        return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then((response) => {
            expect(response.body.comments).toEqual([])
        })
    })
    test("GET /api/articles/:article_id/comments returns status 404 and error message when given a valid article ID data type which does not exist", () => {
        return request(app)
        .get("/api/articles/99/comments")
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("Not Found: No Comments Found under Article ID 99")
        })
    })
    test("GET /api/articles/:article_id/comments returns status 400 and error message when an invalid article ID is given", () => {
        return request(app)
        .get("/api/articles/not-an-id/comments")
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request: Invalid Data Entered in URL")
        })
    })
});
describe('POST COMMENTS BY ARTICLE ID - /api/articles/:article_id/comments', () => {
    test("POST /api/articles/:article_id/comments returns status 201 and an object with the correct properties and ignores extra properties", () => {
        const comment = {
            username: "butter_bridge",
            body: "Hello World"
        }
        return request(app)
        .post("/api/articles/1/comments")
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment).toMatchObject({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: "butter_bridge",
                body: "Hello World",
                article_id: 1
            })
        })
    })
    test("POST /api/articles/:article_id/comments returns status 400 and does not post comment where fields are missing", () => {
        const comment = {
            body: "Hello World"
        }
        return request(app)
        .post("/api/articles/1/comments")
        .send(comment)
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request: Missing Fields")
        })
    })
    test("POST /api/articles/:article_id/comments returns status 400 and does not post comment where incorrect data type is entered for article ID", () => {
        const comment = {
            username: "butter_bridge",
            body: "Hello World"
        }
        return request(app)
        .post("/api/articles/not-an-id/comments")
        .send(comment)
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request: Invalid Data Entered in URL")
        })
    })
    test("POST /api/articles/:article_id/comments returns status 404 and does not post comment where article ID does not exist", () => {
        const comment = {
            username: "butter_bridge",
            body: "Hello World"
        }
        return request(app)
        .post("/api/articles/99/comments")
        .send(comment)
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("Not Found: No Article Found under Article ID 99")
        })
    })
    test("POST /api/articles/:article_id/comments returns status 404 and does not post comment where user does not exist", () => {
        const comment = {
            username: "iDontExist",
            body: "Hello World"
        }
        return request(app)
        .post("/api/articles/1/comments")
        .send(comment)
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("Not Found: Username iDontExist Does Not Exist")
        })
    })
});
describe('PATCH /api/articles/:article_id', () => {
    test("PATCH /api/articles/:article_id returns status 200 and a single article object with the votes updated", () => {
        const newVote = 1
        return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes : newVote })
        .expect(200)
        .then((response) => {
            expect(response.body).
            toMatchObject({
                article_id: 1,
                title: expect.any(String),
                topic:  expect.any(String),
                author: 'butter_bridge',
                body: expect.any(String),
                created_at: expect.any(String),
                votes: 101,
                article_img_url: expect.any(String)
            })
        })
    })
    test("PATCH /api/articles/:article_id returns status 200 and a single updated article object", () => {
        const newVote = -100
        return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes : newVote })
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({
                article_id: 1,
                title: expect.any(String),
                topic:  expect.any(String),
                author: 'butter_bridge',
                body: expect.any(String),
                created_at: expect.any(String),
                votes: 0,
                article_img_url: expect.any(String)
            })
        })
    })
    test("PATCH /api/articles/:article_id returns status 400 and does not make any changes where an incorrect data type is entered for article ID", () => {
        const newVote = 1
        return request(app)
        .patch("/api/articles/not-an-id")
        .send({ inc_votes : newVote })
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request: Invalid Data Entered in URL")
            })
        })
    test("PATCH /api/articles/:article_id returns status 400 and does not make any changes where an incorrect data type is entered in the vote object", () => {
        const newVote = "one"
        return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes : newVote })
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request: Invalid Data Entered in Votes Object: one")
            })
        })
    test("PATCH /api/articles/:article_id returns status 404 and does not make any changes where article ID does not exist", () => {
        const newVote = 1
        return request(app)
        .patch("/api/articles/99")
        .send({ inc_votes : newVote })
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("Not Found: No Article Found under Article ID 99")
        })
    })
});
describe('DELETE /api/comments/:comment_id', () => {
    test("DELETE /api/comments/:comment_id returns status 204 and deletes comment from database", () => {
        return request(app)
        .delete("/api/comments/1")
        .expect(204)
    })
    test("DELETE /api/comments/:comment_id returns status 400 and does not delete comment where incorrect data type is entered for comment ID", () => {
        return request(app)
        .delete("/api/comments/not-an-id")
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request: Invalid Data Entered in URL")
        })
    })
    test("DELETE /api/comments/:comment_id returns status 404 and does not delete comment where where comment ID does not exist", () => {
        return request(app)
        .delete("/api/comments/99")
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe("Not Found: No Comment Found under Comment ID 99")
        })
    })
});
describe('GET /api/users', () => {
    test("GET /api/users returns status 200 and an array of objects with the following properties: username, name, avatar_url", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(Array.isArray(body)).toBe(true)
            expect(body.length).toBe(4)
            body.forEach((user) => {
                expect(user).toMatchObject({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String)
                })
            })
        })
    })
    // test("GET /api/users returns status 404 and error message when an empty array of users is received", () => {
    //     return request(app)
    //     .get("/api/user")
    //     .expect(404)
    //     .then((response) => {
    //         expect(response.body.message).toBe("Not Found: No Users Found")
    //     })
    // })
});