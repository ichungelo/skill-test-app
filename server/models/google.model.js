const mongoose = require('mongoose')

const UserGoogle = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
    },{
        collection: "user-data-google"
    }
)

const model = mongoose.model(
    "UserDataGoogle",
    UserGoogle
)

module.exports = model