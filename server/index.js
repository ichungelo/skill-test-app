const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')

const app = express()
const port = 3001

mongoose.connect("mongodb://localhost:27017/skill-test-app")

app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => res.send("TEST OK"))

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    (user) ? res.json({ status: "OK", user: true}) : res.json({ status: "ERROR", user: false })
})

app.post("/api/register", async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword
        })
        res.json({ status: "OK"})
    } catch (error) {
        duplicateEmail = true
        res.json({ status: "ERROR"})
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))