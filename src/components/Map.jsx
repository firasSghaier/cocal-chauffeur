"use client"

import { useEffect, useRef } from "react"

function Map({ collections }) {
  const mapRef = useRef(null)

  useEffect(() => {
    // In a real application, this would be replaced with actual map integration
    // such as Google Maps or OpenStreetMap
    if (mapRef.current && collections.length > 0) {
      const canvas = mapRef.current
      const ctx = canvas.getContext("2d")

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a simple representation of the map
      ctx.fillStyle = "#f0f0f0"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw some "roads"
      ctx.strokeStyle = "#ccc"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(50, 50)
      ctx.lineTo(350, 50)
      ctx.lineTo(350, 150)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(50, 50)
      ctx.lineTo(50, 250)
      ctx.lineTo(250, 250)
      ctx.stroke()

      // Draw collection points
      collections.forEach((collection, index) => {
        const x = 100 + index * 100
        const y = 100 + index * 50

        // Draw point
        ctx.fillStyle = "#e74c3c"
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, 2 * Math.PI)
        ctx.fill()

        // Draw label
        ctx.fillStyle = "#333"
        ctx.font = "12px Arial"
        ctx.fillText(collection.restaurantName, x - 20, y + 25)
      })

      // Draw current location
      ctx.fillStyle = "#3498db"
      ctx.beginPath()
      ctx.arc(50, 50, 10, 0, 2 * Math.PI)
      ctx.fill()

      // Draw route
      ctx.strokeStyle = "#3498db"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(50, 50)

      collections.forEach((collection, index) => {
        const x = 100 + index * 100
        const y = 100 + index * 50
        ctx.lineTo(x, y)
      })

      ctx.stroke()
    }
  }, [collections])

  return (
    <div className="map-container">
      <canvas ref={mapRef} width="400" height="300" className="map-canvas"></canvas>
      <div className="map-note">
        <p>
          Note: Dans l'application réelle, cette carte serait remplacée par Google Maps ou OpenStreetMap avec un
          itinéraire réel et une géolocalisation en temps réel.
        </p>
      </div>
    </div>
  )
}

export default Map

