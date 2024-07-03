const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../domain/entities/User')

class AuthUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async register(username, email, password) {
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw new Error('User already exists')
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User(null, username, email, passwordHash)
        return this.userRepository.create(user)
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            throw new Error('Invalid credentials')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return { user, token }
    }

}

module.exports = AuthUseCase