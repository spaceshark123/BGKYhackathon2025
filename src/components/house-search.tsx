"use client"

import { useState } from "react"
import { SearchFilters } from "./search-filters"
import { PropertyCard } from "./property-card"
import type { Property, SearchFilters as SearchFiltersType } from "../types/properties"

// Sample data - in a real app, this would come from an API
const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1450,
    location: "Downtown",
    imageUrl: "/modern-loft-interior.jpg",
    features: ["Hardwood Floors", "City Views", "Updated Kitchen"],
  },
  {
    id: "2",
    title: "Suburban Family Home",
    price: 625000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    location: "Westside",
    imageUrl: "/suburban-family-home-exterior.jpg",
    features: ["Large Backyard", "Garage", "Near Schools"],
  },
  {
    id: "3",
    title: "Luxury Waterfront Estate",
    price: 2400000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    location: "Lakeside",
    imageUrl: "/luxury-waterfront-home.png",
    features: ["Private Dock", "Pool", "Smart Home"],
  },
  {
    id: "4",
    title: "Cozy Starter Home",
    price: 385000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    location: "Eastside",
    imageUrl: "/cozy-starter-home.jpg",
    features: ["Renovated", "Fenced Yard", "Quiet Street"],
  },
  {
    id: "5",
    title: "Contemporary Townhouse",
    price: 725000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1850,
    location: "Midtown",
    imageUrl: "/contemporary-townhouse.jpg",
    features: ["Rooftop Deck", "Attached Garage", "HOA"],
  },
  {
    id: "6",
    title: "Historic Victorian",
    price: 950000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3100,
    location: "Historic District",
    imageUrl: "/victorian-house-exterior.jpg",
    features: ["Original Details", "Large Lot", "Updated Systems"],
  },
]

export function HouseSearch() {
  const [filters, setFilters] = useState<SearchFiltersType>({
    minPrice: 0,
    maxPrice: 3000000,
    minSquareFeet: 0,
    maxSquareFeet: 5000,
    bedrooms: undefined,
    bathrooms: undefined,
    location: "",
  })

  const filteredProperties = sampleProperties.filter((property) => {
    if (property.price < filters.minPrice || property.price > filters.maxPrice) {
      return false
    }
    if (property.squareFeet < filters.minSquareFeet || property.squareFeet > filters.maxSquareFeet) {
      return false
    }
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
      return false
    }
    if (filters.bathrooms && property.bathrooms < filters.bathrooms) {
      return false
    }
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Find Your Dream Home</h1>
          <p className="mt-2 text-muted-foreground">Search through our curated collection of properties</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </aside>

          {/* Results */}
          <main>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
              </p>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No properties match your search criteria. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
