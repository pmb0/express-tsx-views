import { createContext } from 'react'

export interface MyContextProps {
  id: number
  name: string
}

export const MyContext = createContext<MyContextProps | undefined>(undefined)

export interface MyContext2Props {
  someProperty: string
}

export const MyContext2 = createContext<MyContext2Props | undefined>(undefined)
