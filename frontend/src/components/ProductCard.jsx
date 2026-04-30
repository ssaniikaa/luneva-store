import { useState } from "react";

export default function ProductCard({ product, addToCart }) {
    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setOpen(false);
    };

    return (
        <>
            <div className="productCard" onClick={() => setOpen(true)}>
                <div className="rating">★★★★★ <span>4.8</span></div>

                <div className="productImage">
                    <img src={product.image} alt={product.name} />
                </div>

                <h3>{product.name}</h3>
                <p>{product.subtitle}</p>
                <small className="bestFor">Best for: {product.bestFor}</small>
                <h4>₹{product.price}</h4>

                <button onClick={(e) => {
                    e.stopPropagation();
                    handleAdd();
                }}>
                    Add to Ritual →
                </button>

                <p className="viewDetails">Tap to view ingredients</p>
            </div>

            {open && (
                <div className="productModalOverlay" onClick={() => setOpen(false)}>
                    <div className="productModal" onClick={(e) => e.stopPropagation()}>
                        <button className="closeModal" onClick={() => setOpen(false)}>×</button>

                        <div className="modalImage">
                            <img src={product.image} alt={product.name} />
                        </div>

                        <div className="modalContent">
                            <p className="tag">Science-backed Ingredient Version</p>
                            <h2>{product.name}</h2>
                            <h3>{product.subtitle}</h3>

                            <div className="modalBlock">
                                <h4>Ingredients</h4>
                                <p>{product.ingredients}</p>
                            </div>

                            <div className="modalBlock">
                                <h4>How it helps Indian skin</h4>
                                <ul>
                                    {product.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modalActions">
                                <button onClick={handleAdd}>Add to Ritual ₹{product.price}</button>
                                <a
                                    href={`https://wa.me/919136797849?text=${encodeURIComponent(
                                        `Hi LUNÉVA, I want details for ${product.name}.`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Ask on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}