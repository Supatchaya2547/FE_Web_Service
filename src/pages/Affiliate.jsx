import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';
import '../styles/Courses.css';

const Affiliate = () => {
  const { keycloak, initialized } = useKeycloak();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/GetAllCourses', {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

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
    <div className="container" style={{ padding: '20px', margin: '50px'}}>
      {/* <nav className="navbar">
        <div className="logo-circle"></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/website">Websites</Link>
          <Link to="/courses">Insurances</Link>
          <a href="#" onClick={() => keycloak.logout()}>Sign out</a>
        </div>
      </nav> */}

      <h2 className="heading">คอร์สเรียนออนไลน์ทั้งหมด</h2>

      <div className="course-grid">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div className="course-card" key={index}>
              <img
                src={course.image || "https://via.placeholder.com/150"}
                alt={course.title}
              />
              <p>{course.title}</p>
            </div>
          ))
        ) : (
          <p>{JSON.stringify(courses,null,2)}</p>
        )}
      </div>
    </div>
  );
};

export default Affiliate;
