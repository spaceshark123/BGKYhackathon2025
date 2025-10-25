export interface Property {
  id: string
  title: string
  price: number
  lotSize: number
}

export interface SearchFilters {
  minPrice: number
  maxPrice: number
  minSquareFeet: number
  maxSquareFeet: number
}
