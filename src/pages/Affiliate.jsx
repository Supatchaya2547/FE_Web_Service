import React from 'react';
import '../styles/affiliatepages.css';

const AffilicatePage = () => {
  return (
    <div className="min-h-screen bg-[#ede1ff]" style={{ padding: '20px', margin: '50px'}}>
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
        <div className="flex justify-center items-center mt-8 space-x-4">
          <select className="border border-black p-2">
            <option>Course</option>
          </select>
          <select className="border border-black p-2">
            <option>type</option>
          </select>
          <input type="text" placeholder="jwt key" className="border border-black p-2" />
          <button className="bg-[#998cff] px-4 py-2">Get API</button>
        </div>

         {/* API Display Box */}
         <div className="mt-6 border border-black mx-auto w-[600px] h-[50px] flex items-center justify-center">
          Data will show here
        </div>

        {/* Red note */}
        <div className="text-red-600 font-bold mt-6 text-xl">
          ทำเพิ่มตามเหมาะสม <br /> โดยให้สอดคล้องกับ DB
        </div>

        {/* Instruction Box */}
        <div className="mt-8 text-left w-[800px] mx-auto text-sm">
          <p>ส่วนหน้้า Web ของ Affilator (20 คะแนน)</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Request เรียกดูจาก API Affiliate Service โดยระบุ Parameter ตาม Spec แบบ Token</li>
            <li>นำข้อมูลที่ได้ Response กลับมาแสดงในรูปแบบ JSON บนหน้าจอเพื่อให้ทราบว่า Response ของแต่ละแบบจะออกแบบยังไง</li>
            <li>
              เมื่อผู้ใช้ Click ที่รายการ Affiliate ขอให้ระบบบันทึกว่าเคยดูบริการไหนบ้าง โดยส่ง parameter ที่จำเป็นในการบันทึก log ส่งให้ด้วย
            </li>
          </ol>
          <p className="text-red-500 mt-2">คัดว่าจะแสดง log [ไม่แน่ใจว่าทำยังไง]</p>
        </div>
      </div>
    </div>
  );
};

export default AffilicatePage;
