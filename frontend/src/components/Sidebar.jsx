import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">

      <div className="sidebar-top">

        <div className="app-logo">
          🚀
        </div>

        <h2>SkillVault</h2>

        <p>Build. Learn. Grow.</p>

      </div>

      <div className="menu">

        <Link
          className={location.pathname === "/dashboard" ? "active" : ""}
          to="/dashboard"
        >
          🏠 Dashboard
        </Link>

        <Link
          className={location.pathname === "/dashboard/skills" ? "active" : ""}
          to="/dashboard/skills"
        >
          📚 Skills
        </Link>

        <Link
          className={location.pathname === "/dashboard/certificates" ? "active" : ""}
          to="/dashboard/certificates"
        >
          🏆 Certificates
        </Link>

        <Link
          className={location.pathname === "/dashboard/internships" ? "active" : ""}
          to="/dashboard/internships"
        >
          💼 Internships
        </Link>

        <Link
          className={location.pathname === "/dashboard/profile" ? "active" : ""}
          to="/dashboard/profile"
        >
          👤 Profile
        </Link>

      </div>

      <div className="sidebar-bottom">

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;