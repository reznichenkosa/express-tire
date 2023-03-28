import { useEffect, useState } from 'react'
import { getAddressesData } from '../api/get-addresses'
import { type Address } from './address.model'

export const useAddress = (): { addresses: Address[] } => {
  const [addresses, setAddresses] = useState<Address[]>([])

  useEffect(() => {
    getAddressesData()
      .then((data) => {
        setAddresses(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return {
    addresses,
  }
}
