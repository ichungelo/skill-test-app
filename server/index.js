const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3001

mongoose.connect("mongodb://localhost:27017/skill-test-app")

app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => res.send("TEST OK"))

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    const isValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if(isValid) {
        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }, "SECRET CODE")
        res.json({ status: "OK", user: token})
    } else { 
        res.json({ status: "ERROR", user: false })
    }
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
        res.json({ status: "OK", registered: true })
    } catch (error) {
        duplicateEmail = true
        res.json({ status: "ERROR", registered: false })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))