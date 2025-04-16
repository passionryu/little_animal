"use client"
import type { Animal } from "@/types/animal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface AnimalSelectorProps {
  animals: Animal[]
  selectedAnimalId: string | null
  onSelectAnimal: (animalId: string) => void
}

export function AnimalSelector({ animals, selectedAnimalId, onSelectAnimal }: AnimalSelectorProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">내 동물</h2>
      <Select value={selectedAnimalId || ""} onValueChange={onSelectAnimal}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="동물을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {animals.map((animal) => (
            <SelectItem key={animal.id} value={animal.id}>
              <div className="flex items-center gap-2">
                <Image
                  src={`/animals/${animal.type}.png`}
                  alt={animal.type}
                  width={24}
                  height={24}
                  className="object-contain"
                  onError={(e) => {
                    // 이미지 로드 실패 시 기본 이미지로 대체
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=24&width=24"
                  }}
                />
                <span>{animal.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
