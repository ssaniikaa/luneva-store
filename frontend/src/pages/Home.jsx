import { products, bundles } from "../data/products";
import ProductCard from "../components/ProductCard";
import BundleCard from "../components/BundleCard";
import RoutineBuilder from "../components/RoutineBuilder";
import BeforeAfter from "../components/BeforeAfter";
import Testimonials from "../components/Testimonials";

export default function Home({ addToCart }) {
    return (
        <main>
            <section className="trustBar">
                <span>✔ COD Available</span>
                <span>✔ Free Shipping</span>
                <span>✔ Made for Indian Skin</span>
                <span>✔ Secure Payment</span>
            </section>

            <section className="luxuryHero">
                <div>
                    <p className="tag">Radiance Rituals</p>
                    <h1>Glow-ready skincare for Indian skin.</h1>
                    <p>
                        A premium botanical + science-inspired routine designed for sun,
                        pollution, dullness and daily skin stress.
                    </p>

                    <div className="heroActions">
                        <a href="#kits">Shop ₹1,999 Ritual</a>
                        <a href="#quiz" className="outlineBtn">Find My Routine</a>
                    </div>

                    <div className="miniProof">
                        <span>★★★★★ 4.8/5</span>
                        <span>Limited launch kits available</span>
                    </div>
                </div>

                <div className="heroProduct">
                    <div className="glowCircle"></div>

                    {/* Product Image */}
                    <img
                        src="/assets/luneva.png"
                        alt="LUNÉVA Complete Radiance Ritual"
                        className="heroProductImage"
                    />

                    <div className="heroProductContent">
                        <h3>LUNÉVA</h3>
                        <p>Complete Radiance Ritual</p>
                        <strong>Save up to ₹1,595</strong>
                    </div>
                </div>

                <section className="problemSection">
                    <h2>Why your skin feels dull?</h2>
                    <div className="problemGrid">
                        <div>☀️ Sun exposure</div>
                        <div>🌫️ Pollution</div>
                        <div>💧 Dehydration</div>
                        <div>🌙 Weak night routine</div>
                    </div>
                    <h3>LUNÉVA builds a complete AM + PM ritual around these concerns.</h3>
                </section>

                <section className="bundleSection" id="kits">
                    <p className="tag">Limited Ritual Kits</p>
                    <h2>Choose Your Glow Kit</h2>
                    <p className="bundleSub">
                        The ₹1,999 kit is designed as the best balance of glow, hydration,
                        protection and value.
                    </p>

                    <div className="bundleGrid threeKits">
                        {bundles.map((bundle) => (
                            <BundleCard key={bundle.id} bundle={bundle} addToCart={addToCart} />
                        ))}
                    </div>
                </section>

                <section id="quiz">
                    <RoutineBuilder />
                </section>

                <BeforeAfter />

                <section className="products">
                    <h2 className="productHeading">The Ritual Edit</h2>
                    {products.map((item) => (
                        <ProductCard key={item.id} product={item} addToCart={addToCart} />
                    ))}
                </section>

                <section className="reviewsSection">
                    <p className="tag">Customer Love</p>
                    <h2>Why people trust LUNÉVA</h2>

                    <div className="reviewsGrid">
                        <div>
                            <p>“The routine feels premium and lightweight. Perfect for daily use.”</p>
                            <strong>Priya, Mumbai ★★★★★</strong>
                        </div>
                        <div>
                            <p>“Loved the glow finish. It does not feel heavy in Indian weather.”</p>
                            <strong>Riya, Pune ★★★★★</strong>
                        </div>
                        <div>
                            <p>“The ₹1,999 kit feels like a complete routine, not random products.”</p>
                            <strong>Ananya, Navi Mumbai ★★★★★</strong>
                        </div>
                    </div>
                </section>

                <section className="faqSection">
                    <h2>Questions before you buy?</h2>

                    <details>
                        <summary>Is LUNÉVA suitable for Indian skin?</summary>
                        <p>Yes, the routine is positioned for sun, humidity, pollution and dullness concerns common in India.</p>
                    </details>

                    <details>
                        <summary>Which kit should I buy first?</summary>
                        <p>The ₹1,999 Glow Boost Ritual is the best starter full routine.</p>
                    </details>

                    <details>
                        <summary>Is COD available?</summary>
                        <p>Yes, COD can be offered for launch orders.</p>
                    </details>
                </section>

                <section className="finalCTA">
                    <h2>Start your glow ritual today.</h2>
                    <p>Limited launch kits available. Reserve your LUNÉVA kit now.</p>
                    <a href="#kits">Shop ₹1,999 Kit</a>
                </section>
        </main>
    );
}