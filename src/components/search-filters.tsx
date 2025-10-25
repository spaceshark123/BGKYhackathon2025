"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SearchFilters as SearchFiltersType } from "../types/properties"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"

interface SearchFiltersProps {
  filters: SearchFiltersType
  onFiltersChange: (filters: SearchFiltersType) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState([filters.minPrice, filters.maxPrice])
  const [localSquareFeet, setLocalSquareFeet] = useState([filters.minSquareFeet, filters.maxSquareFeet])
  const [localAddress, setLocalAddress] = useState(filters.formattedAddress || "")
  // sort by
  const [sortBy, setSortBy] = useState<"price" | "squareFeet">("price")

  useEffect(() => {
    setLocalPriceRange([filters.minPrice, filters.maxPrice])
    setLocalSquareFeet([filters.minSquareFeet, filters.maxSquareFeet])
    setLocalAddress(filters.formattedAddress || "")
    setSortBy(filters.sortBy)
  }, [filters.minPrice, filters.maxPrice, filters.minSquareFeet, filters.maxSquareFeet, filters.formattedAddress, filters.sortBy])

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Enter address..."
            value={filters.formattedAddress || ""}
            onChange={(e) => updateFilter("formattedAddress", e.target.value)}
          />
        </div>

        { /* Sort By */}
        <div className="space-y-2">
          <Label htmlFor="sort-by">Sort By</Label>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              const sortValue = value as "price" | "squareFeet"
              setSortBy(sortValue)
              updateFilter("sortBy", sortValue)
            }}
          >
            <SelectTrigger id="sort-by" className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="squareFeet">Square Feet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${localPriceRange[0].toLocaleString()}</span>
              <span>${localPriceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              min={0}
              max={3000000}
              step={50000}
              value={localPriceRange}
              onValueChange={setLocalPriceRange}
              onValueCommit={([min, max]) => {
                onFiltersChange({ ...filters, minPrice: min, maxPrice: max })
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* Square Footage */}
        <div className="space-y-3">
          <Label>Square Footage</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{localSquareFeet[0].toLocaleString()} sq ft</span>
              <span>{localSquareFeet[1].toLocaleString()} sq ft</span>
            </div>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={localSquareFeet}
              onValueChange={setLocalSquareFeet}
              onValueCommit={([min, max]) => {
                onFiltersChange({ ...filters, minSquareFeet: min, maxSquareFeet: max })
              }}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
