import { useEffect, useState } from "react";

export default function CouponStickyBar() {
    const [coupon, setCoupon] = useState(localStorage.getItem("lunevaCoupon"));
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const expiry = Number(localStorage.getItem("lunevaCouponExpiry"));
            const remaining = expiry - Date.now();

            if (coupon && remaining > 0) {
                setTimeLeft(Math.floor(remaining / 1000));
            } else {
                localStorage.removeItem("lunevaCoupon");
                localStorage.removeItem("lunevaCouponExpiry");
                setCoupon(null);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [coupon]);

    if (!coupon) return null;

    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    return (
        <div className="couponStickyBar">
            <span>₹200 OFF unlocked: <b>{coupon}</b></span>
            <strong>Expires in {min}:{sec.toString().padStart(2, "0")}</strong>
        </div>
    );
}