const mongoose = require("mongoose");
const User = require("./models/user.model");
const UserGoogle = require("./models/google.model");


mongoose.connect("mongodb://localhost:27017/skill-test-app");

const getData = async () => {

    const user = await User.find({ loginStatus: true }, {_id: 0, firstName: 1, lastName: 1, email: 1})
    const userGoogle = await UserGoogle.find({ loginStatus: true }, {_id: 0, firstName: 1, lastName: 1, email: 1})
    const userCount = user.length
    const userGoogleCount = userGoogle.length

    const display = `
total login user: ${userCount + userGoogleCount}
total login with email: ${userCount}
list:
${user}
total login with google: ${userGoogleCount}
list:
${userGoogle}`
    console.log(display)
}

getData()