import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react"; // Tambahkan icon X untuk tutup
import "./Navbar.css";
import logoImg from "../../assets/logo.png";
import profileImg from "../../assets/profile-avatar.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/">
            <img src={logoImg} alt="videobelajar logo" className="nav-logo" />
          </Link>
        </div>

        <div className="nav-right">
          {/* Link Desktop */}
          <Link
            style={{ textDecoration: "none" }}
            to="/category"
            className="nav-link desktop-only"
          >
            <span>Kategori</span>
          </Link>

          {/* Hamburger Menu (Mobile Only) */}
          <div
            className="mobile-menu-trigger mobile-only"
            onClick={toggleDropdown}
          >
            {isDropdownOpen ? <X size={24} /> : <Menu size={24} />}
          </div>

          {/* Profile Section */}
          <div className={`profile-section ${isDropdownOpen ? "active" : ""}`}>
            {/* Avatar hanya muncul di desktop, di mobile avatar masuk ke dalam dropdown */}
            <img
              src={profileImg}
              alt="User Profile"
              className="nav-avatar desktop-only"
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="profile-dropdown">
                <ul className="dropdown-menu">
                  {/* TAMPILAN KHUSUS MOBILE DI DALAM DROPDOWN */}
                  <li className="mobile-user-info mobile-only">
                    <img
                      src={profileImg}
                      alt="Avatar"
                      className="mobile-avatar"
                    />
                    <span>Profil Saya</span>
                  </li>
                  <hr className="dropdown-divider mobile-only" />

                  <li className="mobile-only">
                    <Link
                      to="/category"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Kategori
                    </Link>
                  </li>
                  <hr className="dropdown-divider mobile-only" />
                  {/* END KHUSUS MOBILE */}

                  {/* ITEM UMUM */}
                  <li className="desktop-only">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profil Saya
                    </Link>
                  </li>
                  <li className="desktop-only">
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link
                      to="/my-courses"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Kelas Saya
                    </Link>
                  </li>
                  <hr className="dropdown-divider" />
                  <li>
                    <Link to="/orders" onClick={() => setIsDropdownOpen(false)}>
                      Pesanan Saya
                    </Link>
                  </li>
                  <hr className="dropdown-divider" />
                  <li className="logout-option" onClick={handleLogout}>
                    <span>Keluar</span>
                    <LogOut size={16} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
