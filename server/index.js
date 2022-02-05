const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())

app.get("/test", (req, res) => res.send('hello world'))

app.post("/api/login", (req, res) => {
    console.log(req.body)
    res.json({ status: "OK"})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))