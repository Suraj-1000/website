const userRepository = require('../repositories/user.repo');

class AuthService {
    async registerUser(data) {
        // Validation could go here
        return await userRepository.create(data);
    }

    async loginUser(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return user;
    }

    async getUserById(id) {
        return await userRepository.findById(id);
    }
}

module.exports = new AuthService();
