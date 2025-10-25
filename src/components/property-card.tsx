import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/properties"
import { Bed, Bath, Maximize2, MapPin , Plus, Minus} from "lucide-react"
import FadeText from "./fadetext"
import { useState } from "react"


interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [zoom, setZoom] = useState(20)
  const getMapImageUrl = (lat: number, lng: number, zoomLevel: number) => {
    const apiKey ='AIzaSyD-lwBv3vwO9vlSLeBoAR4TpkOgIMF0qtY'
    const maptype = 'satellite'
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoomLevel}&size=600x400&maptype=${maptype}&markers=color:red%7C${lat},${lng}&key=${apiKey}`
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 21)) // Max zoom is 21
  }
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 10)) // Min zoom is 10
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative overflow-hidden" style={{ marginTop: "-25px" }}>
        <img
          src={getMapImageUrl(property.latitude, property.longitude, zoom) || "/house.jpg"}
          alt={property.title}
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            size="icon"
            variant="default"
            className="h-8 w-8 shadow-md"
            onClick={handleZoomIn}
            disabled={zoom >= 21}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="default"
            className="h-8 w-8 shadow-md"
            onClick={handleZoomOut}
            disabled={zoom <= 10}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-card-foreground leading-tight">{property.title}</h3>
          <p className="text-lg font-bold text-primary whitespace-nowrap ml-2">${property.price.toLocaleString()}</p>
        </div>

        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.formattedAddress)}`} target="_blank" rel="noopener noreferrer">
            <FadeText text={property.formattedAddress.toLocaleString()} className="max-w-[80px]" />
          </a>
        </div>

        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Maximize2 className="h-4 w-4" />
            <span>{property.lotSize ? property.lotSize.toLocaleString() : 'N/A'} sq ft</span>
          </div>
          {property.bedrooms !== undefined && property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          {property.bathrooms !== undefined && property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} bath</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* {property.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))} */}
        </div>
      </CardContent>
    </Card>
  )
}
