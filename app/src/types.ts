import type { restaurantStatusList, dietList } from "@/constants";

type Dish = {
    id: string
    name: string
    status: Status,
    diet?: Diet
}

type Restaurant = {
    id: string
    name: string
    address: string
    website: string
    status: Status,
    diet?: Diet
}

type Status = typeof restaurantStatusList[number]
// type Status = "Want to Try" | "Recommended" | "Do Not Recommend";

type Diet = typeof dietList[number]

export type { Dish, Restaurant }