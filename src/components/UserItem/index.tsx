import { User } from "@/model/user"

import styles from './styles.module.scss'

type Props = {
    user: User,
    edit: (id: number) => void,
    remove: (id: number) => void,
}

export default function UserItem({ user, edit, remove }: Props) {
    return (
        <div className={styles.item}>
            <div className={styles.title}>{ user.name }</div>
            <div className={styles.subTitle}>{ user.username }</div>
            <div>
                <button
                    className={styles.editButton}
                    onClick={() => edit(user.id!)}
                >
                    EDITAR
                </button>

                <button
                    className={styles.removeButton}
                    onClick={() => remove(user.id!)}
                >
                    REMOVER
                </button>
            </div>
        </div>
    )
}
