import { User } from "@/model/user"

import styles from './styles.module.scss'

type Props = {
    user: User
}

export default function UserItem({ user }: Props) {

    return (
        <div className={styles.item}>
            <div className={styles.title}>{ user.name }</div>
            <div className={styles.subTitle}>{ user.username }</div>
        </div>
    )

}
