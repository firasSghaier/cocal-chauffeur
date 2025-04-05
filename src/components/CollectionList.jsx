"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaSearch, FaFilter, FaMapMarkedAlt, FaListUl } from "react-icons/fa"

function CollectionList({ driverId }) {
  const [collections, setCollections] = useState([])
  const [filteredCollections, setFilteredCollections] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("list")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [driverId])

  useEffect(() => {
    filterCollections()
  }, [collections, searchTerm, statusFilter])

  const fetchCollections = () => {
    // Simulate API call
    setTimeout(() => {
      setCollections([
        {
          id: 1,
          restaurantName: "Café de Paris",
          address: "15 Rue de Rivoli, Paris",
          scheduledTime: "09:30",
          expectedWeight: 5.2,
          status: "À faire",
        },
        {
          id: 2,
          restaurantName: "Le Bistrot Parisien",
          address: "42 Avenue des Champs-Élysées, Paris",
          scheduledTime: "11:00",
          expectedWeight: 3.8,
          status: "À faire",
        },
        {
          id: 3,
          restaurantName: "La Brasserie du Coin",
          address: "7 Place de la République, Paris",
          scheduledTime: "14:15",
          expectedWeight: 6.5,
          status: "À faire",
        },
        {
          id: 4,
          restaurantName: "Le Petit Café",
          address: "23 Boulevard Saint-Michel, Paris",
          scheduledTime: "16:00",
          expectedWeight: 2.7,
          status: "À faire",
        },
      ])
      setIsLoading(false)
    }, 500)
  }

  const filterCollections = () => {
    let filtered = collections

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (collection) =>
          collection.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((collection) => collection.status === statusFilter)
    }

    setFilteredCollections(filtered)
  }

  const updateCollectionStatus = (id, newStatus) => {
    setCollections(
      collections.map((collection) => (collection.id === id ? { ...collection, status: newStatus } : collection)),
    )
  }

  if (isLoading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="collections-page">
      <div className="page-header">
        <h1>Liste des collectes</h1>
        <div className="view-toggle">
          <button className={`toggle-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
            <FaListUl />
          </button>
          <button className={`toggle-btn ${viewMode === "map" ? "active" : ""}`} onClick={() => setViewMode("map")}>
            <FaMapMarkedAlt />
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Rechercher un établissement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdown">
          <FaFilter />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Fait">Fait</option>
          </select>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="collections-list">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <div key={collection.id} className="collection-card">
                <div className="collection-time">{collection.scheduledTime}</div>
                <div className="collection-content">
                  <h3>{collection.restaurantName}</h3>
                  <p className="address">{collection.address}</p>
                  <div className="collection-details">
                    <span className="weight">{collection.expectedWeight} kg</span>
                    <div className="status-actions">
                      <select
                        value={collection.status}
                        onChange={(e) => updateCollectionStatus(collection.id, e.target.value)}
                        className={`status-select status-${collection.status.toLowerCase().replace(" ", "-")}`}
                      >
                        <option value="À faire">À faire</option>
                        <option value="En cours">En cours</option>
                        <option value="Fait">Fait</option>
                      </select>
                      <Link to={`/collections/${collection.id}`} className="btn-details">
                        Détails
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Aucune collecte ne correspond à vos critères de recherche.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="collections-map">
          {/* In a real app, this would be a full map component */}
          <div className="map-placeholder">
            <h3>Carte des collectes</h3>
            <p>
              Dans l'application réelle, cette vue afficherait une carte interactive avec tous les points de collecte et
              l'itinéraire optimisé.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollectionList

