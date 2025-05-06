

import React, { useEffect, useRef, useState } from 'react';
import '../styles/affiliatepages.css';
import axios from 'axios';

const Courses = () => {

  const [apiData, setApiData] = useState([]);
  const [apiType, setApiType] = useState([]);
  const [apiInts, setApiInts] = useState([]);
  const [coursename, setcoursename] = useState("");
  const [type, settype] = useState("");
  const [instructor, setinstructor] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const token_input = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8081/getType")
      .then((t) => {
        console.log(t.data)
        if (t.data) {
          setApiType(t.data);
        } else if (t.data.error) {
          console.log(t.data.error); // เก็บข้อความข้อผิดพลาด
          setApiType([]); // ล้างรายการ products
        }
      })
      .catch((error) => {
        console.error("APIType error :", error);
      })

    axios.get("http://localhost:8081/getInts")
      .then((i) => {
        console.log(i.data)
        if (i.data) {
          setApiInts(i.data);
        } else if (i.data.error) {
          console.log(i.data.error); // เก็บข้อความข้อผิดพลาด
          setApiInts([]); // ล้างรายการ products
        }
      })
      .catch((error) => {
        console.error("APIInts error :", error);
      })

  }, []);
  let URL = "";

  if ((coursename || type || instructor)) {
    if (type === "วิชา"){
        settype("")
    }
    if (instructor === "ผู้สอน"){
        setinstructor("")
    }
    URL = `http://localhost:8081/api/data?n=${coursename}&t=${type}&i=${instructor}`
  } else {
    URL = `http://localhost:8081/api/GetAllCourses`
  }

  // รอแก้ http://localhost:8081/api/GetAllCourses รอเพิ่ม Backend เก็บหาร click ของ URL Affiliate
  function copyToClipboard(parameter) {
    if (parameter !== "") {
      navigator.clipboard.writeText(parameter)
        .then(() => alert("คัดลอกเรียบร้อยแล้ว!"))
        .catch(err => alert("เกิดข้อผิดพลาด: " + err));
    } else {
      alert("ไม่สามารถคัดลอกได้")
    }

  }
  // ดึงข้อมูลจาก API
  const fetchData = (coursename, type, instructor, token) => {
    if (token) {
      axios.get(URL, {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => {
          // console.log(response.data)
          if (response.data) {
            setApiData(response.data);
            setError(null);
          } else if (response.data.error) {
            setError(response.data.error); // เก็บข้อความข้อผิดพลาด
            setApiData([]); // ล้างรายการ products
          }
        })
        .catch((error) => {
          console.error("error :", error);
          console.log(URL)
          setError("ดึงข้อมูลไม่ได้");
          setApiData(["Token ของคุณหมดอายุ หรือ ไม่ถูกต้อง กรุณากรอกใหม่"]);
        })

    } else {
      console.log("Not working")
      console.log(token)
      setApiData(["คุณยังไม่ได้ใส่ Token"]);
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

        <div className="api-info-box">
           <h2 className="api-info-title">พารามิเตอร์สำหรับ API</h2>
           <table className="parameter-table">
             <thead>
               <tr>
                 <th>Parameter</th>
                 <th>Required</th>
                 <th>Type</th>
                 <th>Default Value</th>
                 <th>Description</th>
                 <th>Token</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>n</td>
                 <td>
                   <span className="badge badge-optional">Optionals*</span>
                 </td>
                 <td>string</td>
                 <td>&lt;empty&gt;</td>
                 <td>
                   <div className="param-desc">Courses Name to search for.</div>
                   <div className="param-desc-sub">(ค้นหาจากชื่อคอร์ส)</div>
                 </td>
                 <td>
                   <span className="badge badge-required">Token Required*</span>
                 </td>
               </tr>
               <tr>
                 <td>t</td>
                 <td>
                   <span className="badge badge-optional">Optionals*</span>
                 </td>
                 <td>string</td>
                 <td>&lt;empty&gt;</td>
                 <td>
                   <div className="param-desc">Courses Type to search for.</div>
                   <div className="param-desc-sub">(ค้นหาจากประเภทของคอร์ส)</div>
                 </td>
                 <td>
                   <span className="badge badge-required">Token Required*</span>
                 </td>
               </tr>
               <tr>
                 <td>i</td>
                 <td>
                   <span className="badge badge-optional">Optionals*</span>
                 </td>
                 <td>string</td>
                 <td>&lt;empty&gt;</td>
                 <td>
                   <div className="param-desc">Course_Instructor to search for.</div>
                   <div className="param-desc-sub">(ค้นหาจากชื่อผู้สอน)</div>
                 </td>
                 <td>
                   <span className="badge badge-required">Token Required*</span>
                 </td>
               </tr>
             </tbody>
           </table>
            <p className="text-note">
              * ถ้าหากไม่ใส่ parameter ตัวไหนเลย API จะกลายเป็น http://localhost:8081/api/GetAllCourses *
            </p>
         </div>
        

        {/* Parameter Box */}
        <div className="mx-auto mt-8 w-[350px] h-[200px] bg-[#998cff] text-left p-4 font-bold text-md text-[#1a1a1a]">
          parameter ( บอก api apec ว่ามีอะไรได้บ้าง )
        </div>

        {/* Form Section */}
        <input type="text" onChange={(e) => { setcoursename(e.target.value) }} className="border border-black p-2" placeholder="Enter your course Name" />

        <select className="border border-black p-2" onChange={(e) => { settype(e.target.value) }}>
          <option>วิชา</option>
          {apiType.map(t => (
            <option key={t.course_type} value={t.course_type}>
              {t.course_type} 
            </option>
          ))}

        </select>

        <select className="border border-black p-2" onChange={(e) => { setinstructor(e.target.value) }}>
          <option>ผู้สอน</option>
          {apiInts.map(i => (
  <option key={i.course_instructor} value={i.course_instructor}>
    {i.course_instructor}
  </option>
))}

        </select>

        <input ref={token_input} type="text" placeholder="your token" className="border border-black p-2" onChange={(e) => { setToken(e.target.value) }} />
        <button className="bg-[#998cff] px-4 py-2" onClick={() => token_input.current.value = ""} >🗑️</button>
        <button className="bg-[#998cff] px-4 py-2" onClick={() => fetchData(coursename, type, instructor, token)}>Fetch Data</button>
        <button className="bg-[#998cff] px-4 py-2" onClick={() => copyToClipboard(URL)} >Copy API</button>
        <button className="bg-[#998cff] px-4 py-2" onClick={() => copyToClipboard(JSON.stringify(apiData, null, 2))}>Copy Data</button>
      </div>

      {/* API Display Box */}
      <div>
        Data will show here
        <div className="border border-gray-400 rounded p-4 max-h-64 overflow-auto bg-gray-50 text-sm font-mono whitespace-pre-wrap">
          {/* ข้อมูลหลังจากดึงมาแล้วเอามาโชว์ */}
          {JSON.stringify(apiData, null, 2)}
        </div>
      </div>


    </div>
  );
};

export default Courses;