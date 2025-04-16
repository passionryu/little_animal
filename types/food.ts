export type FoodCategory = "fruit" | "vegetable" | "insect" | "seed" | "meat" | "plant"

export interface Food {
  id: string
  name: string
  type: string
  category: FoodCategory
  energy: number
  happiness: number
  hungerReduction: number
  image: string
}

export interface FoodPosition {
  food: Food
  position: {
    x: number
    y: number
  }
}
