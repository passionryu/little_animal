"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import type { AnimalType } from "@/types/animal"
import { useAnimalMovement } from "@/hooks/use-animal-movement"
import { cn } from "@/lib/utils"
import type { FoodPosition } from "@/types/food"
import type { ToyPosition } from "@/types/toy"
import { PetEffect } from "./pet-effect"

interface AnimalProps {
  type: AnimalType
  name: string
  targetFood?: FoodPosition | null
  targetToy?: ToyPosition | null
  onReachFood?: (foodId: string) => void
  onReachToy?: (toyId: string) => void
  onPet?: () => void
}

export function Animal({ type, name, targetFood, targetToy, onReachFood, onReachToy, onPet }: AnimalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPetting, setIsPetting] = useState(false)
  const [petEffects, setPetEffects] = useState<Array<{ id: number; x: number; y: number }>>([])

  // 먹이나 장난감 중 하나만 타겟으로 설정
  const target = targetFood || targetToy

  const { position, direction, isMoving } = useAnimalMovement(containerRef, {
    targetFood: targetFood,
    onReachFood: targetFood && onReachFood ? (food) => onReachFood(food.id) : undefined,
    targetToy: targetToy,
    onReachToy: targetToy && onReachToy ? (toy) => onReachToy(toy.id) : undefined,
  })

  const animalImages = {
    hedgehog: "/animals/hedgehog.png",
    rabbit: "/animals/rabbit.png",
    quokka: "/animals/quokka.png",
    hamster: "/animals/hamster.png",
    "guinea-pig": "/animals/guinea-pig.png",
  }

  // 동물 쓰다듬기 핸들러
  const handlePet = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMoving || isPetting) return // 이동 중이거나 이미 쓰다듬는 중이면 무시

    // 클릭 위치에 이펙트 추가
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsPetting(true)
    setPetEffects([...petEffects, { id: Date.now(), x, y }])

    // 쓰다듬기 콜백 호출
    if (onPet) onPet()

    // 쓰다듬기 애니메이션
    setTimeout(() => {
      setIsPetting(false)
    }, 1000)
  }

  // 이펙트 제거 핸들러
  const handleEffectComplete = (id: number) => {
    setPetEffects(petEffects.filter((effect) => effect.id !== id))
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div
        className="absolute transition-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scaleX(${direction === "left" ? -1 : 1})`,
        }}
      >
        <div className={cn("relative", isMoving && "animate-bounce", isPetting && "animate-pulse")} onClick={handlePet}>
          <Image
            src={animalImages[type] || "/placeholder.svg?height=120&width=120"}
            alt={name}
            width={120}
            height={120}
            className={cn(
              "drop-shadow-md object-contain cursor-pointer",
              !isMoving && !target && "hover:scale-105 transition-transform",
            )}
            onError={(e) => {
              // 이미지 로드 실패 시 기본 이미지로 대체
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=120&width=120"
            }}
          />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 px-2 py-0.5 rounded-full text-xs font-medium">
            {name}
          </div>
        </div>
      </div>

      {/* 쓰다듬기 이펙트 */}
      {petEffects.map((effect) => (
        <PetEffect
          key={effect.id}
          position={{ x: position.x + effect.x, y: position.y + effect.y - 30 }}
          onComplete={() => handleEffectComplete(effect.id)}
        />
      ))}
    </div>
  )
}
