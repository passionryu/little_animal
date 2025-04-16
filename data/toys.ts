import type { Toy } from "@/types/toy"
import type { AnimalType } from "@/types/animal"

// 모든 장난감 데이터
export const allToys: Toy[] = [
  // 고슴도치 장난감
  {
    id: "hedgehog-ball",
    name: "작은 공",
    type: "ball",
    category: "ball",
    happiness: 15,
    energy: -10,
    image: "/toys/small-ball.png",
    description: "고슴도치가 굴리며 놀 수 있는 작은 공입니다.",
  },
  {
    id: "hedgehog-tunnel",
    name: "터널",
    type: "tunnel",
    category: "tunnel",
    happiness: 20,
    energy: -15,
    image: "/toys/tunnel.png",
    description: "고슴도치가 안에 숨거나 통과하며 놀 수 있는 터널입니다.",
  },
  {
    id: "hedgehog-plush",
    name: "인형",
    type: "plush",
    category: "plush",
    happiness: 10,
    energy: -5,
    image: "/toys/plush.png",
    description: "고슴도치가 안전하게 가지고 놀 수 있는 부드러운 인형입니다.",
  },

  // 토끼 장난감
  {
    id: "rabbit-ball",
    name: "방울 공",
    type: "ball",
    category: "ball",
    happiness: 15,
    energy: -10,
    image: "/toys/bell-ball.png",
    description: "토끼가 굴리면 소리가 나는 방울 공입니다.",
  },
  {
    id: "rabbit-tunnel",
    name: "터널",
    type: "tunnel",
    category: "tunnel",
    happiness: 25,
    energy: -20,
    image: "/toys/tunnel.png",
    description: "토끼가 뛰어다니며 놀 수 있는 긴 터널입니다.",
  },
  {
    id: "rabbit-puzzle",
    name: "간식 퍼즐",
    type: "puzzle",
    category: "puzzle",
    happiness: 20,
    energy: -15,
    image: "/toys/puzzle.png",
    description: "토끼가 간식을 찾기 위해 풀어야 하는 퍼즐 장난감입니다.",
  },

  // 쿼카 장난감
  {
    id: "quokka-ball",
    name: "공",
    type: "ball",
    category: "ball",
    happiness: 20,
    energy: -15,
    image: "/toys/ball.png",
    description: "쿼카가 굴리며 놀 수 있는 공입니다.",
  },
  {
    id: "quokka-plush",
    name: "인형",
    type: "plush",
    category: "plush",
    happiness: 15,
    energy: -10,
    image: "/toys/plush.png",
    description: "쿼카가 안고 놀 수 있는 부드러운 인형입니다.",
  },
  {
    id: "quokka-rope",
    name: "로프",
    type: "rope",
    category: "rope",
    happiness: 18,
    energy: -12,
    image: "/toys/rope.png",
    description: "쿼카가 당기며 놀 수 있는 로프 장난감입니다.",
  },

  // 햄스터 장난감
  {
    id: "hamster-ball",
    name: "작은 공",
    type: "ball",
    category: "ball",
    happiness: 12,
    energy: -8,
    image: "/toys/small-ball.png",
    description: "햄스터가 굴리며 놀 수 있는 작은 공입니다.",
  },
  {
    id: "hamster-wheel",
    name: "쳇바퀴",
    type: "wheel",
    category: "puzzle",
    happiness: 25,
    energy: -20,
    image: "/toys/wheel.png",
    description: "햄스터가 달리며 놀 수 있는 쳇바퀴입니다.",
  },
  {
    id: "hamster-tunnel",
    name: "미로 터널",
    type: "tunnel",
    category: "tunnel",
    happiness: 20,
    energy: -15,
    image: "/toys/maze.png",
    description: "햄스터가 탐험하며 놀 수 있는 미로 터널입니다.",
  },

  // 기니피그 장난감
  {
    id: "guinea-pig-ball",
    name: "방울 공",
    type: "ball",
    category: "ball",
    happiness: 15,
    energy: -10,
    image: "/toys/bell-ball.png",
    description: "기니피그가 굴리며 놀 수 있는 방울 공입니다.",
  },
  {
    id: "guinea-pig-tunnel",
    name: "터널",
    type: "tunnel",
    category: "tunnel",
    happiness: 20,
    energy: -15,
    image: "/toys/tunnel.png",
    description: "기니피그가 뛰어다니며 놀 수 있는 터널입니다.",
  },
  {
    id: "guinea-pig-plush",
    name: "인형",
    type: "plush",
    category: "plush",
    happiness: 12,
    energy: -8,
    image: "/toys/plush.png",
    description: "기니피그가 안고 놀 수 있는 부드러운 인형입니다.",
  },
]

// 동물별 장난감 매핑
export const animalToys: Record<AnimalType, Toy[]> = {
  hedgehog: allToys.filter((toy) => ["hedgehog-ball", "hedgehog-tunnel", "hedgehog-plush"].includes(toy.id)),
  rabbit: allToys.filter((toy) => ["rabbit-ball", "rabbit-tunnel", "rabbit-puzzle"].includes(toy.id)),
  quokka: allToys.filter((toy) => ["quokka-ball", "quokka-plush", "quokka-rope"].includes(toy.id)),
  hamster: allToys.filter((toy) => ["hamster-ball", "hamster-wheel", "hamster-tunnel"].includes(toy.id)),
  "guinea-pig": allToys.filter((toy) => ["guinea-pig-ball", "guinea-pig-tunnel", "guinea-pig-plush"].includes(toy.id)),
}
