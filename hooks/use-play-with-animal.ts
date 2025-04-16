"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import type { Toy, ToyPosition } from "@/types/toy"
import { toast } from "@/hooks/use-toast"

interface PlayWithAnimalOptions {
  containerRef: React.RefObject<HTMLDivElement>
  onPlayComplete?: (toy: Toy) => void
}

export function usePlayWithAnimal({ containerRef, onPlayComplete }: PlayWithAnimalOptions) {
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null)
  const [placedToy, setPlacedToy] = useState<ToyPosition | null>(null)
  const [isPlacingToy, setIsPlacingToy] = useState(false)
  const [isToyReturning, setIsToyReturning] = useState(false)
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleToySelect = useCallback((toy: Toy) => {
    setSelectedToy(toy)
    setIsPlacingToy(true)
    toast({
      title: "장난감을 놓을 위치를 클릭하세요",
      description: `${toy.name}을(를) 놓을 위치를 놀이터에서 클릭하세요.`,
    })
  }, [])

  const handlePlaygroundClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isPlacingToy || !selectedToy || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Place toy at the clicked position
      setPlacedToy({
        toy: selectedToy,
        position: { x, y },
      })
      setIsPlacingToy(false)

      toast({
        title: "장난감을 놓았습니다",
        description: `동물이 ${selectedToy.name}을(를) 가지러 갑니다.`,
      })
    },
    [isPlacingToy, selectedToy, containerRef],
  )

  const handleReachToy = useCallback(
    (toyId: string) => {
      if (!placedToy) return

      // 동물이 장난감에 도달했을 때
      toast({
        title: "놀이 시작!",
        description: `동물이 ${placedToy.toy.name}을(를) 가지고 놀고 있습니다.`,
      })

      // 일정 시간 동안 놀이 후 장난감 반환
      playTimeoutRef.current = setTimeout(() => {
        setIsToyReturning(true)

        // 장난감 반환 후 놀이 완료
        setTimeout(() => {
          if (onPlayComplete && placedToy) {
            onPlayComplete(placedToy.toy)
          }
          setPlacedToy(null)
          setIsToyReturning(false)
        }, 2000) // 2초 후 장난감 반환 완료
      }, 3000) // 3초 동안 놀이
    },
    [placedToy, onPlayComplete],
  )

  const resetPlay = useCallback(() => {
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current)
    }
    setSelectedToy(null)
    setPlacedToy(null)
    setIsPlacingToy(false)
    setIsToyReturning(false)
  }, [])

  return {
    selectedToy,
    placedToy: placedToy
      ? {
          ...placedToy,
          isReturning: isToyReturning,
        }
      : null,
    isPlacingToy,
    handleToySelect,
    handlePlaygroundClick,
    handleReachToy,
    resetPlay,
  }
}
