const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3,
        max:15,
        unique:true
    },
    email: {
        type: String,
        required: true,
        min:8,
        max:55
    },
    password: {
        type: String,
        required: true,
        min:8,
        max:255
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    },
})
module.exports = mongoose.model('Users', userSchema)


