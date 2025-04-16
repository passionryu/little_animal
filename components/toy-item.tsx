"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Toy } from "@/types/toy"
import type { Position } from "@/types/animal"

interface ToyItemProps {
  toy: Toy
  position: Position
  isReturning?: boolean
}

export function ToyItem({ toy, position, isReturning }: ToyItemProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: isReturning ? [0, 360] : 0,
      }}
      transition={{
        duration: 0.3,
        rotate: { repeat: isReturning ? Number.POSITIVE_INFINITY : 0, duration: 1 },
      }}
    >
      <div className="relative">
        <Image
          src={toy.image || "/placeholder.svg?height=40&width=40"}
          alt={toy.name}
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
    </motion.div>
  )
}
