"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import type { Movement, Position } from "@/types/animal"
import type { Food } from "@/types/food"
import type { Toy } from "@/types/toy"

interface AnimalMovementOptions {
  targetFood?: {
    food: Food
    position: Position
  } | null
  onReachFood?: (food: Food) => void
  targetToy?: {
    toy: Toy
    position: Position
    isReturning?: boolean
  } | null
  onReachToy?: (toy: Toy) => void
}

export function useAnimalMovement(containerRef: React.RefObject<HTMLDivElement>, options: AnimalMovementOptions = {}) {
  const { targetFood, onReachFood, targetToy, onReachToy } = options

  const [movement, setMovement] = useState<Movement>({
    position: { x: 50, y: 50 },
    direction: "right",
    isMoving: false,
  })

  // Refs for tracking state without causing re-renders
  const animationRef = useRef<number | null>(null)
  const isMovingRef = useRef(false)
  const currentPositionRef = useRef<Position>({ x: 50, y: 50 })
  const currentDirectionRef = useRef<"left" | "right">("right")
  const randomMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const targetRef = useRef<{
    position: Position
    onReach?: () => void
    startTime?: number
    startPosition?: Position
  } | null>(null)

  // Update refs when state changes
  useEffect(() => {
    currentPositionRef.current = movement.position
    currentDirectionRef.current = movement.direction
  }, [movement])

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (randomMoveTimeoutRef.current) {
        clearTimeout(randomMoveTimeoutRef.current)
      }
    }
  }, [])

  // Function to get a random position within the container
  const getRandomPosition = useCallback(() => {
    if (!containerRef.current) return { x: 50, y: 50 }

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()

    // Keep the animal within the boundaries (accounting for animal size)
    const maxX = containerRect.width - 100
    const maxY = containerRect.height - 100

    return {
      x: Math.max(0, Math.min(Math.random() * maxX, maxX)),
      y: Math.max(0, Math.min(Math.random() * maxY, maxY)),
    }
  }, [containerRef])

  // Stop any current animation
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    isMovingRef.current = false
    targetRef.current = null
    setMovement((prev) => ({ ...prev, isMoving: false }))
  }, [])

  // Start moving to a target position
  const moveToPosition = useCallback((targetPosition: Position, onReach?: () => void) => {
    // Stop any current animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    // Set up the new target
    const startPosition = { ...currentPositionRef.current }
    targetRef.current = {
      position: targetPosition,
      onReach,
      startTime: Date.now(),
      startPosition,
    }

    // Update direction
    const newDirection = targetPosition.x > startPosition.x ? "right" : "left"
    currentDirectionRef.current = newDirection

    // Start the animation
    isMovingRef.current = true
    setMovement({
      position: startPosition,
      direction: newDirection,
      isMoving: true,
    })

    // Define the animation function
    const animate = () => {
      if (!targetRef.current || !isMovingRef.current) return

      const { position: targetPosition, onReach, startTime, startPosition } = targetRef.current

      if (!startTime || !startPosition) return

      const duration = 2000 // 2 seconds for movement
      const currentTime = Date.now()
      const elapsedTime = currentTime - startTime

      if (elapsedTime < duration) {
        const progress = elapsedTime / duration
        // easeInOutQuad easing function
        const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

        const nextX = startPosition.x + (targetPosition.x - startPosition.x) * easeProgress
        const nextY = startPosition.y + (targetPosition.y - startPosition.y) * easeProgress

        // Update position without causing re-renders
        currentPositionRef.current = { x: nextX, y: nextY }

        // Update state (this will cause a re-render)
        setMovement({
          position: { x: nextX, y: nextY },
          direction: currentDirectionRef.current,
          isMoving: true,
        })

        // Continue animation
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Movement complete
        currentPositionRef.current = targetPosition
        setMovement({
          position: targetPosition,
          direction: currentDirectionRef.current,
          isMoving: false,
        })

        isMovingRef.current = false

        // Call onReach callback if provided
        if (onReach) {
          onReach()
        }

        targetRef.current = null
        animationRef.current = null
      }
    }

    // Start the animation
    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Move randomly
  const moveRandomly = useCallback(() => {
    if (isMovingRef.current || targetRef.current) return

    const newPosition = getRandomPosition()
    moveToPosition(newPosition)
  }, [getRandomPosition, moveToPosition])

  // Schedule random movements
  useEffect(() => {
    // If there's a target, don't move randomly
    if (targetFood || targetToy) {
      if (randomMoveTimeoutRef.current) {
        clearTimeout(randomMoveTimeoutRef.current)
        randomMoveTimeoutRef.current = null
      }
      return
    }

    // Schedule the next random movement
    const scheduleNextMove = () => {
      randomMoveTimeoutRef.current = setTimeout(
        () => {
          if (Math.random() > 0.3) {
            // 70% chance to move
            moveRandomly()
          }
          scheduleNextMove()
        },
        3000 + Math.random() * 2000,
      ) // Random interval between 3-5 seconds
    }

    scheduleNextMove()

    return () => {
      if (randomMoveTimeoutRef.current) {
        clearTimeout(randomMoveTimeoutRef.current)
      }
    }
  }, [moveRandomly, targetFood, targetToy])

  // Handle moving to food
  useEffect(() => {
    if (!targetFood) return

    // Stop any current movement
    stopAnimation()

    // Move to the food
    moveToPosition(targetFood.position, () => {
      if (onReachFood && targetFood.food) {
        onReachFood(targetFood.food)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetFood, moveToPosition, stopAnimation])

  // Handle moving to toy
  useEffect(() => {
    if (!targetToy || targetToy.isReturning) return

    // Stop any current movement
    stopAnimation()

    // Move to the toy
    moveToPosition(targetToy.position, () => {
      if (onReachToy && targetToy.toy) {
        onReachToy(targetToy.toy)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetToy, moveToPosition, stopAnimation])

  return movement
}
