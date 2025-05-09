import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/affiliatepages.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

// const Course_detail = () => {
//   const { course_id } = useParams(); // ดึง course_id จาก path param

//   const [apidata, setapidata] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const placeholderImage = '../assets/images/placeholder.jpg';

//   useEffect(() => {
//     const sendRequest = async () => {
//       try {
//         // ส่งคำร้องขอแค่ course_id เท่านั้น
//         const response = await axios.get(`http://localhost:8081/GetCoursesById/${course_id}`);
        
//         setapidata(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };

//     sendRequest();
//   }, [course_id]); // ทำงานเมื่อ course_id เปลี่ยนแปลง

const Course_detail = () => {
  const { course_id, url, act } = useParams(); // ดึงค่า id, url, act จาก URL
  const [apidata, setapidata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = '../assets/images/placeholder.jpg';

  useEffect(() => {
    // ส่งข้อมูลไปยัง API
    const sendRequest = async () => {
      try {
        // ตรงนี้ไม่แน่ใจว่าจัส่งพวก url, act ไปยังไงดี หรือถ้ามีไแเดียก็แก้ได้นะ
        const response = await axios.get(`http://localhost:8081/GetCoursesById/${course_id}?url=${url}&act=${act}`);
        setapidata(response.data); // เก็บข้อมูลที่ได้รับจาก API
        setLoading(false); // กำหนดให้ loading เป็น false เมื่อข้อมูลถูกโหลดเสร็จ
      } catch (err) {
        setError(err); // เก็บ error ถ้ามี
        setLoading(false);
      }
    };

    sendRequest();
  }, [course_id, url, act]); // เพิ่ม dependencies เพื่อให้ useEffect ทำงานเมื่อพารามิเตอร์เปลี่ยน

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>เกิดข้อผิดพลาด: {error.message}</p>;
  if (!apidata) return <p>ไม่พบ course ที่คุณต้องการ</p>;

  return (
    <div>
      <Navbar />
      <div>
        <img
          src={apidata.profile_url ? apidata.profile_url : placeholderImage}
          alt={apidata.course_name}
        />
        <h1>Course Name: {apidata.course_name}</h1>
        <p>คำอธิบาย : {apidata.course_desc}</p>
        <p>Thumbnail URL : {apidata.thumbnail_url}</p>
        <p>วิชา : {apidata.course_type}</p>
        <p>ผู้สอน : {apidata.course_instructor}</p>
        <p>ราคา: {apidata.course_price} บาท</p>
        <p>ระยะเวลา : {apidata.duration}</p>
        <p>คะแนน : {apidata.rating}</p>
        <p>จำนวนรีวิว : {apidata.num_reviews}</p>
        <p>จำนวนผู้สมัครเรียน : {apidata.enrollment_count}</p>
        <p>detail URL : {apidata.detail_url}</p>
        <p>สร้างเมื่อ : {apidata.created_at}</p>
        <p>อัปเดตล่าสุดเมื่อ : {apidata.updated_at}</p>
      </div>
    </div>
  );
};

export default Course_detail;
