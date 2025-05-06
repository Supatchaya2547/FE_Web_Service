// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import './Navbar.css'; // ไฟล์ CSS แยกส่วน navbar

const Navbar = () => {
  const { keycloak } = useKeycloak();

  return (
    <nav className="navbar">
      <div className="logo-circle"></div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        {/* <Link to="/dashboard" className="nav-item">Dashboard</Link> */}
        <Link to="/website" className="nav-item">Websites</Link>
        <Link to="/courses" className="nav-item">API Courses</Link>
        <Link to="/affiliate" className="nav-item">Affiliate</Link>
        <Link to="/course_detail/1" className="nav-item">detail 1</Link>
        <button className="logout-button" onClick={() => keycloak.logout()}>Sign out</button>
      </div>
    </nav>
  );
};

export default Navbar;
