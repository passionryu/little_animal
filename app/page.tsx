"use client"

import { useState } from "react"
import { Playground } from "@/components/playground"
import { Button } from "@/components/ui/button"
import type { Animal } from "@/types/animal"
import { Heart } from "lucide-react"

// 임시 데이터 - 실제로는 API나 데이터베이스에서 가져올 것입니다
const mockAnimals: Animal[] = [
  {
    id: "1",
    type: "hedgehog",
    name: "고슴이",
    happiness: 80,
    energy: 70,
    hunger: 30,
  },
  {
    id: "2",
    type: "rabbit",
    name: "토순이",
    happiness: 90,
    energy: 85,
    hunger: 20,
  },
  {
    id: "3",
    type: "quokka",
    name: "쿼키",
    happiness: 95,
    energy: 75,
    hunger: 40,
  },
  {
    id: "4",
    type: "hamster",
    name: "햄토리",
    happiness: 85,
    energy: 90,
    hunger: 25,
  },
]

export default function Home() {
  const [userAnimals, setUserAnimals] = useState<Animal[]>(mockAnimals)
  const [isFoodSelectorOpen, setIsFoodSelectorOpen] = useState(false)
  const [isToySelecterOpen, setIsToySelecterOpen] = useState(false)
  const [isPettingMode, setIsPettingMode] = useState(false)

  const handleUpdateAnimal = (animalId: string, updates: Partial<Animal>) => {
    setUserAnimals((prevAnimals) =>
      prevAnimals.map((animal) => (animal.id === animalId ? { ...animal, ...updates } : animal)),
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-5xl mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">소동물 놀이터</h1>
      </header>

      <div className="w-full max-w-5xl h-[70vh] mb-6 relative">
        {isPettingMode && (
          <div className="absolute inset-0 z-10 bg-pink-100/30 rounded-lg flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 px-4 py-2 rounded-full text-pink-500 font-medium animate-pulse">
              동물을 클릭하여 쓰다듬어주세요!
            </div>
          </div>
        )}
        <Playground
          userAnimals={userAnimals}
          onUpdateAnimal={handleUpdateAnimal}
          isFoodSelectorOpen={isFoodSelectorOpen}
          setIsFoodSelectorOpen={setIsFoodSelectorOpen}
          isToySelecterOpen={isToySelecterOpen}
          setIsToySelecterOpen={setIsToySelecterOpen}
        />
      </div>

      <footer className="w-full max-w-5xl mt-auto">
        <div className="flex justify-center gap-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
            onClick={() => setIsFoodSelectorOpen(true)}
          >
            먹이주기
          </Button>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
            onClick={() => setIsToySelecterOpen(true)}
          >
            놀아주기
          </Button>
          <Button
            className={`${
              isPettingMode ? "bg-pink-600 hover:bg-pink-700" : "bg-pink-500 hover:bg-pink-600"
            } text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2`}
            onClick={() => setIsPettingMode(!isPettingMode)}
          >
            <Heart size={18} className={isPettingMode ? "fill-white" : ""} />
            쓰다듬기
            {isPettingMode && <span className="text-xs">(활성화됨)</span>}
          </Button>
        </div>
      </footer>
    </main>
  )
}
