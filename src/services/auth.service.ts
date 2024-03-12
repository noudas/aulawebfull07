import { User } from "@/model/user"
import { authRepository } from './auth.repository'

class AuthService {

    private readonly urlBase = 'http://localhost:3030/auth'

    public async login(username: string, password: string) {
        const response = await fetch(`${this.urlBase}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const logged: User = await response.json()

        if (logged && logged.token) {
            authRepository.setLoggedUser(logged)
            return true
        } else {
            return false
        }
    }

}

export const authService = new AuthService()
