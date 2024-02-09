import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../context";
import SearchBar from './SearchBar';
import "./Navbar.style.scss";

function Navbar() {
  const { loggedIn, logout } = useAccountContext();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  // Added state for search term

  function toggleMode() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  // Handler function for search term changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    // Perform other actions if needed
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <Link to="/">
        <img
          className="logo"
          src="https://scontent.fyyz1-2.fna.fbcdn.net/v/t1.18169-9/23754992_1726023157440074_5978733848303126604_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=w71Gzma1pLwAX9wVBR2&_nc_ht=scontent.fyyz1-2.fna&oh=00_AfBpj67B6TS2zMzM0H2Ekv-2Ayahr1kW43Fl-TzFNvk-Mw&oe=653FA580"
          alt="Logo"
        />
      </Link>
      
      {/* Added SearchBar component */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      
      <div className="navbar__account">
        {loggedIn() === false ? (
          <>
            <button onClick={() => navigate("/sign-up")}>Sign Up</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </>
        ) : (
          <button onClick={() => logout()}>Logout</button>
        )}
        <button onClick={toggleMode}>Toggle</button>
      </div>
    </nav>
  );
}

export default Navbar;
