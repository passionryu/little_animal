export type ToyCategory = "ball" | "plush" | "rope" | "puzzle" | "tunnel"

export interface Toy {
  id: string
  name: string
  type: string
  category: ToyCategory
  happiness: number
  energy: number
  image: string
  description: string
}

export interface ToyPosition {
  toy: Toy
  position: {
    x: number
    y: number
  }
  isReturning?: boolean
}
