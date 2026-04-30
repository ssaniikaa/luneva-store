export default function Navbar({ setPage, cartCount }) {
    return (
        <nav className="navbar">
            <div className="logo">LUNÉVA</div>

            <div className="navLinks">
                <button onClick={() => setPage("home")}>Shop</button>
                <button onClick={() => setPage("cart")}>Cart ({cartCount})</button>
                <button onClick={() => setPage("admin-login")}>Admin</button>
            </div>

        </nav>
    );
}