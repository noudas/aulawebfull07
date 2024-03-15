import React from 'react'
import { useRouter } from 'next/navigation'

import { userService } from '@/services/user.service'
import styles from './styles.module.scss'

export default function UserPage() {

    const router = useRouter()

    let name: string = ''
    let username: string = ''
    let password: string = ''
    let confirmPass: string = ''

    function goBack() {
        router.back()
    }

    function save() {
        if (!name || name.trim() === '') {
            alert('Nome é obrigatório!')
            return
        }
        if (!username || username.trim() === '') {
            alert('Login é obrigatório!')
            return
        }
        if (!password || password.trim() === '') {
            alert('Senha é obrigatório!')
            return
        }
        if (password !== confirmPass) {
            alert('Senha não confere!')
            return
        }

        const user = { name, username, password }

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

    return (
        <div className={styles.user}>
            <header>
                <h2>Cadastrar Usuário</h2>
            </header>
            <main>
                <div className={styles.inputPanel}>
                    <span>Nome: </span>
                    <input type="text" onChange={event => name = event.target.value} />
                </div>

                <div className={styles.inputPanel}>
                    <span>Login: </span>
                    <input type="text" onChange={event => username = event.target.value} />
                </div>

                <div className={styles.inputPanel}>
                    <span>Senha: </span>
                    <input type="password" onChange={event => password = event.target.value} />
                </div>

                <div className={styles.inputPanel}>
                    <span>Confirmar Senha: </span>
                    <input type="password" onChange={event => confirmPass = event.target.value} />
                </div>
            </main>

            <footer>
                <button onClick={goBack}>Cancelar</button>
                <button onClick={save}>Salvar</button>
            </footer>
        </div>
    )

}