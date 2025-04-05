"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaBell, FaRoute, FaWeight, FaStore, FaCalendarAlt, FaClock, FaExclamationTriangle } from "react-icons/fa"
import Map from "./Map"

function Dashboard({ driverId }) {
  const [driver, setDriver] = useState(null)
  const [todayCollections, setTodayCollections] = useState([])
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, these would be API calls
    fetchDriverData()
    fetchTodayCollections()
    fetchNotifications()
  }, [driverId])

  const fetchDriverData = () => {
    // Simulate API call
    setTimeout(() => {
      setDriver({
        id: driverId,
        name: "Jean Dupont",
        vehicle: {
          id: "VH-2345",
          status: "Opérationnel",
          lastMaintenance: "2023-10-15",
          nextMaintenance: "2024-04-15",
        },
      })
      setIsLoading(false)
    }, 500)
  }

  const fetchTodayCollections = () => {
    // Simulate API call
    setTimeout(() => {
      setTodayCollections([
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
      ])
    }, 500)
  }

  const fetchNotifications = () => {
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          message: "Nouvelle collecte ajoutée pour aujourd'hui",
          time: "08:15",
          read: false,
        },
        {
          id: 2,
          message: "Modification de l'heure de collecte pour Café de Paris",
          time: "08:30",
          read: true,
        },
      ])
    }, 500)
  }

  if (isLoading) {
    return <div className="loading">Chargement...</div>
  }

  const totalWeight = todayCollections.reduce((sum, collection) => sum + collection.expectedWeight, 0)
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const currentTime = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const isMaintenanceSoon = () => {
    const nextMaintenance = new Date(driver.vehicle.nextMaintenance)
    const today = new Date()
    const diffTime = nextMaintenance - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="date-time">
          <div className="date">
            <FaCalendarAlt /> {currentDate}
          </div>
          <div className="time">
            <FaClock /> {currentTime}
          </div>
        </div>
        <div className="notifications-icon">
          <FaBell />
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="notification-badge">{notifications.filter((n) => !n.read).length}</span>
          )}
        </div>
      </div>

      <div className="dashboard-welcome">
        <h1>Bonjour, {driver.name}</h1>
        <p>Voici vos missions de collecte pour aujourd'hui</p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="card-icon">
            <FaStore />
          </div>
          <div className="card-content">
            <h3>Établissements</h3>
            <p className="card-value">{todayCollections.length}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">
            <FaWeight />
          </div>
          <div className="card-content">
            <h3>Poids total</h3>
            <p className="card-value">{totalWeight.toFixed(1)} kg</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">
            <FaRoute />
          </div>
          <div className="card-content">
            <h3>Distance</h3>
            <p className="card-value">32 km</p>
          </div>
        </div>
      </div>

      <div className="dashboard-vehicle">
        <h2>Information Véhicule</h2>
        <div className="vehicle-info">
          <div className="info-item">
            <strong>Immatriculation:</strong> {driver.vehicle.id}
          </div>
          <div className="info-item">
            <strong>État:</strong>
            <span className={`status ${driver.vehicle.status === "Opérationnel" ? "status-ok" : "status-warning"}`}>
              {driver.vehicle.status}
            </span>
          </div>
          <div className="info-item">
            <strong>Dernier entretien:</strong> {new Date(driver.vehicle.lastMaintenance).toLocaleDateString("fr-FR")}
          </div>
          <div className="info-item">
            <strong>Prochain entretien:</strong>
            <span className={isMaintenanceSoon() ? "maintenance-soon" : ""}>
              {new Date(driver.vehicle.nextMaintenance).toLocaleDateString("fr-FR")}
              {isMaintenanceSoon() && <FaExclamationTriangle className="warning-icon" />}
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-map">
        <h2>Itinéraire du jour</h2>
        <Map collections={todayCollections} />
      </div>

      <div className="dashboard-collections">
        <div className="section-header">
          <h2>Collectes à effectuer</h2>
          <Link to="/collections" className="view-all">
            Voir tout
          </Link>
        </div>
        <div className="collections-list">
          {todayCollections.slice(0, 3).map((collection) => (
            <div key={collection.id} className="collection-item">
              <div className="collection-time">{collection.scheduledTime}</div>
              <div className="collection-details">
                <h3>{collection.restaurantName}</h3>
                <p>{collection.address}</p>
                <div className="collection-weight">{collection.expectedWeight} kg</div>
              </div>
              <div className={`collection-status status-${collection.status.toLowerCase().replace(" ", "-")}`}>
                {collection.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-notifications">
        <h2>Notifications</h2>
        <div className="notifications-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className={`notification-item ${!notification.read ? "unread" : ""}`}>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-time">{notification.time}</div>
              </div>
            ))
          ) : (
            <p>Aucune notification</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

