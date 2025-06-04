import React, {useState} from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/trash-ex-logo.png";
import "../components/style.css";
import { BsBasket2 } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
export default function ChooseWimon() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count+1);
  }
  const handleDecrement = () => {
    if(count > 0) {
      setCount(count-1);
    }
  }
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };
  return (
    <>
      <nav className="flex items-center justify-between p-5 pr-20 bg-white">
        <NavLink to="/">
          <img src={logo} alt="Logo" width={100} />
        </NavLink>
        <NavLink to="/conclusion">
        <BsBasket2 className="w-10 h-10 text-green-700 ml-10 relative top-4" />
        {count >= 0 && (
            <span className="relative number-basket  inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
              {count}
            </span>
          )}
        </NavLink>
        <div className="flex flex-col">
          <BsCoin  className="w-7 h-7 text-yellow-hard ml-8 " />
          <p className="ml-6 mt-2"><strong>32000</strong></p>
        </div>

        <div>
          <ul id="navbar" className={clicked ? "#navbar open" : "#navbar"}>
            <li>
              <NavLink
                className="font-semibold hover:text-yellow-hard"
                to="/UserProfile"
                style={({ isActive }) => {
                  return { color: isActive ? "yellow-hard" : "" };
                }}
              >
                ข้อมูลส่วนตัว/ลงทะเบียน
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-semibold hover:text-yellow-hard"
                to="/history-point"
                style={({ isActive }) => {
                  return { color: isActive ? "yellow-hard" : "" };
                }}
              >
                คะแนนสะสมและประวัติการแลกแต้ม
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-semibold hover:text-yellow-hard"
                to="/history-service-machine"
                style={({ isActive }) => {
                  return { color: isActive ? "yellow-hard" : "" };
                }}
              >
                ประวัติการใช้บริการตู้
              </NavLink>
            </li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
      <Container maxWidth="sm">
        <div className="w-full h-60 bg-grey-bg mt-10 rounded-md">
          <div className="flex justify-center ">
            <div className="background w-40 h-40 "></div>
          </div>
          <div className="flex flex-row mt-10">
            <button className="basis-1/4 rounded-bl-md bg-red-hard-bg text-white font-bold text-3xl pb-3 width-button-inandde" style={{height: '2.9rem'}} onClick={handleDecrement} >-</button>
            <button className="basis-1/2 col-start-2 col-span-4 bg-yellow-hard-bg  font-bold width-button-count" style={{height: '2.9rem'}}>{count}</button>
            <button className="basis-1/4 bg-green-hard-bg text-white font-bold text-3xl pb-3 rounded-br-md width-button-inandde" style={{height: '2.9rem'}} onClick={handleIncrement} >+</button>
          </div>
        </div>
        <p className="text-center text-2xl mt-3">บร็อคโคลี</p>
        <p className="text-center text-2xl mt-3 pb-10">35 แต้ม</p>

        <div className="w-full h-60 bg-grey-bg mt-10 rounded-s-md">
          <div className="flex justify-center ">
            <div className="background-2 w-40 h-40 relative top-10 left-5"></div>
          </div>
          <div className="flex flex-row mt-10">
            <button className="basis-1/4 rounded-bl-md bg-red-hard-bg text-white font-bold text-3xl pb-3 width-button-inandde" style={{height: '2.9rem'}} onClick={handleDecrement} >-</button>
            <button className="basis-1/2 col-start-2 col-span-4 bg-yellow-hard-bg  font-bold width-button-count" style={{height: '2.9rem'}}>{count}</button>
            <button className="basis-1/4 bg-green-hard-bg text-white font-bold text-3xl pb-3 rounded-br-md width-button-inandde" style={{height: '2.9rem'}} onClick={handleIncrement} >+</button>
          </div>
        </div>
        <p className="text-center text-2xl mt-3">แตงกวา</p>
        <p className="text-center text-2xl mt-3 pb-10">50 แต้ม</p>

        <div className="w-full h-60 bg-grey-bg mt-10 rounded-s-md">
          <div className="flex justify-center ">
            <div className="background-3 w-40 h-40 relative top-10 left-5"></div>
          </div>
          <div className="flex flex-row mt-10">
            <button className="basis-1/4 rounded-bl-md bg-red-hard-bg text-white font-bold text-3xl pb-3 width-button-inandde" style={{height: '2.9rem'}} onClick={handleDecrement} >-</button>
            <button className="basis-1/2 col-start-2 col-span-4 bg-yellow-hard-bg  font-bold width-button-count" style={{height: '2.9rem'}}>{count}</button>
            <button className="basis-1/4 bg-green-hard-bg text-white font-bold text-3xl pb-3 rounded-br-md width-button-inandde" style={{height: '2.9rem'}} onClick={handleIncrement} >+</button>
          </div>
        </div>
        <p className="text-center text-2xl mt-3">พริกหยวก</p>
        <p className="text-center text-2xl mt-3 pb-10">50 แต้ม</p>

      </Container>
    </>
  );
}


