import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import Navbar from './components/Navbar';


import Home from './Home';
import Affiliate from './pages/Affiliate';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Websites from './pages/Websites';

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
      <Router>
        <Navbar /> {/* ✅ แสดง Navbar ทุกหน้า */}
        <div className="page-container"> {/* ✅ ใส่ padding-top ป้องกัน Navbar บัง */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/website" element={<Websites />} />
          </Routes>
        </div>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;


// import React from 'react';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import keycloak from './keycloak';
// import Home from './Home';

// function App() {
//   const handleOnEvent = (event, error) => {
//     console.log('onKeycloakEvent', event, error);
//   };

//   const loadingComponent = <div>กำลังโหลด Keycloak...</div>;

//   return (
//     <ReactKeycloakProvider
//       authClient={keycloak}
//       onEvent={handleOnEvent}
//       LoadingComponent={loadingComponent}
//       initOptions={{
//         checkLoginIframe: false,
//         onLoad: 'check-sso',
//         redirectUri: 'http://localhost:3000/', 
//         pkceMethod: 'S256' 
//       }}
//     >
//       <Home />
//     </ReactKeycloakProvider>
//   );
// }

// export default App;
