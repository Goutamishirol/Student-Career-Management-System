import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Talent";
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "⌂" },
    { to: "/dashboard/skills", label: "Skills", icon: "📖" },
    { to: "/dashboard/certificates", label: "Certificates", icon: "🏅" },
    { to: "/dashboard/internships", label: "Internships", icon: "💼" },
    { to: "/dashboard/profile", label: "Profile", icon: "👤" },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="dashboard-shell">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-brand">
          <span>⚡</span>
          <div>
            Skill<span>Vault</span>
          </div>
        </div>

        <div className="sidebar-links">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${location.pathname === item.to ? "active" : ""}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">Logged in as {userName}</div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">Productivity dashboard for your internship career</div>
          <div className="topbar-actions">
            <button
              className="btn btn-ghost"
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to dark" : "Switch to light"}
              style={{ fontSize: "1.1rem" }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <div className="user-chip">
              <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
              <div>{userName}</div>
            </div>
            <button className="btn btn-ghost" onClick={logout}>Logout</button>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
