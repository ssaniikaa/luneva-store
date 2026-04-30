import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
document.body.appendChild(script);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);