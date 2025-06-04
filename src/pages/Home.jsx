import "../index.css";
import { Link } from "react-router-dom";
import { getShopsWithProducts } from "../api/strapi/shopApi";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa'; // import icon for map
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
// import Login from "./Login.jsx";
// import { ChooseShop } from "./ChooseShop.jsx";
// import { ShopDetails } from "./ShopDetails.jsx";
// const baseURL = "https://cookbstaging.careervio.com/api/shops/?populate=image";

function Home() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("jwt");

  console.log("token in home: ", token);
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const shopData = await getShopsWithProducts(token);
        setShops(shopData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchShops();
  }, [token]);

  localStorage.setItem('shops', JSON.stringify(shops));

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <Header />
      <div className="mx-auto px-4">
        <div className="grid mt-5 md:grid-cols-2 md:gap-5 md:mt-2 lg:grid-cols-3  lg:gap-5 lg:mt-7">
        {/* {shops.map((shop) => (
          <>
          <Link to={`/shop/${shop.id}`} key={shop.id}>

            <div className="shop-2">
            <span
              className="circle"
              style={{
                backgroundImage: shop.image?.data?.attributes?.url
                  ? `url(${API_URL}${shop.image.data.attributes.url})`
                  : 'url(https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg)', // fallback to default image if no image found
                backgroundSize: "cover",
              }}
            ></span>
              <span className="pl-2">{shop.name}</span>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${shop.latitude},${shop.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 ml-2 flex items-center mt-2"
                >
                <FaMapMarkerAlt className="mr-1" /> View on Map
              </a>
                </div>

          </Link>
          </>
        ))} */}
         {shops.map((shop) => (
          <div key={shop.id} className="relative flex flex-col w-auto h-auto bg-card-white border-2 border-light-blue mt-4 mb-4 pb-2 justify-center items-center rounded-xl text-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
            <Link to={`/shop/${shop.id}`} className="flex flex-col w-full h-full items-center">
              <span
                className="circle w-full h-48 rounded-lg bg-cover bg-center border-2 border-light-blue"
                style={{
                  backgroundImage: shop.image?.data?.attributes?.url
                    ? `url(${API_URL}${shop.image.data.attributes.url})`
                    : 'url(https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg)',
                  backgroundSize: "cover",
                }}
              ></span>
              <span className="text-center text-2xl font-semibold mb-12 drop-shadow-md text-dark-blue mt-4">{shop.name}</span>
            </Link>

            {/* Add map icon with link to Google Maps positioned at the bottom right */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${shop.latitude},${shop.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 left-2 text-primary-blue flex items-center bg-light-blue/30 hover:bg-light-blue/50 rounded-lg p-2 transition-all duration-200"
            >
              <FaMapMarkerAlt className="mr-1 text-base" /> <span className="text-sm font-medium">Locate on Map</span>
            </a>
          </div>
        ))}

        </div>
      </div>
    </>
  );
}

export default Home;


// function Home() {
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_URL = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("jwt");

//   console.log("token in home: ", token);

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         setLoading(true);
//         const shopData = await getAllShops(token);

//         // Sort the shops by name (A-Z) after fetching the data
//         const sortedShops = shopData.sort((a, b) =>
//           a.name.localeCompare(b.name, 'th', { sensitivity: 'base' }) // This works for both English and Thai
//         );

//         setShops(sortedShops);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching shops:', error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchShops();
//   }, [token]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <Header />
//       <div className="mx-auto px-4">
//         <div className="grid mt-5 md:grid-cols-2 md:gap-5 md:mt-2 lg:grid-cols-3 lg:gap-5 lg:mt-7">
//           {shops.map((shop) => (
//             <Link to={`/shop/${shop.id}`} key={shop.id}>
//               <div className="shop-2">
//                 <span
//                   className="circle"
//                   style={{
//                     backgroundImage: shop.image?.data?.attributes?.url
//                       ? `url(${API_URL}${shop.image.data.attributes.url})`
//                       : 'url(https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg)', // fallback image
//                     backgroundSize: 'cover',
//                   }}
//                 ></span>
//                 <span className="pl-2">{shop.name}</span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;
