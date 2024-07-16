const data = require("../db/data/test-data/index")
// const connection = require("../db")
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

describe("Dealing with all bad requests", () => {
    test("all bad url requests are handled with 404 error", () => {
        return request(app)
        .get("/api/not-an-endpoint")
        .expect(404)
        .then(({body}) => {
            const {message} = body
            expect(message).toBe("Endpoint Not Found!")
        })
    })
})
describe("GET /api/ Endpoints", () => {
    // test("GET /api returns status 200 and an array of all possible endpoints", () => {
    //     return request(app)
    //     .get("/api")
    //     .expect(200)
    //     .then((response) => {
    //         const body = response.body
    //         expect(body.length).toBe(endpoints.length)
    //         console.log(endpoints)
    //     })
    // })
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