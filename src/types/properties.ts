export interface Property {
  id: string
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFeet: number
  location: string
  imageUrl: string
  features: string[]
}

export interface SearchFilters {
  minPrice: number
  maxPrice: number
  minSquareFeet: number
  maxSquareFeet: number
  bedrooms?: number
  bathrooms?: number
  location: string
}
