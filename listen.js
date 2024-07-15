const app = express()

app.listen(9082, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Listening on 9082")
    }
})