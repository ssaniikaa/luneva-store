import { useEffect, useState } from "react";

export default function LeadPopup() {
  const [show, setShow] = useState(false);
  const [coupon, setCoupon] = useState(localStorage.getItem("lunevaCoupon"));

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    skinConcern: ""
  });

  // 👉 PASTE YOUR GOOGLE SCRIPT URL HERE
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/YOUR_ID/exec";

  useEffect(() => {
    if (!localStorage.getItem("lunevaLeadCaptured")) {
      setTimeout(() => setShow(true), 3500);
    }
  }, []);

  useEffect(() => {
    const exitIntent = (e) => {
      if (e.clientY < 15 && !localStorage.getItem("lunevaLeadCaptured")) {
        setShow(true);
      }
    };

    document.addEventListener("mousemove", exitIntent);
    return () => document.removeEventListener("mousemove", exitIntent);
  }, []);

  const saveLead = async () => {
    if (!lead.phone && !lead.email) {
      alert("Enter WhatsApp number or email to unlock offer.");
      return;
    }

    const code = "LUNEVA200";
    const expiry = Date.now() + 10 * 60 * 1000;

    const leadData = {
      ...lead,
      coupon: code,
      source: "Unlock Offer Popup"
    };

    try {
      // 🔹 Save in your backend
      await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
      });

      // 🔹 Save in Google Sheet
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
      });

      // 🔹 Activate coupon
      localStorage.setItem("lunevaCoupon", code);
      localStorage.setItem("lunevaCouponExpiry", expiry);
      localStorage.setItem("lunevaLeadCaptured", "yes");

      setCoupon(code);

    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Something went wrong. Try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="leadOverlay">
      <div className="leadPopup aggressivePopup">
        <button onClick={() => setShow(false)}>×</button>

        {!coupon ? (
          <>
            <div className="scarcityBadge">
              Launch offer unlocked for selected visitors
            </div>

            <p className="tag">Before You Go</p>
            <h2>Get ₹200 OFF for the next 10 minutes</h2>

            <p>
              Join LUNÉVA Glow Club and unlock instant savings on your first ritual kit.
            </p>

            <input
              placeholder="Your Name"
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
            />

            <input
              placeholder="WhatsApp Number"
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            />

            <input
              placeholder="Email"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
            />

            <select
              value={lead.skinConcern}
              onChange={(e) =>
                setLead({ ...lead, skinConcern: e.target.value })
              }
            >
              <option value="">Select skin concern</option>
              <option>Dullness</option>
              <option>Dryness</option>
              <option>Tan</option>
              <option>Acne marks</option>
              <option>Beginner routine</option>
            </select>

            <button className="leadSubmit" onClick={saveLead}>
              Unlock My ₹200 Code
            </button>

            <small>No spam. Only launch offers + routine tips.</small>
          </>
        ) : (
          <div className="successOffer">
            <h2>Offer Unlocked ✨</h2>

            <p>Your code is active for 10 minutes:</p>

            <div className="couponBox">{coupon}</div>

            <p>It will be automatically applied in cart.</p>

            <button onClick={() => setShow(false)}>
              Shop Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}