import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import "../components/style.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { getAllProductsByShopId } from "../api/strapi/productApi";
import { CartContext } from '../components/CartContext';
import PointsModal from '../components/PointsModal';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ChooseShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // const [counts, setCounts] = useState(() => {
  //   const storedCounts = localStorage.getItem('cart');
  //   return storedCounts ? JSON.parse(storedCounts) : {};
  // });
  const [counts, setCounts] = useState(() => {

    const isRefreshed = true; // ใช้เงื่อนไขนี้สำหรับการเช็คว่ามีการรีเฟรชหรือไม่
    if (isRefreshed) {
      // รีเซ็ตค่า counts เป็น 0 หรือ object ว่างเปล่า
      localStorage.removeItem('cart');
      localStorage.removeItem('cart2');
      // localStorage.removeItem('point');
      return {};
    } else {
      // ดึงค่าจาก localStorage ถ้ามีการบันทึกไว้

      const storedCounts = localStorage.getItem('cart');
      return storedCounts ? JSON.parse(storedCounts) : {};
    }
  });
  // const token = import.meta.env.VITE_TOKEN_TEST;
  const token = localStorage.getItem("jwt");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useContext(CartContext); // Access addToCart and removeFromCart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const ProductData = await getAllProductsByShopId(token, id);
        localStorage.setItem('shopId', id);
        setProducts(ProductData);
        setLoading(false);

        if (ProductData.length === 0) {
          alert("No product for this shop");
          navigate("/home");
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, token, navigate]);

  // console.log("products[19]: ", p.name);

  const updateCart = (productId, quantity) => {

    const p = products.find(p => p.id === productId);
    console.log("AllP: ", p);
    console.log("add p[",productId, "]: ", p.name, " point: ", p.point, " numStock: ", p.numStock);

    console.log("productId: ", productId, "quantity: ", quantity);
    console.log("counts in update: ", counts);
    const updatedCounts = { ...counts, [productId]: (counts[productId] || 0) + quantity };
    // Retrieve the current cart items from localStorage or an empty array if none exist
    const storedCounts = JSON.parse(localStorage.getItem('cart2')) || [];

    let totalPointsSum = 0;
    let totalCountSum = 0;

    storedCounts.forEach(item => {
      const count = item.counts; // Assuming the counts field contains the quantity of the item
      if (count > 0) {
        const totalPoints = item.point * count; // Calculate total points for the item
        totalPointsSum += totalPoints; // Add points to total sum
        totalCountSum += count; // Add count to total count sum
      }
    });
    const currentPoint = localStorage.getItem('point');
    if (totalPointsSum > currentPoint) {
      setShowModal(true);
      // return;
    }

    // Check if the product already exists in the updatedCounts array
    const existingProductIndex = storedCounts.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
      // If the product exists, update the counts
      storedCounts[existingProductIndex].counts += quantity;
      if (p.numStock < storedCounts[existingProductIndex].counts) {
        console.log("2.1 modal2", showModal2);
        setShowModal2(true);
        console.log("2.2 modal2", showModal2);
        return;
      }
    } else {
      // If the product does not exist, push a new entry with all necessary data
      console.log("p.numStock: ", p.numStock, " >= quantity: ", quantity);
      if (p.numStock < quantity) {
        console.log("1.1 modal2", showModal2);
        setShowModal2(true);
        console.log("1.2 modal2", showModal2);
        return;

      }
      storedCounts.push({
        id: p.id,
        name: p.name,
        counts: quantity, // Initial count based on the update
        point: p.point,
        numStock: p.numStock,
        price: p.price,
      });
    }

    // Update state with an array of products containing detailed information
    setCounts(storedCounts); // Assuming 'counts' is an array of products

    // Store the updated data in localStorage
    localStorage.setItem('cart2', JSON.stringify(storedCounts));
    console.log("storedCounts: ", JSON.stringify(storedCounts));
    setCounts(updatedCounts);
    localStorage.setItem('cart', JSON.stringify(updatedCounts));
    console.log("updatedCounts in update: ", JSON.stringify(updatedCounts));

  };

  const handleIncrement = (product) => {
  console.log("In CountsById[", product.id, "] : ", product);
    addToCart(product);
    updateCart(product.id, 1);
  };

  const handleDecrement = (productId) => {
  console.log("De CountsById[", productId, "] : ", counts[productId]);
    if (counts[productId] > 0) {
      removeFromCart(productId);
      updateCart(productId, -1);
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log("CountsById[", product.id, "] : ", counts[products.id]);
  console.log("products: ", products);
  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      {/* <Header counts={counts} products={products}/> */}
      <Container maxWidth="sm">
        {/* Search input field */}
        <div className="flex justify-center pt-8 px-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Display the shop name if products are available */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-8 mb-2 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {filteredProducts[0]?.shop?.name}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
          </div>
        )}

        {/* Products Container */}
        <div className="px-4 mt-8">
          {filteredProducts
            .filter(product => product.status === "approved")
            .map(product => (
            <div key={product.id} className="mb-8">
              {/* Main Product Card */}
              <div className="w-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Product Image Section */}
                <div className="relative p-6 pb-4">
                  <div className="flex justify-center">
                    <div
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100"
                      style={{
                        backgroundImage: product.image?.data?.attributes?.url
                          ? `url(${API_URL}${product.image.data.attributes.url})`
                          : 'url(https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg)',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center mt-4 px-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm md:text-base font-semibold shadow-md">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {product.point || 0} แต้ม
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Section */}
                <div className="bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center">
                    {/* Decrement Button */}
                    <button
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 text-white font-bold text-xl md:text-2xl py-3 md:py-4 transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-bl-2xl"
                      onClick={() => handleDecrement(product.id)}>
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                        </svg>
                      </span>
                    </button>

                    {/* Count Display */}
                    <div className="flex-1 bg-white border-l border-r border-gray-200 py-3 md:py-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-gray-800">
                        {counts[product.id] || 0}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 mt-1">
                        ในตะกร้า
                      </div>
                    </div>

                    {/* Increment Button */}
                    <button
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-700 active:to-emerald-800 text-white font-bold text-xl md:text-2xl py-3 md:py-4 transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 rounded-br-2xl"
                      onClick={() => handleIncrement(product)}>
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Display a message if no products match the search term */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">ไม่พบสินค้า</h3>
                <p className="text-gray-500">ลองค้นหาด้วยคำหรือชื่อสินค้าอื่น</p>
              </div>
            </div>
          )}
          {showModal &&
            <PointsModal text="แต้มของท่านไม่เพียงพอ" closeModal={() => setShowModal(false)} />
          }
          {showModal2 &&
            <PointsModal text="ขออภัย สินค้าในสต็อกไม่เพียงพอ" closeModal={() => setShowModal2(false)} />
          }
        </div>
      </Container>
    </>
  );
}
