export default function Testimonials() {
    return (
        <section className="testimonials">
            <p className="tag">Skin Stories</p>
            <h2>What early users are saying</h2>

            <div className="testimonialGrid">
                <div className="testimonialCard">
                    <div className="storyCircle"></div>
                    <p>“My skin felt smoother and more hydrated.”</p>
                    <strong>Priya · Mumbai ★★★★★</strong>
                </div>

                <div className="testimonialCard highlightStory">
                    <div className="storyCircle"></div>
                    <p>“The ₹1,999 kit feels complete and premium.”</p>
                    <strong>Riya · Pune ★★★★★</strong>
                </div>

                <div className="testimonialCard">
                    <div className="storyCircle"></div>
                    <p>“Lightweight finish, good for Indian weather.”</p>
                    <strong>Ananya · Navi Mumbai ★★★★★</strong>
                </div>
            </div>
        </section>
    );
}