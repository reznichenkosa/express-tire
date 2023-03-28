import { type FC, type KeyboardEvent } from 'react'
import { Badge } from 'shared/ui/badge/Badge'
import cn from 'classnames'

import styles from './AddressCard.module.scss'

interface AddressCardProps {
  address: string
  badges: string[]
  clickHandler: () => void
  isActive: boolean
}

export const AddressCard: FC<AddressCardProps> = ({ address, badges, isActive, clickHandler }) => {
  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.code === 'Space' || e.code === 'Enter') {
      clickHandler()
    }
  }

  return (
    <div
      role='button'
      tabIndex={0}
      onKeyDown={keyDownHandler}
      className={cn(styles.wrapper, { [styles.active]: isActive })}
      onClick={clickHandler}
    >
      <div className={styles.content}>
        <div className={styles.address}>{address}</div>
        <div className={styles.badges}>
          {badges.map((badge) => (
            <Badge key={badge} title={badge} />
          ))}
        </div>
      </div>
    </div>
  )
}
