import { useState } from "react";

export default function AdminLogin({ setPage }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const login = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("lunevaAdminToken", data.token);
                setPage("admin");
            } else {
                alert("Wrong email or password");
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Check backend.");
        }
    };

    return (
        <section className="adminLoginPage">
            <div className="adminLoginCard">
                <p className="tag">LUNÉVA Admin</p>
                <h1>Login</h1>

                <input
                    placeholder="Admin Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Admin Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button onClick={login}>Login to Dashboard</button>
            </div>
        </section>
    );
}