
export interface Ingredient {
    id: number,
    name: string,
    added: boolean
}

export interface IngredientResponse {
    data: Ingredient[]
}