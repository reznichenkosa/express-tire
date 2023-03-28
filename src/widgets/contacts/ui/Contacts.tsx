import { useMemo, useState, type FC } from 'react'
import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { AddressCard, useAddress, type Address } from 'entities/address-card/'

import styles from './Contacts.module.scss'

export const Contacts: FC = () => {
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const { addresses } = useAddress()

  const addressClickHandler = (address: Address): void => {
    setCurrentAddress(address)
  }

  const currentCoordinate = useMemo(() => {
    if (currentAddress) {
      return [currentAddress.latitude, currentAddress.longitude]
    }
    const commonLatitude =
      addresses.reduce((acc, address) => acc + address.latitude, 0) / addresses.length
    const commonLongitude =
      addresses.reduce((acc, address) => acc + address.longitude, 0) / addresses.length
    return [commonLatitude, commonLongitude]
  }, [currentAddress, addresses])

  return (
    <div className={styles.wrapper}>
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <AddressCard
            key={address.address}
            clickHandler={() => {
              addressClickHandler(address)
            }}
            address={address.address}
            badges={address.budgets}
            isActive={currentAddress?.address === address.address}
          />
        ))}
      </div>
      <YMaps>
        <Map
          className={styles.map}
          state={{ center: currentCoordinate, zoom: currentAddress ? 16 : 4 }}
        >
          {currentAddress ? (
            <Placemark geometry={currentCoordinate} />
          ) : (
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: false,
              }}
            >
              {addresses.map((address, index) => (
                <Placemark key={index} geometry={[address.latitude, address.longitude]} />
              ))}
            </Clusterer>
          )}
        </Map>
      </YMaps>
    </div>
  )
}
