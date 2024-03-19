import { User } from "@/model/user"

class AuthRepository {

    private readonly storeKey = '@auth:LOGGED_USER'

    public getLoggedUser() {
        const json = localStorage.getItem(this.storeKey)
        if (json) return JSON.parse(json) as User
        return null
    }

    public setLoggedUser(user: User) {
        localStorage.setItem(this.storeKey, JSON.stringify(user))
    }

    public removeLoggedUser() {
        localStorage.removeItem(this.storeKey)
    }

}

export const authRepository = new AuthRepository()