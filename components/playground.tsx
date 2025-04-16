"use client"

import React from "react"

import { useState, useRef } from "react"
import { Animal as AnimalComponent } from "@/components/animal"
import { AnimalSelector } from "@/components/animal-selector"
import { FoodSelector } from "@/components/food-selector"
import { ToySelector } from "@/components/toy-selector"
import { FoodItem } from "@/components/food-item"
import { ToyItem } from "@/components/toy-item"
import { usePlayWithAnimal } from "@/hooks/use-play-with-animal"
import type { Animal } from "@/types/animal"
import type { Food, FoodPosition } from "@/types/food"
import { toast } from "@/hooks/use-toast"

interface PlaygroundProps {
  userAnimals: Animal[]
  onUpdateAnimal?: (animalId: string, updates: Partial<Animal>) => void
  isFoodSelectorOpen: boolean
  setIsFoodSelectorOpen: (isOpen: boolean) => void
  isToySelecterOpen: boolean
  setIsToySelecterOpen: (isOpen: boolean) => void
}

export function Playground({
  userAnimals,
  onUpdateAnimal,
  isFoodSelectorOpen,
  setIsFoodSelectorOpen,
  isToySelecterOpen,
  setIsToySelecterOpen,
}: PlaygroundProps) {
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(
    userAnimals.length > 0 ? userAnimals[0].id : null,
  )
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [placedFood, setPlacedFood] = useState<FoodPosition | null>(null)
  const [isPlacingFood, setIsPlacingFood] = useState(false)
  const [grassPatternLoaded, setGrassPatternLoaded] = useState(false)
  const [petCooldown, setPetCooldown] = useState<Record<string, boolean>>({})

  const playgroundRef = useRef<HTMLDivElement>(null)

  const selectedAnimal = userAnimals.find((animal) => animal.id === selectedAnimalId)

  // 먹이 관련 핸들러
  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food)
    setIsPlacingFood(true)
    toast({
      title: "먹이를 놓을 위치를 클릭하세요",
      description: `${food.name}을(를) 놓을 위치를 놀이터에서 클릭하세요.`,
    })
  }

  const handleFoodClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlacingFood || !selectedFood || !playgroundRef.current) return

    const rect = playgroundRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Place food at the clicked position
    setPlacedFood({
      food: selectedFood,
      position: { x, y },
    })
    setIsPlacingFood(false)

    toast({
      title: "먹이를 놓았습니다",
      description: `${selectedAnimal?.name}이(가) ${selectedFood.name}을(를) 먹으러 갑니다.`,
    })
  }

  const handleReachFood = (foodId: string) => {
    if (!placedFood || !selectedAnimal) return

    // Update animal stats
    if (onUpdateAnimal) {
      const { food } = placedFood
      onUpdateAnimal(selectedAnimal.id, {
        hunger: Math.max(0, selectedAnimal.hunger - food.hungerReduction),
        happiness: Math.min(100, selectedAnimal.happiness + food.happiness),
        energy: Math.min(100, selectedAnimal.energy + food.energy),
      })
    }

    toast({
      title: "맛있게 먹었어요!",
      description: `${selectedAnimal.name}이(가) ${placedFood.food.name}을(를) 맛있게 먹었습니다.`,
    })

    // Remove the food
    setPlacedFood(null)
  }

  // 놀이 관련 로직
  const { placedToy, isPlacingToy, handleToySelect, handlePlaygroundClick, handleReachToy } = usePlayWithAnimal({
    containerRef: playgroundRef,
    onPlayComplete: (toy) => {
      if (!selectedAnimal) return

      // Update animal stats after playing
      if (onUpdateAnimal) {
        onUpdateAnimal(selectedAnimal.id, {
          happiness: Math.min(100, selectedAnimal.happiness + toy.happiness),
          energy: Math.max(0, selectedAnimal.energy + toy.energy), // 에너지 소모
        })
      }

      toast({
        title: "놀이 완료!",
        description: `${selectedAnimal.name}이(가) ${toy.name}을(를) 가지고 즐겁게 놀았습니다.`,
      })
    },
  })

  // 쓰다듬기 핸들러
  const handlePet = () => {
    if (!selectedAnimal || petCooldown[selectedAnimal.id]) return

    // 쓰다듬기 쿨다운 설정 (3초)
    setPetCooldown((prev) => ({ ...prev, [selectedAnimal.id]: true }))
    setTimeout(() => {
      setPetCooldown((prev) => ({ ...prev, [selectedAnimal.id]: false }))
    }, 3000)

    // 행복도 증가
    if (onUpdateAnimal) {
      onUpdateAnimal(selectedAnimal.id, {
        happiness: Math.min(100, selectedAnimal.happiness + 5),
      })
    }

    toast({
      title: "쓰다듬기 성공!",
      description: `${selectedAnimal.name}이(가) 행복해합니다.`,
    })
  }

  // 클릭 이벤트 통합 핸들러
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPlacingFood) {
      handleFoodClick(e)
    } else if (isPlacingToy) {
      handlePlaygroundClick(e)
    }
  }

  // 배경 이미지 미리 로드
  React.useEffect(() => {
    const img = new Image()
    img.src = "/grass-pattern.png"
    img.onload = () => setGrassPatternLoaded(true)
    img.onerror = () => {
      console.error("Failed to load grass pattern image")
      setGrassPatternLoaded(true) // 로드 실패해도 UI는 표시
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <AnimalSelector
          animals={userAnimals}
          selectedAnimalId={selectedAnimalId}
          onSelectAnimal={setSelectedAnimalId}
        />
      </div>

      <div
        ref={playgroundRef}
        className={`flex-1 bg-gradient-to-b from-green-100 to-green-200 rounded-lg overflow-hidden border-2 border-green-300 shadow-inner relative ${
          isPlacingFood || isPlacingToy ? "cursor-crosshair" : ""
        }`}
        onClick={handleClick}
      >
        {/* 잔디 패턴 배경 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: grassPatternLoaded ? "url(/grass-pattern.png)" : "none",
            backgroundColor: !grassPatternLoaded ? "#e0f2e0" : "transparent",
          }}
        ></div>

        {/* 배치된 먹이 */}
        {placedFood && <FoodItem food={placedFood.food} position={placedFood.position} />}

        {/* 배치된 장난감 */}
        {placedToy && <ToyItem toy={placedToy.toy} position={placedToy.position} isReturning={placedToy.isReturning} />}

        {selectedAnimal ? (
          <AnimalComponent
            type={selectedAnimal.type}
            name={selectedAnimal.name}
            targetFood={placedFood}
            targetToy={placedToy}
            onReachFood={handleReachFood}
            onReachToy={handleReachToy}
            onPet={handlePet}
          />
        ) : (
          <div className="flex items-center justify-center h-full relative z-10">
            <p className="text-gray-500">동물을 선택해주세요</p>
          </div>
        )}
      </div>

      {/* 먹이 선택 다이얼로그 */}
      {selectedAnimal && (
        <FoodSelector
          isOpen={isFoodSelectorOpen}
          onClose={() => setIsFoodSelectorOpen(false)}
          animalType={selectedAnimal.type}
          onSelectFood={handleFoodSelect}
        />
      )}

      {/* 장난감 선택 다이얼로그 */}
      {selectedAnimal && (
        <ToySelector
          isOpen={isToySelecterOpen}
          onClose={() => setIsToySelecterOpen(false)}
          animalType={selectedAnimal.type}
          onSelectToy={handleToySelect}
        />
      )}
    </div>
  )
}
