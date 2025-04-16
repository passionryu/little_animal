"use client"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Toy } from "@/types/toy"
import { animalToys } from "@/data/toys"
import type { AnimalType } from "@/types/animal"

interface ToySelectorProps {
  isOpen: boolean
  onClose: () => void
  animalType: AnimalType
  onSelectToy: (toy: Toy) => void
}

export function ToySelector({ isOpen, onClose, animalType, onSelectToy }: ToySelectorProps) {
  const toys = animalToys[animalType] || []

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>장난감 선택</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
          {toys.map((toy) => (
            <Button
              key={toy.id}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => {
                onSelectToy(toy)
                onClose()
              }}
            >
              <div className="w-16 h-16 relative mb-2">
                <Image
                  src={toy.image || "/placeholder.svg?height=64&width=64"}
                  alt={toy.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // 이미지 로드 실패 시 기본 이미지로 대체
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=64&width=64"
                  }}
                />
              </div>
              <span className="text-sm font-medium">{toy.name}</span>
              <p className="text-xs text-muted-foreground mt-1">{toy.description}</p>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
