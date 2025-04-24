// src/Home.js
import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { keycloak, initialized } = useKeycloak();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // console.log(">> Token:", keycloak.token);
      if (!keycloak.token) {
        throw new Error('ไม่มีโทเค็น');
      }
      
      const response = await fetch('http://localhost:8081/api/userdata', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API ตอบกลับด้วยสถานะ: ${response.status}`);
      }
      
      const result = await response.json();
      setApiData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!initialized) {
    return <div>กำลังโหลด...</div>;
  }

  function copyToClipboard() {
    const copyText = "Bearer "+keycloak.token;
    navigator.clipboard.writeText(copyText)
      .then(() => alert("คัดลอก token เรียบร้อยแล้ว!"))
      .catch(err => alert("เกิดข้อผิดพลาด: " + err));
  }

  return (
    <div style={{ padding: '20px', margin: '50px'}}>
      {keycloak.authenticated ? (
        <>
          <h1>ยินดีต้อนรับ, {keycloak.tokenParsed?.preferred_username}</h1>
          
          <button 
            onClick={fetchData} 
            disabled={loading}
            style={{ padding: '8px 16px', margin: '10px 0' }}
          >
            {loading ? 'กำลังโหลด...' : 'เรียกข้อมูลของคุณ'}
          </button>
          
          {error && (
            <div style={{ color: 'red', margin: '10px 0' }}>
              ข้อผิดพลาด: {error}
            </div>
          )}
          
          {apiData && (
            <div>
              <h2>ข้อมูล API:</h2>
              <pre style={{ 
                background: '#f4f4f4', 
                padding: '10px', 
                borderRadius: '4px',
                maxWidth: '100%',
                overflow: 'auto'
              }}>
                {JSON.stringify(apiData, null, 2)}
              </pre>
            </div>
          )}

          <button 
            onClick={() => copyToClipboard()} 
            style={{ padding: '8px 16px', margin: '10px 0' }}
          >
            copy token
          </button>
        </>
      ) : (
        <div>กำลังเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ...</div>
      )}
    </div>
  );
}

export default Home;