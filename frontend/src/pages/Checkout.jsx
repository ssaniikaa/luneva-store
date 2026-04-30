import { useState } from "react";

const addons = [
    {
        id: "mini-cleanser",
        name: "Mini Clarité Cleanser",
        price: 299
    },
    {
        id: "glow-serum-mini",
        name: "Mini Rice Glow Serum",
        price: 499
    },
    {
        id: "premium-pouch",
        name: "LUNÉVA Travel Pouch",
        price: 399
    }
];

export default function Checkout({ cart }) {
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMode: "Prepaid"
    });

    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
    const addonTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);

    const coupon = localStorage.getItem("lunevaCoupon");
    const expiry = Number(localStorage.getItem("lunevaCouponExpiry"));
    const couponActive = coupon && expiry > Date.now();

    const discount = couponActive ? 200 : 0;
    const total = Math.max(cartTotal + addonTotal - discount, 0);

    const getsPRBox = total >= 3999;
    const amountNeeded = Math.max(3999 - total, 0);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const toggleAddon = (addon) => {
        const exists = selectedAddons.find((item) => item.id === addon.id);

        if (exists) {
            setSelectedAddons(selectedAddons.filter((item) => item.id !== addon.id));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
        }
    };

    const addSerumToUnlock = () => {
        const serumAddon = addons.find((item) => item.id === "glow-serum-mini");
        const alreadyAdded = selectedAddons.find((item) => item.id === serumAddon.id);

        if (!alreadyAdded) {
            setSelectedAddons([...selectedAddons, serumAddon]);
        }
    };

    const validateForm = () => {
        if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
            alert("Please fill all required delivery details.");
            return false;
        }

        return true;
    };

    const payNow = async () => {
        if (!validateForm()) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const orderRes = await fetch(`${API_URL}/api/orders/create-razorpay-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: total })
            });

            const order = await orderRes.json();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "LUNÉVA",
                description: "LUNÉVA Skincare Order",
                order_id: order.id,

                handler: async function (response) {
                    await fetch(`${API_URL}/api/orders/place-order`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            customer: form,
                            products: cart,
                            addons: selectedAddons,
                            total,
                            paymentMode: "Prepaid",
                            razorpayPayment: response,
                            freePRBox: getsPRBox,
                            coupon: couponActive ? coupon : null,
                            discount
                        })
                    });

                    alert("Payment successful! ✨");
                },

                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone
                },

                theme: {
                    color: "#8b5e3c"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            alert("Something went wrong while processing payment.");
            console.error(error);
        }
    };

    const whatsappOrder = async () => {
        if (!validateForm()) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            await fetch(`${API_URL}/api/orders/place-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customer: form,
                    products: cart,
                    addons: selectedAddons,
                    total,
                    paymentMode: "COD",
                    freePRBox: getsPRBox,
                    coupon: couponActive ? coupon : null,
                    discount
                })
            });

            const orderItems = cart.map((item) => item.name).join(", ");
            const addonItems = selectedAddons.map((item) => item.name).join(", ");

            const message = encodeURIComponent(
                `Hi LUNÉVA ✨

I want to place this order:

Products:
${orderItems || "No products selected"}

Add-ons:
${addonItems || "No add-ons"}

Coupon:
${couponActive ? `${coupon} - ₹${discount} OFF` : "No coupon"}

Total: ₹${total}

${getsPRBox ? "I am eligible for the FREE Signature Premium PR Box 🎁" : `Add ₹${amountNeeded} more to unlock FREE Signature PR Box.`}

Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}

Please confirm my order.`
            );

            window.open(`https://wa.me/919136797849?text=${message}`, "_blank");

        } catch (error) {
            console.error(error);
            alert("Failed to place COD order");
        }
    };
}