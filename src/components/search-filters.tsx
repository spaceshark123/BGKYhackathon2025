"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SearchFilters as SearchFiltersType } from "@/types/properties"
import { Slider } from "@/components/ui/slider"

interface SearchFiltersProps {
  filters: SearchFiltersType
  onFiltersChange: (filters: SearchFiltersType) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
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
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter location..."
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${filters.minPrice.toLocaleString()}</span>
              <span>${filters.maxPrice.toLocaleString()}</span>
            </div>
            <Slider
              min={0}
              max={3000000}
              step={50000}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => {
                updateFilter("minPrice", min)
                updateFilter("maxPrice", max)
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
              <span>{filters.minSquareFeet.toLocaleString()} sq ft</span>
              <span>{filters.maxSquareFeet.toLocaleString()} sq ft</span>
            </div>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={[filters.minSquareFeet, filters.maxSquareFeet]}
              onValueChange={([min, max]) => {
                updateFilter("minSquareFeet", min)
                updateFilter("maxSquareFeet", max)
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Minimum Bedrooms</Label>
          <Select
            value={filters.bedrooms?.toString() || "any"}
            onValueChange={(value) => updateFilter("bedrooms", value === "any" ? undefined : Number.parseInt(value))}
          >
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Minimum Bathrooms</Label>
          <Select
            value={filters.bathrooms?.toString() || "any"}
            onValueChange={(value) => updateFilter("bathrooms", value === "any" ? undefined : Number.parseFloat(value))}
          >
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="1.5">1.5+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="2.5">2.5+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
