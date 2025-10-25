export interface Property {
  id: string
  title: string
  price: number
  lotSize: number
  formattedAddress: string
  latitude: number
  longitude: number
  bedrooms?: number
  bathrooms?: number

}

export interface SearchFilters {
  minPrice: number
  maxPrice: number
  minSquareFeet: number
  maxSquareFeet: number
  bedrooms?: number
  bathrooms?: number
  location?: string
  propertyType?: string
}