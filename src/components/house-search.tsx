"use client"

import { useState, useEffect } from "react"
import { SearchFilters } from "./search-filters"
import { PropertyCard } from "./property-card"
import type { Property, SearchFilters as SearchFiltersType } from "../types/properties"
import { Button } from "@/components/ui/button"


const API_URL = "http://localhost:3001"
interface PropertiesResponse {
  properties: Property[]
  pagination: {
    page: number
    totalPages: number
    totalCount: number
    hasMore: boolean
  }
}

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

  const [properties, setProperties] = useState<Property[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0,
    hasMore: false,
  })
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          minPrice: filters.minPrice.toString(),
          maxPrice: filters.maxPrice.toString(),
          minSquareFeet: filters.minSquareFeet.toString(),
          maxSquareFeet: filters.maxSquareFeet.toString(),
          page: "1",
        })

        if (filters.bedrooms) params.append("bedrooms", filters.bedrooms.toString())
        if (filters.bathrooms) params.append("bathrooms", filters.bathrooms.toString())
        if (filters.location) params.append("location", filters.location)

        const response = await fetch(`${API_URL}/api/properties?${params}`)
        const data: PropertiesResponse = await response.json()

        setProperties(data.properties)
        setPagination(data.pagination)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters])

  const loadMore = async () => {
    if (!pagination.hasMore || loadingMore) return

    setLoadingMore(true)
    try {
      const params = new URLSearchParams({
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        minSquareFeet: filters.minSquareFeet.toString(),
        maxSquareFeet: filters.maxSquareFeet.toString(),
        page: (pagination.page + 1).toString(),
      })

      if (filters.bedrooms) params.append("bedrooms", filters.bedrooms.toString())
      if (filters.bathrooms) params.append("bathrooms", filters.bathrooms.toString())
      if (filters.location) params.append("location", filters.location)

      const response = await fetch(`${API_URL}/api/properties?${params}`)
      const data: PropertiesResponse = await response.json()

      setProperties((prev) => [...prev, ...data.properties])
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error loading more properties:", error)
    } finally {
      setLoadingMore(false)
    }
  }

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
                {loading
                  ? "Loading..."
                  : `${pagination.totalCount} ${pagination.totalCount === 1 ? "property" : "properties"} found`}
              </p>
            </div>

            {loading ? (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <p className="text-lg text-muted-foreground">Loading properties...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No properties match your search criteria. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {pagination.hasMore && (
                  <div className="mt-8 flex justify-center">
                    <Button onClick={loadMore} disabled={loadingMore} variant="outline" size="lg">
                      {loadingMore ? "Loading..." : "Load More Properties"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
