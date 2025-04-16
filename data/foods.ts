import type { Food } from "@/types/food"
import type { AnimalType } from "@/types/animal"

// 모든 먹이 데이터
export const allFoods: Food[] = [
  // 고슴도치 먹이
  {
    id: "hedgehog-insect",
    name: "곤충",
    type: "insect",
    category: "insect",
    energy: 10,
    happiness: 15,
    hungerReduction: 20,
    image: "/foods/insect.png",
  },
  {
    id: "hedgehog-fruit",
    name: "과일",
    type: "apple",
    category: "fruit",
    energy: 8,
    happiness: 10,
    hungerReduction: 15,
    image: "/foods/apple.png",
  },
  {
    id: "hedgehog-worm",
    name: "지렁이",
    type: "worm",
    category: "insect",
    energy: 12,
    happiness: 18,
    hungerReduction: 25,
    image: "/foods/worm.png",
  },
  {
    id: "hedgehog-egg",
    name: "달걀",
    type: "egg",
    category: "meat",
    energy: 15,
    happiness: 12,
    hungerReduction: 30,
    image: "/foods/egg.png",
  },
  {
    id: "hedgehog-vegetable",
    name: "야채",
    type: "vegetable",
    category: "vegetable",
    energy: 5,
    happiness: 8,
    hungerReduction: 10,
    image: "/foods/vegetable.png",
  },

  // 토끼 먹이
  {
    id: "rabbit-carrot",
    name: "당근",
    type: "carrot",
    category: "vegetable",
    energy: 12,
    happiness: 15,
    hungerReduction: 20,
    image: "/foods/carrot.png",
  },
  {
    id: "rabbit-cabbage",
    name: "양배추",
    type: "cabbage",
    category: "vegetable",
    energy: 10,
    happiness: 12,
    hungerReduction: 18,
    image: "/foods/cabbage.png",
  },
  {
    id: "rabbit-apple",
    name: "사과",
    type: "apple",
    category: "fruit",
    energy: 8,
    happiness: 10,
    hungerReduction: 15,
    image: "/foods/apple.png",
  },
  {
    id: "rabbit-hay",
    name: "건초",
    type: "hay",
    category: "plant",
    energy: 5,
    happiness: 8,
    hungerReduction: 12,
    image: "/foods/hay.png",
  },
  {
    id: "rabbit-seed",
    name: "씨앗",
    type: "seed",
    category: "seed",
    energy: 7,
    happiness: 9,
    hungerReduction: 14,
    image: "/foods/seed.png",
  },

  // 쿼카 먹이
  {
    id: "quokka-leaf",
    name: "나뭇잎",
    type: "leaf",
    category: "plant",
    energy: 8,
    happiness: 12,
    hungerReduction: 15,
    image: "/foods/leaf.png",
  },
  {
    id: "quokka-grass",
    name: "풀",
    type: "grass",
    category: "plant",
    energy: 6,
    happiness: 10,
    hungerReduction: 12,
    image: "/foods/grass.png",
  },
  {
    id: "quokka-fruit",
    name: "과일",
    type: "berry",
    category: "fruit",
    energy: 10,
    happiness: 15,
    hungerReduction: 18,
    image: "/foods/berry.png",
  },
  {
    id: "quokka-seed",
    name: "씨앗",
    type: "seed",
    category: "seed",
    energy: 7,
    happiness: 9,
    hungerReduction: 14,
    image: "/foods/seed.png",
  },
  {
    id: "quokka-bark",
    name: "나무껍질",
    type: "bark",
    category: "plant",
    energy: 5,
    happiness: 8,
    hungerReduction: 10,
    image: "/foods/bark.png",
  },

  // 햄스터 먹이
  {
    id: "hamster-seed",
    name: "씨앗",
    type: "seed",
    category: "seed",
    energy: 8,
    happiness: 10,
    hungerReduction: 15,
    image: "/foods/seed.png",
  },
  {
    id: "hamster-nut",
    name: "견과류",
    type: "nut",
    category: "seed",
    energy: 12,
    happiness: 15,
    hungerReduction: 20,
    image: "/foods/nut.png",
  },
  {
    id: "hamster-grain",
    name: "곡물",
    type: "grain",
    category: "seed",
    energy: 10,
    happiness: 12,
    hungerReduction: 18,
    image: "/foods/grain.png",
  },
  {
    id: "hamster-fruit",
    name: "과일",
    type: "apple",
    category: "fruit",
    energy: 7,
    happiness: 9,
    hungerReduction: 14,
    image: "/foods/apple.png",
  },
  {
    id: "hamster-vegetable",
    name: "야채",
    type: "vegetable",
    category: "vegetable",
    energy: 6,
    happiness: 8,
    hungerReduction: 12,
    image: "/foods/vegetable.png",
  },

  // 기니피그 먹이
  {
    id: "guinea-pig-hay",
    name: "건초",
    type: "hay",
    category: "plant",
    energy: 8,
    happiness: 10,
    hungerReduction: 15,
    image: "/foods/hay.png",
  },
  {
    id: "guinea-pig-vegetable",
    name: "야채",
    type: "vegetable",
    category: "vegetable",
    energy: 10,
    happiness: 12,
    hungerReduction: 18,
    image: "/foods/vegetable.png",
  },
  {
    id: "guinea-pig-fruit",
    name: "과일",
    type: "apple",
    category: "fruit",
    energy: 12,
    happiness: 15,
    hungerReduction: 20,
    image: "/foods/apple.png",
  },
  {
    id: "guinea-pig-pellet",
    name: "펠렛",
    type: "pellet",
    category: "seed",
    energy: 15,
    happiness: 10,
    hungerReduction: 25,
    image: "/foods/pellet.png",
  },
  {
    id: "guinea-pig-herb",
    name: "허브",
    type: "herb",
    category: "plant",
    energy: 7,
    happiness: 18,
    hungerReduction: 12,
    image: "/foods/herb.png",
  },
]

// 동물별 먹이 매핑
export const animalFoods: Record<AnimalType, Food[]> = {
  hedgehog: allFoods.filter((food) =>
    ["hedgehog-insect", "hedgehog-fruit", "hedgehog-worm", "hedgehog-egg", "hedgehog-vegetable"].includes(food.id),
  ),
  rabbit: allFoods.filter((food) =>
    ["rabbit-carrot", "rabbit-cabbage", "rabbit-apple", "rabbit-hay", "rabbit-seed"].includes(food.id),
  ),
  quokka: allFoods.filter((food) =>
    ["quokka-leaf", "quokka-grass", "quokka-fruit", "quokka-seed", "quokka-bark"].includes(food.id),
  ),
  hamster: allFoods.filter((food) =>
    ["hamster-seed", "hamster-nut", "hamster-grain", "hamster-fruit", "hamster-vegetable"].includes(food.id),
  ),
  "guinea-pig": allFoods.filter((food) =>
    ["guinea-pig-hay", "guinea-pig-vegetable", "guinea-pig-fruit", "guinea-pig-pellet", "guinea-pig-herb"].includes(
      food.id,
    ),
  ),
}
