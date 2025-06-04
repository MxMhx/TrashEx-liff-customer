import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/images/trash-ex-logo.png";
import "./style.css";
import { BsBasket2, BsCoin } from "react-icons/bs";
import { getUser } from "../api/strapi/userApi";
import { getAllRedeems } from "../api/strapi/redeemApi";
import { CartContext } from "./CartContext";
import LoadingSpinner from "./LoadingSpinner";
import Alert from "./Alert";
import liff from '@line/liff';

function Header() {
  const storedCounts = JSON.parse(localStorage.getItem('cart') || '{}');
  const totalItems = Object.values(storedCounts).reduce((acc, count) => acc + count, 0);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem("jwt");

  const [user, setUser] = useState(null);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        const pointsData = await getAllRedeems(userData?.id, token);
        setPoints(pointsData || []);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  useEffect(() => {
    if (user?.point) {
      localStorage.setItem('point', user.point);
    }
  }, [user]);

  const handleClick = () => setClicked(prev => !prev);

  const handleBasketClick = () => {
    if (totalItems === 0) {
      setShowModal(true);
    } else {
      localStorage.setItem('totalItems', totalItems);
      navigate('/cart', { state: { storedCounts, cartItems } });
    }
  };

  const handleCoinClick = () => {
    if (points.length === 0) {
      setShowModal2(true);
    } else {
      navigate(`/history-point/${user?.id}`);
    }
  };

  const handleLogout = () => {
    liff.logout();
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <nav className="flex items-center justify-between p-5 pr-20 bg-gradient-to-r from-primary-blue to-dark-blue shadow-lg">
        <NavLink to="/home">
          <img src={logo} alt="Logo" width={100} className="filter brightness-0 invert" />
        </NavLink>

        <div className="flex items-center relative">
          <BsBasket2 className="w-10 h-10 text-white hover:text-light-blue ml-10 transition-colors duration-200 cursor-pointer" onClick={handleBasketClick} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-md">
              {totalItems}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <BsCoin className="w-7 h-7 text-yellow-400 hover:text-yellow-300 ml-8 transition-colors duration-200 cursor-pointer" onClick={handleCoinClick} />
          <p className="ml-6 mt-2 text-white font-semibold">
            <strong>{user?.point ?? 0}</strong>
          </p>
        </div>

        <div>
          <ul id="navbar" className={clicked ? "navbar open" : "navbar"}>
            <li>
              <NavLink className="font-semibold text-white hover:text-light-blue transition-colors duration-200" to="/update-user-profile">
                ข้อมูลส่วนตัว
              </NavLink>
            </li>
            <li>
              <NavLink className="font-semibold text-white hover:text-light-blue transition-colors duration-200" to={`/history-point/${user?.id}`}>
                คะแนนสะสมและประวัติการแลกแต้ม
              </NavLink>
            </li>
            <li>
              <NavLink className="font-semibold text-white hover:text-light-blue transition-colors duration-200" to={`/history-service-machine/${user?.id}`}>
                ประวัติการใช้บริการตู้
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout} className="font-semibold text-white hover:text-red-300 transition-colors duration-200" to={'/'}>
                ออกจากระบบ
              </NavLink>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times text-white" : "fas fa-bars text-white"}></i>
        </div>
      </nav>

      {showModal && (
        <Alert title="No items in the cart." message="Please add some products to proceed." status="failed" closeModal={() => setShowModal(false)} />
      )}
      {showModal2 && (
        <Alert title="No Point Redemption Records." message="Please make a redemption to view your history." status="failed" closeModal={() => setShowModal2(false)} />
      )}
    </>
  );
}

export default Header;
