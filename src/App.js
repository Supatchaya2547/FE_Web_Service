import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './keycloak';
import Navbar from './components/Navbar';


import Home from './Home';
import Affiliate from './pages/Affiliate';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Websites from './pages/Websites';
import Course_detail from './pages/Course_detail';

const AuthSync = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      registerAffiliate();
    }
  }, [keycloak.authenticated]);

  const registerAffiliate = async () => {
    try {
      await keycloak.updateToken(5);
      const res = await fetch('http://localhost:8081/api/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${keycloak.token}`,
        },
      });
      if (!res.ok) {
        console.error('Failed to register affiliate');
      } else {
        const result = await res.json();
        console.log('Registered:', result);
      }
    } catch (err) {
      console.error('Error during affiliate register:', err);
    }
  };

  return null;
};

function App() {
  const handleOnEvent = (event, error) => {
    console.log('onKeycloakEvent', event, error);
  };

  const loadingComponent = <div>กำลังโหลด Keycloak...</div>;

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={handleOnEvent}
      LoadingComponent={loadingComponent}
      initOptions={{
        checkLoginIframe: false,
        onLoad: 'check-sso',
        redirectUri: 'http://localhost:3000/',
        pkceMethod: 'S256',
      }}
    >

      <AuthSync />
      <Router>
        <Navbar /> {/* ✅ แสดง Navbar ทุกหน้า */}
        <div className="page-container"> {/* ✅ ใส่ padding-top ป้องกัน Navbar บัง */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/website" element={<Websites />} />
            <Route path="/course_detail/:id/:url?/:act?" element={<Course_detail />} />
          </Routes>
        </div>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;

