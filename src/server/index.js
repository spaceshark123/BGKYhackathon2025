import express from "express"
import cors from "cors"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const ITEMS_PER_PAGE = 12

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

// Properties endpoint with filtering and pagination
app.get("/api/properties", async (req, res) => {
  try {
    // Read JSON file (for large files, consider streaming or database)
    // go 2 directories up and then into listings folder
    const dataPath = path.join(__dirname, "..", "..", "listings", "listings.json")
    const fileContent = await fs.readFile(dataPath, "utf-8")
    const properties = JSON.parse(fileContent)

    // Parse filters from query params
    const minPrice = Number(req.query.minPrice) || 0
    const maxPrice = Number(req.query.maxPrice) || Number.POSITIVE_INFINITY
    const minSquareFeet = Number(req.query.minSquareFeet) || 0
    const maxSquareFeet = Number(req.query.maxSquareFeet) || Number.POSITIVE_INFINITY
    const address = req.query.formattedAddress ? String(req.query.formattedAddress).toLowerCase() : null
    const sortBy = req.query.sortBy || "price"
    const sortOrder = req.query.sortOrder || "asc"
    const page = Number(req.query.page) || 1

    // Filter properties
    const filteredProperties = properties.filter((property) => {
      if (property.price < minPrice || property.price > maxPrice) {
        return false
      }
      if (property.squareFeet < minSquareFeet || property.squareFeet > maxSquareFeet) {
        return false
      }
      if (address && property.formattedAddress.toLowerCase().indexOf(address) === -1) {
        return false
      }
      return true
    })

    // Sort properties (if sortBy is "squareFeet", the field might be named squareFeet, squareFootage, or lotSize)
    const sortedProperties = filteredProperties.sort((a, b) => {
      const out = sortOrder === "asc" ? 1 : -1
      if (sortBy === "price") {
        return (a.price - b.price) * out
      }
      else if (sortBy === "squareFeet") {
        const aSquareFeet = a.squareFeet !== undefined ? a.squareFeet : (a.squareFootage !== undefined ? a.squareFootage : a.lotSize)
        const bSquareFeet = b.squareFeet !== undefined ? b.squareFeet : (b.squareFootage !== undefined ? b.squareFootage : b.lotSize)
        return (aSquareFeet - bSquareFeet) * out
      }
      return 0
    })

    // for each sorted property, set field lotSize to squareFeet if squareFeet exists, else to squareFootage if squareFootage exists
    sortedProperties.forEach((property) => {
      if (property.squareFeet !== undefined) {
        property.lotSize = property.squareFeet
      }
      else if (property.squareFootage !== undefined) {
        property.lotSize = property.squareFootage
      }
    })

    // Paginate results
    const totalCount = filteredProperties.length
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedProperties = sortedProperties.slice(startIndex, endIndex)

    res.json({
      properties: paginatedProperties,
      pagination: {
        page,
        totalPages,
        totalCount,
        hasMore: page < totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    res.status(500).json({ error: "Failed to fetch properties" })
  }
})

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`)
})
