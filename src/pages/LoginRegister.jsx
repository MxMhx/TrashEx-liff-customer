import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register'); // เปลี่ยนไปที่หน้า Register
  };

  const handleLogin = () => {
    navigate('/login'); // เปลี่ยนไปที่หน้า App
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-gray to-light-blue p-4">
      <div className="bg-card-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border-2 border-light-blue">
        <h1 className="text-4xl font-bold text-dark-blue mb-6 text-center">
          Welcome to Cook Project
        </h1>

        <p className="text-lg text-dark-blue mb-10 text-center max-w-2xl leading-relaxed">
          Here's a platform where you can bring your bottles or cans,
          collect points, and exchange them for exciting rewards from our partner stores. <br />
          <span className="text-primary-blue font-semibold">It's not just recycling&mdash;it's rewarding sustainability
          with endless possibilities!</span>
        </p>

        <div className="flex space-x-6 justify-center">
          <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={handleRegister} // เรียกใช้ฟังก์ชัน handleRegister เมื่อคลิกปุ่ม
          >
            Register
          </button>

          <button
            className="bg-gradient-to-r from-primary-blue to-dark-blue hover:from-dark-blue hover:to-primary-blue text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={handleLogin} // เรียกใช้ฟังก์ชัน handleLogin เมื่อคลิกปุ่ม
          >
            Login with Line
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
