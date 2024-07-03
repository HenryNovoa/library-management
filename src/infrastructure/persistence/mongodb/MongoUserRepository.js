const mongoose = require('mongoose')
const User = require('../../../domain/entities/User')
const UserRepository = require('../../../domain/repositories/UserRepository')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
})

const UserModel = mongoose.model('User', UserSchema);

class MongoUserRepository extends UserRepository {
    async create(user) {
        const newUser = new UserModel({
            username: user.username,
            email: user.email,
            passwordHash: user.passwordHash
        })
        await newUser.save()
        return new User(newUser._id.toString(), newUser.username, newUser.email, newUser.passwordHash)
    }

    async findByEmail(email) {
        const user = await UserModel.findOne({ email })

        return user ? new User(newUser._id.toString(), newUser.username, newUser.email, newUser.passwordHash) : null
    }

    async findById(id) {
        const user = await UserModel.findById(id)

        return user ? new User(newUser._id.toString(), newUser.username, newUser.email, newUser.passwordHash) : null
    }

}

module.exports = MongoUserRepository