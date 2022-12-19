import { NavLink } from "react-router-dom";

export function AppHeader(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container">
        <span className="navbar-brand">IPL Data</span>
        <button
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-target="#navbarCollapse"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Team List
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to="/adminLogin" className="nav-link">
                Admin Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
