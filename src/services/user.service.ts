import { authRepository } from './auth.repository'
import { User } from '../model/user'

class UserService {

    private readonly urlBase = 'http://localhost:3030/users'

    public async getList() {
        const logged = authRepository.getLoggedUser()
        const token = logged ? logged.token : ''

        const response = await fetch(this.urlBase, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const list: User[] = await response.json()
            return list
        } else {
            if (response.status === 401 || response.status === 403) return null

            throw new Error(response.statusText, { cause: response.status })
        }
    }

}

export const userService = new UserService()