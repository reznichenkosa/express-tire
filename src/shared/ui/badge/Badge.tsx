import { type FC } from 'react'

import styles from './Badge.module.scss'

interface BadgeProps {
  title: string
}

export const Badge: FC<BadgeProps> = ({ title }) => {
  return <span className={styles.badge}>{title}</span>
}
