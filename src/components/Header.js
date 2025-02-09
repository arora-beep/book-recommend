import { Link } from "react-router-dom"
import "./Header.css"

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          BookNest
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/library">My Library</Link>
            </li>
            <li>
              <Link to="/recommendations">Recommendations</Link>
            </li>
          </ul>
        </nav>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  )
}

export default Header
