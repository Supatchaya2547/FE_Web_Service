import React, { useState } from 'react';
import '../styles/affiliatepages.css';
import axios from 'axios';

const AffilicatePage = () => {

  const [apiData, setApiData] = useState(null);
  const [coursename, setcoursename] = useState("");
  const [type, settype] = useState("");
  const [instructor, setinstructor] = useState("");
  const [error, setError] = useState(null);

  const URL = "http://localhost:8081/api/data"



  // ดึงข้อมูลจาก API
  const fetchData = (coursename, type, instructor) => {
    if (coursename || type || instructor) {
      axios.get(`http://localhost:8081/api/data?s=${coursename}&t=${type}&i=${instructor}`)
        .then((response) => {
          if (response.data.items) {
            setApiData(response.data.items);
            setError(null);
          } else if (response.data.error) {
            setError(response.data.error); // เก็บข้อความข้อผิดพลาด
            setApiData([]); // ล้างรายการ products
          }
        })
        .catch((error) => {
          console.error("error :", error);
          setError("ดึงข้อมูลไม่ได้");
        })

    } else {
      setApiData([]);
    }
  };




  return (
    <div className="min-h-screen bg-[#ede1ff]" style={{ padding: '20px', margin: '50px' }}>
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#bba8ff]">
        <div className="w-8 h-8 rounded-full bg-black" />
        {/* <div className="flex space-x-6 font-semibold text-lg">
          <span>Affilicate</span>
          <span>Sing out</span>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="text-center mt-12">
        <h1 className="text-3xl font-bold">ยินดีต้อนรับเข้าสู่ Affilicate</h1>

        {/* Parameter Box */}
        <div className="mx-auto mt-8 w-[350px] h-[200px] bg-[#998cff] text-left p-4 font-bold text-md text-[#1a1a1a]">
          parameter ( บอก api apec ว่ามีอะไรได้บ้าง )
        </div>


        {/* Form Section */}
        <input type="text" onChange={(e) => { setcoursename(e.target.value) }} className="border border-black p-2" placeholder="Enter your course Name" />

        <select className="border border-black p-2" onChange={(e) => { settype(e.target.value) }}>
          <option>วิชา</option>
        </select>

        <select className="border border-black p-2" onChange={(e) => { setinstructor(e.target.value) }}>
          <option>ผู้สอน</option>
          {/* {apiData.map(instructor_name => (
        <option key={apiData.course_id} value={apiData.course_id}>
          {instructor_name}
        </option>
          ))} */}
        </select>

        <input type="text" placeholder="your key" className="border border-black p-2" />
        <button className="bg-[#998cff] px-4 py-2" onClick={fetchData}>Get API</button>
      </div>

      {/* API Display Box */}
      <div className="mt-6 border border-black mx-auto w-[600px] h-[50px] flex items-center justify-center">
        Data will show here
        <div className="border border-gray-400 rounded p-4 max-h-64 overflow-auto bg-gray-50 text-sm font-mono whitespace-pre-wrap">
          {/* ข้อมูลหลังจากดึงมาแล้วเอามาโชว์ */}
          {JSON.stringify(apiData, null, 2)}
        </div>
      </div>


    </div>
  );
};

export default AffilicatePage;
