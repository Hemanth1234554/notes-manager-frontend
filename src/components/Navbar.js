import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-wrapper">
        <div className="nav-left" onClick={() => navigate("/")}>
          <span className="nav-logo">📝 NotesManager</span>
        </div>

        <nav className="nav-right">
          {!token ? (
            <>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          ) : (
            <>
              <Link to="/notes" className="nav-link">My Notes</Link>
              <button className="nav-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
