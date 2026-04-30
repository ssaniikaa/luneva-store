import { useEffect, useState } from "react";

export default function BundleCard({ bundle, addToCart }) {
    const [open, setOpen] = useState(false);
    const [stock, setStock] = useState(bundle.stock || 10);
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    const items = bundle.products || [];
    const savings = bundle.mrp - bundle.price;
    const savingsPercent = Math.round((savings / bundle.mrp) * 100);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 15 * 60));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const stockTimer = setInterval(() => {
            setStock((prev) => (prev > 3 ? prev - 1 : prev));
        }, 30000);

        return () => clearInterval(stockTimer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const message = encodeURIComponent(
        `Hi LUNÉVA ✨

I want to order:
👉 ${bundle.name}

Price: ₹${bundle.price}
Saving: ₹${savings} (${savingsPercent}% OFF)

Please confirm availability and delivery.`
    );

    const whatsappLink = `https://wa.me/919136797849?text=${message}`;

    const handleAdd = () => {
        addToCart(bundle);
        setOpen(false);
    };

    return (
        <>
            <div
                className={`bundleCard ${bundle.highlight ? "premiumBundle" : ""}`}
                onClick={() => setOpen(true)}
            >
                <div className="bundleBadge">{bundle.tag}</div>

                {bundle.highlight && <div className="liveBadge">Limited Stock</div>}

                <h3>{bundle.name}</h3>
                <p>{bundle.benefit}</p>

                <div className="bundleItems">
                    {items.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>

                <div className="bundlePrice">
                    <del>₹{bundle.mrp}</del>
                    <strong>₹{bundle.price}</strong>
                </div>

                <p className="saveLine">
                    You save ₹{savings} ({savingsPercent}% OFF)
                </p>

                <p className="stockLine">Only {stock} kits left today</p>

                <div className="countdownBox">
                    Offer ends in {minutes}:{seconds.toString().padStart(2, "0")}
                </div>

                {bundle.highlight && (
                    <div className="urgencyBar">
                        <div></div>
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAdd();
                    }}
                >
                    Add Kit to Cart
                </button>

                <a
                    className="whatsappBtn"
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    Order on WhatsApp
                </a>

                <p className="viewDetails">Tap to see full kit details</p>
            </div>

            {open && (
                <div className="productModalOverlay" onClick={() => setOpen(false)}>
                    <div className="bundleModal" onClick={(e) => e.stopPropagation()}>
                        <button className="closeModal" onClick={() => setOpen(false)}>×</button>

                        <p className="tag">Limited Launch Kit</p>
                        <h2>{bundle.name}</h2>
                        <p>{bundle.benefit}</p>

                        <div className="bundleModalPrice">
                            <del>₹{bundle.mrp}</del>
                            <strong>₹{bundle.price}</strong>
                            <span>Save ₹{savings}</span>
                        </div>

                        <div className="kitInside">
                            <h3>What’s inside this kit?</h3>
                            {items.map((item, index) => (
                                <div className="kitItem" key={index}>
                                    <span>{index + 1}</span>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="kitWhy">
                            <h3>Why this kit converts better</h3>
                            <ul>
                                <li>Complete routine instead of confusing single products.</li>
                                <li>Better value with clear savings.</li>
                                <li>Designed for Indian skin exposed to sun, dust and humidity.</li>
                                <li>Perfect for first-time LUNÉVA customers.</li>
                            </ul>
                        </div>

                        <div className="modalActions">
                            <button onClick={handleAdd}>Add Kit ₹{bundle.price}</button>
                            <a href={whatsappLink} target="_blank" rel="noreferrer">
                                Reserve on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}