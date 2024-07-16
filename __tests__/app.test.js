const data = require("../db/data/test-data/index")
// const connection = require("../db")
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const request = require("supertest")

beforeEach(() => {
    return seed(data)
})
afterEach(() => {
    return db.end()
})

// describe("All bad requests", () => {
//     test("all bad url requests are handled with 404 error", () => {
//         return request(app)
//         .get("/api/not-an-endpoint")
//         .expect(404)
//         .then((response) )
//     })
// })
describe("GET /api/", () => {
    test("GET /api/topics returns status 200 and returns an array of topic data to the client", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(body.length).toBe(3);
            body.forEach((topic) => {
                expect(topic).toEqual({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })
        })
    })
})
