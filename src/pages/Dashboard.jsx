import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { keycloak, initialized } = useKeycloak();
  const [courses, setCourses] = useState([]);

  // โหลดข้อมูลเมื่อ initialized และ authenticated
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/courses', {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลคอร์ส:', error);
      }
    };

    if (initialized && keycloak.authenticated) {
      fetchCourses();
    }
  }, [initialized, keycloak]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
 

      {/* Profile */}
      <div className="profile">
        <img
          src="https://www.svgrepo.com/show/382106/incognito-user.svg"
          alt="User"
          className="profile-img"
        />
        <div>
          <h1 className="username">{keycloak.tokenParsed?.preferred_username}</h1>
          
          <p>Websites ที่เลือกลงทะเบียน: <span className="highlight">5</span></p>
          <button className="website-button">เว็บไซต์</button>
          <p>คลิกทั้งหมด: <span className="highlight">72</span></p>
          
        </div>
      </div>

      {/* Courses */}
      <div className="course-table">
        <h2>คอร์สสอนออนไลน์ที่ถูกคลิกมากที่สุด</h2>
        <div className="course-header">
          <div>ชื่อคอร์สออนไลน์</div>
          <div>จำนวนคลิก</div>
          <div>เวลา</div>
        </div>
        {courses.map((item, index) => (
          <div className="course-row" key={index}>
            <div>{item.name}</div>
            <div>{item.clicks}</div>
            <div>{item.time}</div>
          </div>
        ))}
        <div className="status">🟢 ใช้งานได้ | 0 โหวต</div>
      </div>
    </div>
  );
};

export default Dashboard;
