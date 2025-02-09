import { Link } from "react-router-dom"
import "./LandingPage.css"

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero">
        <h1>Welcome to BookNest</h1>
        <p>Your Personal Library Haven</p>
        <Link to="/library" className="btn get-started">
          Get Started
        </Link>
      </div>
      <div className="features">
        <div className="feature">
          <h2>Organize Your Library</h2>
          <p>Keep track of your books and reading progress</p>
        </div>
        <div className="feature">
          <h2>Discover New Books</h2>
          <p>Get personalized recommendations based on your preferences</p>
        </div>
        <div className="feature">
          <h2>Track Your Progress</h2>
          <p>Set reading goals and monitor your achievements</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage