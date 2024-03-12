import { useRouter } from 'next/navigation'

export default function UsersPage() {

    const router = useRouter()

    function createNewUser() {
        router.push('user')
    }

    function logOut() {
        router.replace('login')
    }

    return (
        <div>
            <header>
                <h2>Usuários</h2>
                <div>
                    <button onClick={createNewUser}>Add</button>
                    <button onClick={logOut}>Sair</button>
                </div>
            </header>
        </div>
    )

}