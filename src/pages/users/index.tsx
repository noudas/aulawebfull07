import React from 'react'
import { useRouter } from 'next/navigation'

import { userService } from '@/services/user.service'
import { User } from '@/model/user'

export default function UsersPage() {

    const router = useRouter()

    const [users, setUsers] = React.useState<User[]>([])

    function createNewUser() {
        router.push('user')
    }

    function logOut() {
        router.replace('login')
    }

    React.useEffect(() => {
        userService.getList().then(list => {
            if (list) {
                setUsers(list)
            } else {
                logOut()
            }
        }).catch((error: Error) => {
            console.error('Error: ', error)
        })
    }, [])

    return (
        <div>
            <header>
                <h2>Usuários</h2>
                <div>
                    <button onClick={createNewUser}>Add</button>
                    <button onClick={logOut}>Sair</button>
                </div>

                <div>
                    Temos {users.length} usuários cadastrados
                </div>

            </header>
        </div>
    )

}