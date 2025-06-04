import { useState } from "react";
import Header from "../components/Header.jsx";
import Container from "@mui/material/Container";
import "../index.css";
import can from "../assets/images/Can_2_.png";
import bottle from "../assets/images/bottle.png";
import trashExLogo from "../assets/images/trash-ex-logo.png";

import RecycleMachineLocations from './RecycleMachineLocations.jsx';
import OilMachineLocations from './OilMachineLocations.jsx';

export default function MachinePosition() {
  const [activeCity, setActiveCity] = useState(
    "ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม"
  );

  const openCity = (type) => {
    setActiveCity(type);
  };

  return (
    <>
      {/* <Header /> */}
      <Container maxWidth="sm">
        <div className="text-2xl text-center mt-10">ตำแหน่งตู้</div>
        <div className="bg-grey-bg mt-10 grid grid-cols-2 rounded-t-lg">
          <button
            className={` tablink h-40 pt-5 text-xs  rounded-t-lg ${activeCity === "ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม"
                ? "w3-green"
                : ""
              }`}
            onClick={() => openCity("ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม")}
          >
            ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม
            <div className="mt-5 grid grid-cols-2 ">
              <img src={can} alt="can" width="70" className="ml-5" />
              <img src={bottle} alt="bottle" width="40" className="ml-5" />
            </div>
          </button>
          <button
            className={`tablink text-xs  rounded-t-lg ${activeCity === "ตู้รับน้ำมันพืชใช้แล้ว" ? "w3-green" : ""
              }`}
            onClick={() => openCity("ตู้รับน้ำมันพืชใช้แล้ว")}
          >
            <p className="text-center">ตู้รับน้ำมันพืชใช้แล้ว</p>
            <div className="flex justify-center">
              <img src={trashExLogo} alt="logo" width="100" className="mt-5" />
            </div>
          </button>
        </div>
        <div className="w-full h-full bg-white shadow-md shadow-inner rounded-b-lg">
          <div style={{ width: '100%', height: '100%', aspectRatio: 0.5 }}>
            {activeCity === "ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม" ? (
              <RecycleMachineLocations />
            ) : (
              <OilMachineLocations />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
