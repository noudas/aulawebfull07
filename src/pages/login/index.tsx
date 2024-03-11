import React from 'react'
import styles from './styles.module.scss'

export default function LoginPage() {

    let username: string = ''
    let password: string = ''

    function login() {
        if (username === 'uedsonreis' && password === '123456') {
            alert('Usuário logado com sucesso')
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