import { useEffect, useState } from "react";

export default function Admin({ setPage }) {
    const API_URL = import.meta.env.VITE_API_URL || "http://import.meta.env.VITE_API_URL";

    const [stats, setStats] = useState(null);
    const [tab, setTab] = useState("orders");

    const token = localStorage.getItem("lunevaAdminToken");

    const loadData = async () => {
        const res = await fetch(`${API_URL}/api/admin/stats`);
        const data = await res.json();
        setStats(data);
    };

    useEffect(() => {
        if (!token) {
            setPage("admin-login");
            return;
        }

        loadData();
    }, []);

    const logout = () => {
        localStorage.removeItem("lunevaAdminToken");
        setPage("admin-login");
    };

    const updateStatus = async (id, shipmentStatus) => {
        await fetch(`${API_URL}/api/admin/orders/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ shipmentStatus })
        });

        loadData();
    };

    const deleteOrder = async (id) => {
        if (!confirm("Delete this order?")) return;

        await fetch(`${API_URL}/api/admin/orders/${id}`, {
            method: "DELETE"
        });

        loadData();
    };

    const deleteLead = async (id) => {
        if (!confirm("Delete this lead?")) return;

        await fetch(`${API_URL}/api/admin/leads/${id}`, {
            method: "DELETE"
        });

        loadData();
    };

    const exportLeads = () => {
        const rows = [
            ["Name", "Phone", "Email", "Concern", "Coupon"],
            ...stats.leads.map((lead) => [
                lead.name || "",
                lead.phone || "",
                lead.email || "",
                lead.skinConcern || "",
                lead.coupon || ""
            ])
        ];

        const csv = rows.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "luneva-leads.csv";
        a.click();
    };

    if (!stats) {
        return (
            <section className="adminPage">
                <h1>Loading Admin Dashboard...</h1>
            </section>
        );
    }

    return (
        <section className="adminPage">
            <div className="adminTop">
                <div>
                    <p className="tag">LUNÉVA Control Room</p>
                    <h1>Admin Dashboard</h1>
                </div>

                <button onClick={logout}>Logout</button>
            </div>

            <div className="adminStats">
                <div>
                    <span>Total Sales</span>
                    <strong>₹{stats.totalSales}</strong>
                </div>

                <div>
                    <span>Total Orders</span>
                    <strong>{stats.totalOrders}</strong>
                </div>

                <div>
                    <span>Paid Orders</span>
                    <strong>{stats.paidOrders}</strong>
                </div>

                <div>
                    <span>COD Orders</span>
                    <strong>{stats.codOrders}</strong>
                </div>

                <div>
                    <span>Shipped</span>
                    <strong>{stats.shippedOrders}</strong>
                </div>

                <div>
                    <span>Leads</span>
                    <strong>{stats.totalLeads}</strong>
                </div>
            </div>

            <div className="adminTabs">
                <button
                    className={tab === "orders" ? "activeAdminTab" : ""}
                    onClick={() => setTab("orders")}
                >
                    Orders
                </button>

                <button
                    className={tab === "leads" ? "activeAdminTab" : ""}
                    onClick={() => setTab("leads")}
                >
                    Leads
                </button>

                <button onClick={exportLeads}>Export Leads CSV</button>
            </div>

            {tab === "orders" && (
                <div className="adminTable">
                    <h2>Orders</h2>

                    {stats.orders.length === 0 ? (
                        <p>No orders yet.</p>
                    ) : (
                        stats.orders.map((order) => (
                            <div className="adminOrderCard" key={order._id}>
                                <div>
                                    <span>Order ID</span>
                                    <strong>{order.orderId}</strong>
                                </div>

                                <div>
                                    <span>Customer</span>
                                    <strong>{order.customer?.name}</strong>
                                    <small>{order.customer?.phone}</small>
                                </div>

                                <div>
                                    <span>Total</span>
                                    <strong>₹{order.total}</strong>
                                </div>

                                <div>
                                    <span>Payment</span>
                                    <strong>{order.paymentStatus}</strong>
                                    <small>{order.paymentMode}</small>
                                </div>

                                <div>
                                    <span>Shipment</span>
                                    <strong>{order.shipmentStatus || "Pending"}</strong>
                                    <small>{order.awb || "AWB Pending"}</small>
                                </div>

                                <div>
                                    <span>Courier</span>
                                    <strong>{order.courier || "Pending"}</strong>
                                </div>

                                <div className="adminControl">
                                    <select
                                        value={order.shipmentStatus || "ORDER_CREATED"}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                    >
                                        <option value="ORDER_CREATED">Order Created</option>
                                        <option value="PACKED">Packed</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>

                                <div className="adminActions">
                                    {order.awb && (
                                        <a
                                            href={`https://shiprocket.co/tracking/${order.awb}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Track
                                        </a>
                                    )}

                                    <a
                                        href={`https://wa.me/91${order.customer?.phone}?text=${encodeURIComponent(
                                            `Hi ${order.customer?.name || ""} ✨

Your LUNÉVA order is confirmed.

Order ID: ${order.orderId}
Payment: ${order.paymentStatus}
Tracking ID: ${order.awb || "Will be shared soon"}

Thank you for choosing LUNÉVA.`
                                        )}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        WhatsApp
                                    </a>

                                    <button onClick={() => deleteOrder(order._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {tab === "leads" && (
                <div className="adminTable">
                    <h2>Leads</h2>

                    {stats.leads.length === 0 ? (
                        <p>No leads yet.</p>
                    ) : (
                        stats.leads.map((lead) => (
                            <div className="adminLeadCard" key={lead._id}>
                                <div>
                                    <span>Name</span>
                                    <strong>{lead.name || "No name"}</strong>
                                </div>

                                <div>
                                    <span>Phone</span>
                                    <strong>{lead.phone || "No phone"}</strong>
                                </div>

                                <div>
                                    <span>Email</span>
                                    <strong>{lead.email || "No email"}</strong>
                                </div>

                                <div>
                                    <span>Concern</span>
                                    <strong>{lead.skinConcern || "Not selected"}</strong>
                                </div>

                                <div>
                                    <span>Coupon</span>
                                    <strong>{lead.coupon || "LUNEVA200"}</strong>
                                </div>

                                <div className="adminActions">
                                    {lead.phone && (
                                        <a
                                            href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(
                                                `Hi ${lead.name || ""} ✨

This is LUNÉVA.

Your ₹200 OFF coupon LUNEVA200 is active.

Based on your concern ${lead.skinConcern || ""}, I recommend our Glow Boost Ritual ₹1,999.

Would you like me to reserve one kit for you?`
                                            )}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Follow Up
                                        </a>
                                    )}

                                    <button onClick={() => deleteLead(lead._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </section>
    );
}