import React from 'react'
import { useRouter } from 'next/navigation'

import { userService } from '@/services/user.service'
import { authRepository } from '@/services/auth.repository'
import { User } from '@/model/user'

import UserItem from '@/components/UserItem'
import styles from './styles.module.scss'

export default function UsersPage() {

    const router = useRouter()

    const [users, setUsers] = React.useState<User[]>([])

    function createNewUser() {
        router.push(`users/create`)
    }

    function logOut() {
        authRepository.removeLoggedUser()
        router.replace('login')
    }

    function fetchUsers() {
        userService.getList().then(list => {
            if (list) {
                setUsers(list)
            } else {
                logOut()
            }
        }).catch((error: Error) => {
            console.error('Error: ', error)
        })
    }

    function edit(id: number) {
        router.push(`users/${id}`)
    }

    function remove(id: number) {
        userService.delete(id).then(isSaved => {
            if (isSaved === null) logOut()
            if (isSaved) fetchUsers()
        })
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className={styles.users}>
            <header>
                <h2>Usuários</h2>
                <div className={styles.actions}>
                    <button onClick={createNewUser}>Add</button>
                    <button onClick={logOut}>Sair</button>
                </div>
            </header>
            <main>
                {
                    users.map(user => (
                        <UserItem key={user.id} user={user} edit={edit} remove={remove} />
                    ))
                }
            </main>
        </div>
    )

}