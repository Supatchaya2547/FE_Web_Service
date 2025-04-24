import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect, useState } from 'react';
import '../styles/Websites.css';

const Websites = () => {
  const { keycloak, initialized } = useKeycloak();
  const [websites, setWebsites] = useState([]);
  const [url, setUrl] = useState('');

  const fetchWebsites = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/websites', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      const data = await response.json();
      setWebsites(data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลเว็บไซต์:', error);
    }
  };

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      fetchWebsites();
    }
  }, [initialized, keycloak]);

  const handleAddWebsite = async () => {
    if (!url.trim()) return;

    try {
      await fetch('http://localhost:8081/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify({ url }),
      });
      setUrl('');
      fetchWebsites();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มเว็บไซต์:', error);
    }
  };

  const handleDeleteWebsite = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/websites/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      fetchWebsites();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบเว็บไซต์:', error);
    }
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Navbar
      <div className="navbar">
        <div className="navbar-left">
          <div className="logo-circle" />
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/website">Websites</Link>
          <Link to="/courses">Insurances</Link>
          <a href="#" onClick={() => keycloak.logout()}>Sign out</a>
        </div>
      </div> */}

      <div className="websites-container">
        <h2 className="title">🌐 เว็บไซต์ที่ลงทะเบียน</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="add-btn" onClick={handleAddWebsite}>➕ เพิ่มเว็บไซต์</button>
        </div>

        <div className="website-list">
          {websites.map((site) => (
            <div key={site.id} className="website-item">
              <div className="website-info">
                <strong>{site.name || site.url}</strong>
                <div>ลงทะเบียนเมื่อ: {new Date(site.createdAt).toLocaleString()}</div>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteWebsite(site.id)}>🗑 ลบ</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Websites;
