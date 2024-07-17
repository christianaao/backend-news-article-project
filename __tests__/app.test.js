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
            expect(message).toBe("404 - Requested Endpoint Not Found!")
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
            expect(response.body.message).toBe("No Articles Found under Article ID 99")
        })
    })
    test("GET status 400 and error message when an invalid article_id is given", () => {
        return request(app)
        .get("/api/articles/not-an-id")
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe("Bad Request")
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
            console.log(comments)
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
});