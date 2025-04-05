"use client"

import { useState, useEffect } from "react"
import { FaSearch, FaCalendarAlt, FaFileDownload } from "react-icons/fa"

function History({ driverId }) {
  const [collections, setCollections] = useState([])
  const [filteredCollections, setFilteredCollections] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchHistoryData()
  }, [driverId])

  useEffect(() => {
    filterCollections()
  }, [collections, searchTerm, dateFilter])

  const fetchHistoryData = () => {
    // Simulate API call
    setTimeout(() => {
      setCollections([
        {
          id: 101,
          date: "2023-04-01",
          restaurantName: "Café de Paris",
          address: "15 Rue de Rivoli, Paris",
          scheduledTime: "09:30",
          expectedWeight: 5.2,
          actualWeight: 5.4,
          status: "Fait",
        },
        {
          id: 102,
          date: "2023-04-01",
          restaurantName: "Le Bistrot Parisien",
          address: "42 Avenue des Champs-Élysées, Paris",
          scheduledTime: "11:00",
          expectedWeight: 3.8,
          actualWeight: 3.5,
          status: "Fait",
        },
        {
          id: 103,
          date: "2023-04-01",
          restaurantName: "La Brasserie du Coin",
          address: "7 Place de la République, Paris",
          scheduledTime: "14:15",
          expectedWeight: 6.5,
          actualWeight: 6.2,
          status: "Fait",
        },
        {
          id: 104,
          date: "2023-03-31",
          restaurantName: "Le Petit Café",
          address: "23 Boulevard Saint-Michel, Paris",
          scheduledTime: "16:00",
          expectedWeight: 2.7,
          actualWeight: 3.0,
          status: "Fait",
        },
        {
          id: 105,
          date: "2023-03-31",
          restaurantName: "Café de Paris",
          address: "15 Rue de Rivoli, Paris",
          scheduledTime: "09:30",
          expectedWeight: 5.2,
          actualWeight: 5.0,
          status: "Fait",
        },
        {
          id: 106,
          date: "2023-03-30",
          restaurantName: "Le Bistrot Parisien",
          address: "42 Avenue des Champs-Élysées, Paris",
          scheduledTime: "11:00",
          expectedWeight: 3.8,
          actualWeight: 4.0,
          status: "Fait",
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

    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter((collection) => collection.date === dateFilter)
    }

    setFilteredCollections(filtered)
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  const exportData = () => {
    // In a real app, this would generate a CSV or PDF file
    alert("Dans une application réelle, cette fonction exporterait les données filtrées au format CSV ou PDF.")
  }

  if (isLoading) {
    return <div className="loading">Chargement...</div>
  }

  // Group collections by date
  const groupedCollections = filteredCollections.reduce((groups, collection) => {
    const date = collection.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(collection)
    return groups
  }, {})

  return (
    <div className="history-page">
      <div className="page-header">
        <h1>Historique des collectes</h1>
        <button className="btn-export" onClick={exportData}>
          <FaFileDownload /> Exporter
        </button>
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
        <div className="date-filter">
          <FaCalendarAlt />
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      <div className="history-content">
        {Object.keys(groupedCollections).length > 0 ? (
          Object.keys(groupedCollections)
            .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order
            .map((date) => (
              <div key={date} className="history-date-group">
                <h2 className="date-header">{formatDate(date)}</h2>
                <div className="history-list">
                  {groupedCollections[date].map((collection) => (
                    <div key={collection.id} className="history-item">
                      <div className="history-time">{collection.scheduledTime}</div>
                      <div className="history-content">
                        <h3>{collection.restaurantName}</h3>
                        <p className="address">{collection.address}</p>
                        <div className="weight-comparison">
                          <div className="weight-item">
                            <span className="label">Prévu:</span>
                            <span className="value">{collection.expectedWeight} kg</span>
                          </div>
                          <div className="weight-item">
                            <span className="label">Réel:</span>
                            <span className="value">{collection.actualWeight} kg</span>
                          </div>
                          <div
                            className={`weight-difference ${collection.actualWeight >= collection.expectedWeight ? "positive" : "negative"}`}
                          >
                            {(collection.actualWeight - collection.expectedWeight).toFixed(1)} kg
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="no-results">
            <p>Aucune collecte ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default History

