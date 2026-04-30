export default function OrderSuccess({ orderData, setPage }) {
    if (!orderData) {
        return (
            <section className="successPage">
                <div className="successCard">
                    <h1>No order found</h1>
                    <button onClick={() => setPage("home")}>Go Home</button>
                </div>
            </section>
        );
    }

    return (
        <section className="successPage">
            <div className="successCard">
                <div className="successIcon">✓</div>

                <p className="tag">Order Confirmed</p>
                <h1>Thank you for your LUNÉVA order</h1>

                <div className="successDetails">
                    <div>
                        <span>Order ID</span>
                        <strong>{orderData.orderId}</strong>
                    </div>

                    <div>
                        <span>Payment</span>
                        <strong>{orderData.paymentStatus}</strong>
                    </div>

                    <div>
                        <span>Courier</span>
                        <strong>{orderData.courier || "Assigning soon"}</strong>
                    </div>

                    <div>
                        <span>Tracking ID</span>
                        <strong>{orderData.awb || "Pending"}</strong>
                    </div>

                    <div>
                        <span>Total</span>
                        <strong>₹{orderData.total}</strong>
                    </div>
                </div>

                <button onClick={() => setPage("home")}>Continue Shopping</button>
            </div>
        </section>
    );
}