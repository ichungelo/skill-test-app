const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const UserGoogle = require('./models/google.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const app = express()
const port = 3001
const clientId = "990147833316-g96th8dg5076njvk3e8nsac345h7atr2.apps.googleusercontent.com"
const client = new OAuth2Client(clientId)
const randomCode = "gEAijvgvDnTKOc2AmkqZhyn3fOAmWU1POYD2EHbMy2aQ7EBFFq9A7NqoHiJlUUtq"

mongoose.connect("mongodb://localhost:27017/skill-test-app")

app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => res.send("TEST OK"))

app.post("/api/login-google", async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID
    })

    const { email } = ticket.getPayload()
    const isExist = await UserGoogle.findOne({
        email: email
    })
    if (!isExist) {
        await UserGoogle.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        })
    }
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: email
    }
    const token = jwt.sign(data, randomCode)
    if (token) {
        res.json({ status: "OK", user: token})
    } else { 
        res.json({ status: "ERROR", user: false })
    }
})

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
        }, randomCode)
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
        res.json({ status: "ERROR", registered: false })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))