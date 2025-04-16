"use client"

import Image from "next/image"
import type { Food } from "@/types/food"
import type { Position } from "@/types/animal"

interface FoodItemProps {
  food: Food
  position: Position
}

export function FoodItem({ food, position }: FoodItemProps) {
  return (
    <div
      className="absolute transition-opacity"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="relative">
        <Image
          src={food.image || "/placeholder.svg?height=40&width=40"}
          alt={food.name}
          width={40}
          height={40}
          className="object-contain drop-shadow-md"
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 대체
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=40&width=40"
          }}
        />
      </div>
    </div>
  )
}
