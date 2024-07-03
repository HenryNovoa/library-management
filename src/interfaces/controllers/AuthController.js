class AuthController {
    constructor(authUseCase) {
        this.authUseCase = authUseCase;
    }

    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await this.authUseCase.register(username, email, password);
            res.status(201).json({ message: 'User registered successfully', userId: user.id });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.authUseCase.login(email, password);
            res.json({ message: 'Login successful', token, userId: user.id });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = AuthController;