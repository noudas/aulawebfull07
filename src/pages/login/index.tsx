import React from 'react'
import { useRouter } from 'next/navigation'

import { authService } from '../../services/auth.service'
import styles from './styles.module.scss'

export default function LoginPage() {

    const router = useRouter()

    let username: string = ''
    let password: string = ''

    async function login() {
        const isLogged = await authService.login(username, password)
        if (isLogged) {
            router.replace('users')
        } else {
            alert('Usuário/senha inválido(a)')
        }
    }

    return (
        <div className={styles.login}>
            <header>
                <h2>Acesso ao Sistema</h2>
            </header>
            <main>
                <div className={styles.inputPanel}>
                    <span>Usuário: </span>
                    <input type="text" onChange={event => username = event.target.value} />
                </div>

                <div className={styles.inputPanel}>
                    <span>Senha: </span>
                    <input type="password" onChange={event => password = event.target.value} />
                </div>
            </main>

            <footer>
                <button onClick={login}>Entrar</button>
            </footer>
        </div>
    )

}