export default function Cart({ cart, setCart, setPage }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const removeItem = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <section className="cartPage">
            <h1>Your LUNÉVA Ritual Bag</h1>

            {cart.length === 0 ? (
                <div className="emptyCart">
                    <h2>Your cart is empty</h2>
                    <p>Add your favourite LUNÉVA ritual kit to continue.</p>
                    <button onClick={() => setPage("home")}>Shop Rituals</button>
                </div>
            ) : (
                <div className="cartLayout">
                    <div className="cartItemsBox">
                        {cart.map((item, index) => (
                            <div className="cartItemCard" key={index}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.subtitle || item.tag || "LUNÉVA Ritual Kit"}</p>
                                </div>

                                <div className="cartPriceBox">
                                    <strong>₹{item.price}</strong>
                                    <button onClick={() => removeItem(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cartSummary">
                        <h2>Order Summary</h2>

                        <div className="summaryRow">
                            <span>Subtotal</span>
                            <strong>₹{total}</strong>
                        </div>

                        <div className="summaryRow">
                            <span>Shipping</span>
                            <strong>Free</strong>
                        </div>

                        <div className="summaryRow">
                            <span>COD</span>
                            <strong>Available</strong>
                        </div>

                        <div className="summaryTotal">
                            <span>Total</span>
                            <strong>₹{total}</strong>
                        </div>

                        <button onClick={() => setPage("checkout")}>
                            Proceed to Checkout
                        </button>

                        <button className="clearCartBtn" onClick={clearCart}>
                            Clear Cart
                        </button>

                        <p className="secureText">
                            ✔ Secure payment · ✔ Fast delivery · ✔ WhatsApp support
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}