const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const UserGoogle = require("./models/google.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const port = 3001;
const clientId =
  "990147833316-g96th8dg5076njvk3e8nsac345h7atr2.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);
const randomCode =
  "gEAijvgvDnTKOc2AmkqZhyn3fOAmWU1POYD2EHbMy2aQ7EBFFq9A7NqoHiJlUUtq";

mongoose.connect("mongodb://localhost:27017/skill-test-app");

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => res.send("TEST OK"));

//REGISTER
app.post("/api/register", async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
  
    const isExistGoogle = await UserGoogle.findOne({ email: req.body.email });
    const isExistUser = await User.findOne({ email: req.body.email });
  
    if (!isExistGoogle && !isExistUser) {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        loginStatus: false,
      });
      res.json({ status: "OK", registered: true });
    } else {
      res.json({ status: "ERROR", registered: false });
    }
  });
  
//LOGIN VIA GOOGLE
app.post("/api/login-google", async (req, res) => {
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: process.env.CLIENT_ID,
  });

  const { email } = ticket.getPayload();
  const isExistGoogle = await UserGoogle.findOne({ email: email });
  const isExistUser = await User.findOne({ email: email });
  if (!isExistUser) {
    if (!isExistGoogle) {
      await UserGoogle.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        loginStatus: true,
      });
    } else {
      await UserGoogle.updateOne({ email: email }, { loginStatus: true });
    }
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: email,
    };
    const token = jwt.sign(data, randomCode);
    if (token) {
      res.json({ status: "OK", user: token });
    } else {
      res.json({ status: "ERROR", user: false });
    }
  } else {
    res.json({ status: "ERROR", user: false });
  }
});

//LOGIN EMAIL
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (isValid) {
    await User.updateOne({ email: user.email }, { loginStatus: true });
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      randomCode
    );
    res.json({ status: "OK", user: token });
  } else {
    res.json({ status: "ERROR", user: false });
  }
});

//LOGOUT
app.post("/api/logout", async (req, res) => {
    const logout = await User.findOne({
        email: req.body.email
    }) 
    const logoutGoogle = await UserGoogle.findOne({
        email: req.body.email
    })
    console.log(req.body.email)

    if (logout) {
        await User.updateOne({ email: req.body.email }, { loginStatus: false });
        res.json({ status: "OK", success: true });
    } else if (logoutGoogle) {
        await UserGoogle.updateOne({ email: req.body.email }, { loginStatus: false });
        res.json({ status: "OK", success: true });
    } else {
        res.json({ status: "ERROR", success: false });
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
