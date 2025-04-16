export type AnimalType = "hedgehog" | "rabbit" | "quokka" | "hamster" | "guinea-pig"

export interface Animal {
  id: string
  type: AnimalType
  name: string
  happiness: number
  energy: number
  hunger: number
}

export interface Position {
  x: number
  y: number
}

export interface Movement {
  position: Position
  direction: "left" | "right"
  isMoving: boolean
}
