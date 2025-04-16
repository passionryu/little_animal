"use client"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Food } from "@/types/food"
import { animalFoods } from "@/data/foods"
import type { AnimalType } from "@/types/animal"

interface FoodSelectorProps {
  isOpen: boolean
  onClose: () => void
  animalType: AnimalType
  onSelectFood: (food: Food) => void
}

export function FoodSelector({ isOpen, onClose, animalType, onSelectFood }: FoodSelectorProps) {
  const foods = animalFoods[animalType] || []

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>먹이 선택</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          {foods.map((food) => (
            <Button
              key={food.id}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => {
                onSelectFood(food)
                onClose()
              }}
            >
              <div className="w-16 h-16 relative mb-2">
                <Image
                  src={food.image || "/placeholder.svg?height=64&width=64"}
                  alt={food.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // 이미지 로드 실패 시 기본 이미지로 대체
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=64&width=64"
                  }}
                />
              </div>
              <span className="text-sm font-medium">{food.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
