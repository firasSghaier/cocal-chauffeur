"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaPhone, FaMapMarkerAlt, FaClock, FaWeight, FaCheck } from "react-icons/fa"

function CollectionDetails({ driverId }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [collection, setCollection] = useState(null)
  const [actualWeight, setActualWeight] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchCollectionDetails()
  }, [id])

  const fetchCollectionDetails = () => {
    // Simulate API call
    setTimeout(() => {
      setCollection({
        id: Number.parseInt(id),
        restaurantName: "Café de Paris",
        address: "15 Rue de Rivoli, Paris",
        scheduledTime: "09:30",
        expectedWeight: 5.2,
        status: "À faire",
        contactName: "Marie Dubois",
        contactPhone: "06 12 34 56 78",
        notes:
          "Sonnez à l'interphone et demandez le responsable. Les coquillages sont stockés dans la réserve à l'arrière du restaurant.",
        coordinates: {
          lat: 48.856614,
          lng: 2.3522219,
        },
      })
      setIsLoading(false)
    }, 500)
  }

  const handleStatusChange = (newStatus) => {
    setCollection({
      ...collection,
      status: newStatus,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call to save the collection
    setTimeout(() => {
      setCollection({
        ...collection,
        status: "Fait",
        actualWeight: Number.parseFloat(actualWeight),
      })
      setIsSaving(false)

      // Show success message
      alert("Collecte validée avec succès !")

      // Navigate back to collections list
      navigate("/collections")
    }, 1000)
  }

  if (isLoading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="collection-details-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/collections")}>
          <FaArrowLeft />
        </button>
        <h1>Détails de la collecte</h1>
      </div>

      <div className="collection-details-content">
        <div className="collection-info-card">
          <div className="restaurant-header">
            <h2>{collection.restaurantName}</h2>
            <div className={`status-badge status-${collection.status.toLowerCase().replace(" ", "-")}`}>
              {collection.status}
            </div>
          </div>

          <div className="info-section">
            <div className="info-item">
              <FaMapMarkerAlt />
              <span>{collection.address}</span>
            </div>
            <div className="info-item">
              <FaClock />
              <span>Heure prévue: {collection.scheduledTime}</span>
            </div>
            <div className="info-item">
              <FaWeight />
              <span>Poids prévu: {collection.expectedWeight} kg</span>
            </div>
          </div>

          <div className="contact-section">
            <h3>Contact</h3>
            <p>{collection.contactName}</p>
            <a href={`tel:${collection.contactPhone.replace(/\s/g, "")}`} className="phone-link">
              <FaPhone /> {collection.contactPhone}
            </a>
          </div>

          <div className="notes-section">
            <h3>Notes</h3>
            <p>{collection.notes}</p>
          </div>
        </div>

        <div className="map-section">
          <h3>Localisation</h3>
          <div className="map-placeholder">
            <p>
              Dans l'application réelle, cette section afficherait une carte interactive avec la localisation précise du
              restaurant.
            </p>
          </div>
        </div>

        <div className="collection-actions">
          {collection.status !== "Fait" ? (
            <form onSubmit={handleSubmit} className="collection-form">
              <h3>Valider la collecte</h3>

              <div className="form-group">
                <label htmlFor="actualWeight">Poids réel collecté (kg)</label>
                <input
                  type="number"
                  id="actualWeight"
                  step="0.1"
                  min="0"
                  required
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value)}
                />
              </div>

              <div className="status-buttons">
                <button
                  type="button"
                  className={`status-btn ${collection.status === "À faire" ? "active" : ""}`}
                  onClick={() => handleStatusChange("À faire")}
                >
                  À faire
                </button>
                <button
                  type="button"
                  className={`status-btn ${collection.status === "En cours" ? "active" : ""}`}
                  onClick={() => handleStatusChange("En cours")}
                >
                  En cours
                </button>
              </div>

              <button type="submit" className="btn-validate" disabled={isSaving}>
                <FaCheck /> {isSaving ? "Validation..." : "Valider la collecte"}
              </button>
            </form>
          ) : (
            <div className="collection-completed">
              <h3>Collecte validée</h3>
              <div className="completed-info">
                <p>Poids collecté: {collection.actualWeight} kg</p>
                <p>Cette collecte a été marquée comme terminée.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollectionDetails

