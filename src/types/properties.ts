export interface Property {
  id: string
  title: string
  price: number
  lotSize: number
  formattedAddress: string
  latitude: number
  longitude: number
}

export interface SearchFilters {
  minPrice: number
  maxPrice: number
  minSquareFeet: number
  maxSquareFeet: number
  formattedAddress?: string
  sortBy: "price" | "squareFeet"
}
