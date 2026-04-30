import { useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import LeadPopup from "./components/LeadPopup";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import OrderSuccess from "./pages/OrderSuccess";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [popup, setPopup] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setPopup(product);

    setTimeout(() => {
      setPopup(null);
    }, 2200);
  };

  return (
    <>
      <Navbar setPage={setPage} cartCount={cart.length} />

      {page === "home" && <Home addToCart={addToCart} setPage={setPage} />}

      {page === "cart" && (
        <Cart cart={cart} setCart={setCart} setPage={setPage} />
      )}

      {page === "checkout" && (
        <Checkout
          cart={cart}
          setPage={setPage}
          setOrderData={setOrderData}
        />
      )}

      {page === "success" && (
        <OrderSuccess orderData={orderData} setPage={setPage} />
      )}

      {page === "admin-login" && <AdminLogin setPage={setPage} />}

      {page === "admin" && <Admin setPage={setPage} />}

      {popup && (
        <div className="cartPopup">
          <strong>{popup.name}</strong>
          <span>Added to your ritual bag</span>
          <button onClick={() => setPage("cart")}>View Cart</button>
        </div>
      )}

      {page !== "admin" && page !== "admin-login" && (
        <>
          <LeadPopup />

          <div className="stickyOffer">
            <span>🔥 Most Popular: Glow Boost Ritual ₹1,999</span>
            <button onClick={() => setPage("home")}>Shop Now</button>
          </div>

          <FloatingWhatsApp />
        </>
      )}
    </>
  );
}