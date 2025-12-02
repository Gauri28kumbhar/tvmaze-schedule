import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">

   
        <div className="navbar-brand">
          TV<span className="nav-highlight">Now</span>
        </div>

        

        <nav className="nav-links">
          <Link to="/" className="navbar-link">Today's US Schedule</Link>

      
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </nav>

       
        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu} className="mobile-menu-link">
          Today's US Schedule
        </Link>

        <button
          className="mobile-theme-toggle"
          onClick={() => {
            toggleTheme();
            closeMenu();
          }}
        >
          {theme === "dark" ? "🌞" : "🌙 "}
        </button>
      </div>
    </header>
  );
}

export default Navbar;