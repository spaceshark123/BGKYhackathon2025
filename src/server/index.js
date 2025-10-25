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

    // Sort properties
    const sortedProperties = [...filteredProperties].sort((a, b) => {
      const safeNumber = (value) => {
        if (value == null) return 0
        if (typeof value === "number") return value
        if (typeof value === "string") {
          const num = parseFloat(value.replace(/[^0-9.-]+/g, ""))
          return Number.isFinite(num) ? num : 0
        }
        return 0
      }

      const getVal = (obj, key) => safeNumber(obj[key])
      const aVal = getVal(a, sortBy)
      const bVal = getVal(b, sortBy)
      return aVal - bVal
    })

    console.log(sortedProperties)

    // Paginate results
    const totalCount = filteredProperties.length
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    //const paginatedProperties = filteredProperties.slice(startIndex, endIndex)

    res.json({
      properties: filteredProperties,
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
