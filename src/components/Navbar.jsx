import { Link, useLocation } from "react-router-dom"
import { FaHome, FaClipboardList, FaHistory } from "react-icons/fa"

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Cocal</h2>
      </div>
      <ul className="nav-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <FaHome />
            <span>Tableau de bord</span>
          </Link>
        </li>
        <li className={location.pathname === "/collections" ? "active" : ""}>
          <Link to="/collections">
            <FaClipboardList />
            <span>Collectes</span>
          </Link>
        </li>
        <li className={location.pathname === "/history" ? "active" : ""}>
          <Link to="/history">
            <FaHistory />
            <span>Historique</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

