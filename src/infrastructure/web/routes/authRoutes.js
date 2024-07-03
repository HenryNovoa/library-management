const express = require('express')
const AuthController = require('../../../interfaces/controllers/AuthController')
const AuthUseCase = require('../../../application/use-cases/auth')
const MongoUserRepository = require('../../persistence/mongodb/MongoUserRepository')

const router = express.Router()

const userRepository = new MongoUserRepository()
const authUseCase = new AuthUseCase(userRepository)
const authController = new AuthController(authUseCase)

router.post('/register', authController.register.bind(authController))
router.post('/login', authController.login.bind(authController))

module.exports = router