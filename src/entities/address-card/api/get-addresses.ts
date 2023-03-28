import { type Address } from '../model/address.model'
import { addressesMockData } from './address.data'

interface ResponseAddressesData {
  pickPoints: Address[]
}

export const getAddressesData = async (): Promise<Address[]> => {
  const data = addressesMockData as ResponseAddressesData
  return data.pickPoints
}
