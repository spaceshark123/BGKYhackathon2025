import { Card, CardContent } from "@/components/ui/card"
//import { Badge } from "@/components/ui/badge"
import type { Property } from "@/types/properties"
import { Maximize2, MapPin } from "lucide-react"
import FadeText from "./fadetext"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative overflow-hidden" style={{ paddingTop: "-75px" }}>
        <img
          src={"/house.jpg"}
          alt={property.title}
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-card-foreground leading-tight">{property.title}</h3>
          <p className="text-lg font-bold text-primary whitespace-nowrap ml-2">${property.price.toLocaleString()}</p>
        </div>

        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <FadeText text={property.formattedAddress.toLocaleString()} className="max-w-[80px]" />
        </div>

        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Maximize2 className="h-4 w-4" />
            
            <span>{property.lotSize.toLocaleString()} sq ft</span>
          </div>
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
