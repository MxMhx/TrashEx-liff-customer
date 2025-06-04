import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import Container from "@mui/material/Container";
import "../index.css";
import can from "../assets/images/Can_2_.png";
import bottle from "../assets/images/bottle.png";
import trashExLogo from "../assets/images/trash-ex-logo.png";
import { FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getAllHistoryMachines } from "../api/strapi/historyMachineApi";
import { convertDateTime } from '../components/ConvertDateTime';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HistoryServiceMachine() {
  const token = localStorage.getItem("jwt");
  const { id } = useParams();
  const [recycleMachines, setRecycleMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCity, setActiveCity] = useState(
    "ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม"
  );

  // Function to handle tab click
  const openCity = (type) => {
    setActiveCity(type);
  };

  useEffect(() => {
    const fetchRecycleMachines = async () => {
      try {
        setLoading(true);
        const recycleMachinesData = await getAllHistoryMachines(id, token);
        setRecycleMachines(recycleMachinesData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRecycleMachines();
  }, [id, token]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <div className="text-2xl text-center mt-10">ประวัติการใช้บริการตู้</div>
        <div className="bg-grey-bg mt-8 grid grid-cols-2 rounded-t-lg">
          <button
            className={`tablink h-40 pt-5 text-xs rounded-t-lg ${
              activeCity === "ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม"
                ? "w3-green"
                : ""
            }`}
            onClick={() => openCity("ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม")}
          >
            ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม
            <div className="mt-2 grid grid-cols-2 ">
              <img src={can} alt="can" width="70" className="ml-5" />
              <img src={bottle} alt="bottle" width="40" className="ml-5" />
            </div>
          </button>

          <button
            className={`tablink text-xs rounded-t-lg ${
              activeCity === "ตู้รับน้ำมันพืชใช้แล้ว" ? "w3-green" : ""
            }`}
            onClick={() => openCity("ตู้รับน้ำมันพืชใช้แล้ว")}
          >
            <p className="text-center">ตู้รับน้ำมันพืชใช้แล้ว</p>
            <div className="flex justify-center">
              <img src={trashExLogo} alt="logo" width="100" className="mt-5" />
            </div>
          </button>
        </div>

        <div className="w-full h-full pb-14 bg-white shadow-md shadow-inner rounded-b-lg">
          <div
            id="bottle"
            className="w3-container city flex justify-center items-center"
            style={{
              display:
                activeCity === "ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม"
                  ? "block"
                  : "none",
            }}
          >
                      {recycleMachines.length > 0 ? (
                        recycleMachines.map((machine) => (
                          <div
                            key={machine.id}
                            className="w-full shadow-can shadow-inner mt-10 mb-3 pb-5 p-2 bg-content rounded-lg"
                          >
                            <div className="flex justify-center">
                              {machine.type === "bottle" ? (
                                <img src={bottle} alt="bottle" width="60" className="mt-2" />
                              ) : machine.type === "can" ? (
                                <img src={can} alt="can" width="60" className="mt-2" />
                              ) : null}
                            </div>

                            <p className="text-center text-2xl font-bold mt-5">
                              {machine.type === "bottle"
                                ? `ขวดพลาสติก ${machine.quantity || 0} ขวด`
                                : machine.type === "can"
                                ? `กระป๋องอลูมิเนียม ${machine.quantity || 0} กระป๋อง`
                                : null}
                            </p>

                            <div className="grid grid-rows-3">
                              <div className="text-base mt-5">
                                <FaChevronRight className="float-left text-xl ml-3" />
                                &nbsp;&nbsp; {convertDateTime(machine.date, machine.time)}
                              </div>

                              <div className="text-base mt-5">
                                <FaChevronRight className="float-left text-xl ml-3" />
                                &nbsp;&nbsp; หมายเลขตู้เลขที่ {machine.serialNumber}
                              </div>

                              <div className="text-base mt-5">
                                <FaChevronRight className="float-left text-xl ml-3" />
                                &nbsp;&nbsp; แต้มที่ได้รับทั้งหมด {machine.point || 0} แต้ม
                              </div>
                            </div>
                          </div>
                        ))
            ) : (
              <p className="text-center mt-10 text-lg">ไม่มีประวัติการใช้ตู้รับทิ้งขวดพลาสติกและกระป๋องอลูมิเนียม</p>
            )}
          </div>

          <div
            id="oil"
            className="w3-container city flex justify-center items-center"
            style={{
              display: activeCity === "ตู้รับน้ำมันพืชใช้แล้ว" ? "block" : "none",
            }}
            >
            <p className="text-center mt-10 text-lg">ไม่มีประวัติการใช้ตู้รับน้ำมันพืช</p>
          </div>
        </div>
      </Container>
    </>
  );
}
