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
            const orderRes = await fetch("http://localhost:5000/api/create-razorpay-order", {
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
                    await fetch("http://localhost:5000/api/place-order", {
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

                    alert(
                        getsPRBox
                            ? "Payment successful! Your order includes the FREE Signature PR Box ✨"
                            : "Payment successful! Your LUNÉVA order is placed ✨"
                    );
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
            await fetch("http://localhost:5000/api/place-order", {
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
        } catch (error) {
            console.error(error);
        }

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
    };

    return (
        <section className="checkoutPage premiumCheckout">
            <div className="checkoutHeader">
                <p className="tag">Secure Checkout</p>
                <h1>Complete Your LUNÉVA Ritual</h1>
                <p>
                    Add glow boosters and unlock the Signature Premium PR Box on orders
                    above ₹3,999.
                </p>
            </div>

            <div className="checkoutLayout">
                <div className="checkoutLeft">
                    <div className="checkoutCard">
                        <h2>Delivery Details</h2>

                        <div className="checkoutForm">
                            <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} />
                            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                            <input name="phone" placeholder="Phone Number *" value={form.phone} onChange={handleChange} />
                            <input name="address" placeholder="Full Address *" value={form.address} onChange={handleChange} />
                            <input name="city" placeholder="City *" value={form.city} onChange={handleChange} />
                            <input name="state" placeholder="State *" value={form.state} onChange={handleChange} />
                            <input name="pincode" placeholder="Pincode *" value={form.pincode} onChange={handleChange} />

                            <select name="paymentMode" value={form.paymentMode} onChange={handleChange}>
                                <option value="Prepaid">Prepaid - Razorpay</option>
                                <option value="COD">Cash on Delivery</option>
                            </select>
                        </div>
                    </div>

                    <div className="checkoutCard">
                        <h2>Add Glow Boosters</h2>
                        <p className="addonSub">
                            Customers who add boosters usually complete a better routine.
                        </p>

                        <div className="addonGrid">
                            {addons.map((addon) => {
                                const selected = selectedAddons.find((item) => item.id === addon.id);

                                return (
                                    <div
                                        className={`addonCard ${selected ? "addonSelected" : ""}`}
                                        key={addon.id}
                                        onClick={() => toggleAddon(addon)}
                                    >
                                        <div>
                                            <h3>{addon.name}</h3>
                                            <p>Perfect add-on for your LUNÉVA ritual.</p>
                                        </div>

                                        <strong>₹{addon.price}</strong>
                                        <button type="button">{selected ? "Added" : "Add"}</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="checkoutRight">
                    <div className="prBoxCard">
                        <span>Signature Reward</span>
                        <h2>Premium PR Box</h2>
                        <p>
                            Get LUNÉVA’s signature-style premium PR box free on orders of
                            ₹3,999 and above.
                        </p>

                        {getsPRBox ? (
                            <strong className="unlocked">Unlocked 🎁</strong>
                        ) : (
                            <strong className="locked">Add ₹{amountNeeded} more to unlock</strong>
                        )}

                        <div className="progressTrack">
                            <div style={{ width: `${Math.min((total / 3999) * 100, 100)}%` }}></div>
                        </div>

                        {!getsPRBox && (
                            <>
                                <p className="almostText">
                                    Almost there… most customers add 1 item to unlock this 🎁
                                </p>

                                <button className="unlockBtn" onClick={addSerumToUnlock}>
                                    Add Serum & Unlock PR Box
                                </button>
                            </>
                        )}
                    </div>

                    <div className="orderSummaryBox">
                        <h2>Order Summary</h2>

                        <div className="summaryMini">
                            <span>Products</span>
                            <strong>₹{cartTotal}</strong>
                        </div>

                        <div className="summaryMini">
                            <span>Add-ons</span>
                            <strong>₹{addonTotal}</strong>
                        </div>

                        {couponActive && (
                            <div className="summaryMini giftLine">
                                <span>Launch Offer ({coupon})</span>
                                <strong>-₹{discount}</strong>
                            </div>
                        )}

                        <div className="summaryMini">
                            <span>Shipping</span>
                            <strong>Free</strong>
                        </div>

                        {getsPRBox && (
                            <div className="summaryMini giftLine">
                                <span>Signature PR Box</span>
                                <strong>FREE</strong>
                            </div>
                        )}

                        <div className="checkoutTotal">
                            <span>Total</span>
                            <strong>₹{total}</strong>
                        </div>

                        {form.paymentMode === "Prepaid" ? (
                            <button onClick={payNow}>Pay Securely with Razorpay</button>
                        ) : (
                            <button onClick={whatsappOrder}>Confirm COD on WhatsApp</button>
                        )}

                        <button className="whatsappCheckout" onClick={whatsappOrder}>
                            Order on WhatsApp
                        </button>

                        <p className="checkoutTrust">
                            ✔ Secure payment · ✔ COD available · ✔ Fast delivery · ✔ WhatsApp support
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}