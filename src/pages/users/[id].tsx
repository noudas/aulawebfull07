import React from 'react'
import { useRouter, useParams } from 'next/navigation'

import TextInput from '@/components/TextInput'
import { userService } from '@/services/user.service'
import styles from './styles.module.scss'
import { User } from '@/model/user'

export default function UserPage() {

    const router = useRouter()
    const params = useParams()

    const [user, setUser] = React.useState<User>({
        name:'', username: '', password: ''
    })

    let confirmPass: string = ''

    React.useEffect(() => {
        if (params && params.id && params.id !== 'create') {
            userService.get(Number(params.id)).then(saved => {
                if (saved) setUser(saved)
                else goBack()
            })
        }
    }, [params.id])

    function goBack() {
        router.back()
    }

    function save() {
        if (!user.name || user.name.trim() === '') {
            alert('Nome é obrigatório!')
            return
        }

        if (user.id) {
            userService.update(user.id!, user.name).then(isSaved => {
                if (isSaved) {
                    goBack()
                } else {
                    router.replace('login')
                }
            }).catch(error => {
                alert(error.message)
            })

        } else {
            if (!user.username || user.username.trim() === '') {
                alert('Login é obrigatório!')
                return
            }
            if (!user.password || user.password.trim() === '') {
                alert('Senha é obrigatório!')
                return
            }
            if (user.password !== confirmPass) {
                alert('Senha não confere!')
                return
            }

            userService.create(user).then(isSaved => {
                if (isSaved) {
                    goBack()
                } else {
                    router.replace('login')
                }
            }).catch(error => {
                alert(error.message)
            })
        }
    }

    return (
        <div className={styles.user}>
            <header>
                <h2>{user.id ? `Editar Usuário Id ${user.id}` : 'Cadastrar Usuário'}</h2>
            </header>
            <main>
                <TextInput
                    type="text"
                    label='Nome'
                    value={user.name}
                    change={value => setUser({ ...user, name: value })}
                />

                <TextInput
                    type="text"
                    label='Login'
                    disable={!!user.id}
                    value={user.username}
                    change={value => setUser({ ...user, username: value })}
                />

                { !user.id && (
                    <>
                        <TextInput
                            type="password"
                            label='Senha'
                            change={value => setUser({ ...user, password: value })}
                        />
                        
                        <TextInput
                            type="password"
                            label='Confirmar Senha'
                            change={value => confirmPass = value}
                        />
                    </>
                )}
            </main>

            <footer>
                <button onClick={goBack}>Cancelar</button>
                <button className='confirmButton' onClick={save}>Salvar</button>
            </footer>
        </div>
    )

}