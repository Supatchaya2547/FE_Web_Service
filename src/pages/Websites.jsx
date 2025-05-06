// import { useKeycloak } from '@react-keycloak/web';
// import React, { useEffect, useState } from 'react';
// import '../styles/Websites.css';

// const Websites = () => {
//   const { keycloak, initialized } = useKeycloak();
//   const [websites, setWebsites] = useState([]);
//   const [url, setUrl] = useState('');

//   const fetchWebsites = async () => {
//     try {
//       const response = await fetch('http://localhost:8081/api/get_url', {
//         headers: {
//           Authorization: `Bearer ${keycloak.token}`,
//         },
//       });
//       const data = await response.json();
//       setWebsites(data);
//     } catch (error) {
//       console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลเว็บไซต์:', error);
//     }
//   };

//   useEffect(() => {
//     if (initialized && keycloak.authenticated) {
//       fetchWebsites();
//     }
//   }, [initialized, keycloak]);

//   const handleAddWebsite = async () => {
//     if (!url.trim()) return;

//     try {
//       await fetch('http://localhost:8081/api/register_url', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${keycloak.token}`,
//         },
//         body: JSON.stringify({ url }),
//       });
//       setUrl('');
//       fetchWebsites();
//     } catch (error) {
//       console.error('เกิดข้อผิดพลาดในการเพิ่มเว็บไซต์:', error);
//     }
//   };

//   const handleDeleteWebsite = async (id) => {
//     try {
//       await fetch(`http://localhost:8081/api/websites/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${keycloak.token}`,
//         },
//       });
//       fetchWebsites();
//     } catch (error) {
//       console.error('เกิดข้อผิดพลาดในการลบเว็บไซต์:', error);
//     }
//   };

//   if (!initialized) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {/* Navbar
//       <div className="navbar">
//         <div className="navbar-left">
//           <div className="logo-circle" />
//         </div>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/website">Websites</Link>
//           <Link to="/courses">Insurances</Link>
//           <a href="#" onClick={() => keycloak.logout()}>Sign out</a>
//         </div>
//       </div> */}

//       <div className="websites-container">
//         <h2 className="title">🌐 เว็บไซต์ที่ลงทะเบียน</h2>

//         <div className="input-group">
//           <input
//             type="text"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button className="add-btn" onClick={handleAddWebsite}>➕ เพิ่มเว็บไซต์</button>
//         </div>

//         <div className="website-list">
//           {websites.map((site) => (
//             <div key={site.id} className="website-item">
//               <div className="website-info">
//                 <strong>{site.name || site.url}</strong>
//                 <div>ลงทะเบียนเมื่อ: {new Date(site.createdAt).toLocaleString()}</div>
//               </div>
//               <button className="delete-btn" onClick={() => handleDeleteWebsite(site.id)}>🗑 ลบ</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Websites;

import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect, useState } from 'react';
import '../styles/Websites.css';

const Websites = () => {
  const { keycloak, initialized } = useKeycloak();
  const [websites, setWebsites] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWebsites = async () => {
    if (!initialized || !keycloak.authenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8081/api/get_url', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      
      const data = await response.json();
      console.log('API Response:', data); // ดูข้อมูลที่ได้จาก API
      
      // ตรวจสอบว่าข้อมูลเป็น Array หรือไม่
      if (Array.isArray(data)) {
        setWebsites(data);
      } else if (data && typeof data === 'object') {
        // กรณีที่ API ส่งข้อมูลมาในรูปแบบ { websites: [...] } หรือมี property อื่นที่เป็น array
        if (data.websites && Array.isArray(data.websites)) {
          setWebsites(data.websites);
        } else if (data.data && Array.isArray(data.data)) {
          setWebsites(data.data);
        } else if (data.urls && Array.isArray(data.urls)) {
          setWebsites(data.urls);
        } else {
          // กรณีที่ API ส่งข้อมูลเป็น object เดี่ยว
          setWebsites([data]);
        }
      } else {
        // กรณีไม่พบข้อมูล หรือข้อมูลมีรูปแบบไม่ถูกต้อง
        setWebsites([]);
        setError('ไม่พบข้อมูลเว็บไซต์ หรือข้อมูลมีรูปแบบไม่ถูกต้อง');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลเว็บไซต์:', error);
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูลเว็บไซต์');
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      fetchWebsites();
    }
  }, [initialized, keycloak.authenticated]);

  const handleAddWebsite = async () => {
    if (!url.trim()) return;

    try {
      await fetch('http://localhost:8081/api/register_url', {
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

        {loading ? (
          <div className="loading">กำลังโหลดข้อมูล...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="website-list">
            {Array.isArray(websites) && websites.length > 0 ? (
              websites.map((site, index) => (
                <div key={site.id || index} className="website-item">
                  <div className="website-info">
                    <strong>{site.name || site.url}</strong>
                    <div>ลงทะเบียนเมื่อ: {site.createdAt ? new Date(site.createdAt).toLocaleString() : 'ไม่ระบุ'}</div>
                  </div>
                  <button className="delete-btn" onClick={() => handleDeleteWebsite(site.id)}>🗑 ลบ</button>
                </div>
              ))
            ) : (
              <div className="no-websites">ยังไม่มีเว็บไซต์ที่ลงทะเบียน</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Websites;