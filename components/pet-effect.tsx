"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface PetEffectProps {
  position: { x: number; y: number }
  onComplete?: () => void
}

export function PetEffect({ position, onComplete }: PetEffectProps) {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // 하트 이펙트 생성
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20, // -20 ~ 20 범위의 랜덤 x 오프셋
      y: Math.random() * -30 - 10, // -40 ~ -10 범위의 랜덤 y 오프셋 (위쪽으로)
    }))

    setHearts(newHearts)

    // 애니메이션 완료 후 콜백 호출
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 1000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: heart.x,
            y: heart.y,
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="absolute"
        >
          <Heart className="text-pink-500 fill-pink-500" size={16} />
        </motion.div>
      ))}
    </div>
  )
}
