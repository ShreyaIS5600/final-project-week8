import { NavLink, Route, Routes } from "react-router-dom";
import { SelectTeams } from "./select.teams";
import { AddTeams } from "./add.teams";
import { ViewMatch } from "./view.match";
import { AddMatchData } from "./add.match";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { AdminDashboard } from "./dashboard";
import ProtectedRoute from "./protection";

export function AdminBasePage(props) {
  const [adminData, setAdminData] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    let refData = localStorage.getItem("admin.data");
    if (refData) {
      setLoggedIn(true);
      setAdminData(JSON.parse(refData));
    } else {
      setLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("admin.data");
  };

  return (
    <div>
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
                <NavLink to="/admin/addTeam" className="nav-link">
                  Add Team
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/selectMatchTeams" className="nav-link">
                  Add Match
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/viewMatch" className="nav-link">
                  View Match
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-md-0">
              <li className="nav-item">
                <span className="nav-link">
                  {adminData.firstName} {adminData.lastName}
                </span>
              </li>
              <li className="nav-item">
                <NavLink to="/adminLogin" onClick={logout} className="nav-link">
                  <i className="fa fa-sign-out"></i> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addTeam"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddTeams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selectMatchTeams"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SelectTeams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addMatchData"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddMatchData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewMatch"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ViewMatch />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}
