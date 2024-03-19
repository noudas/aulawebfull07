import React from 'react'
import { useRouter } from 'next/navigation'

import UserItem from '@/components/UserItem'
import { userService } from '@/services/user.service'
import { User } from '@/model/user'

import styles from './styles.module.scss'

export default function UsersPage() {

    const router = useRouter()

    const [users, setUsers] = React.useState<User[]>([])

    function createNewUser() {
        router.push(`users/create`)
    }

    function logOut() {
        router.replace('login')
    }

    function edit(id: number) {
        router.push(`users/${id}`)
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
                        <UserItem key={user.id} user={user} edit={edit} />
                    ))
                }
            </main>
        </div>
    )

}