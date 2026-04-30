import { useState } from "react";

export default function RoutineBuilder() {
    const [skin, setSkin] = useState("");
    const [result, setResult] = useState("");

    const buildRoutine = () => {
        if (skin === "dull") setResult("Glow Boost Ritual ₹1,999 is best for dullness, tanning and daily pollution.");
        if (skin === "dry") setResult("Complete Radiance Ritual ₹2,999 is best for hydration + AM/PM care.");
        if (skin === "beginner") setResult("Glow Starter Kit ₹999 is best for first-time skincare users.");
        if (skin === "night") setResult("PM Recovery Ritual is best for night repair and tired skin.");
    };

    return (
        <section className="routineBuilder">
            <p className="tag">AI-Style Routine Finder</p>
            <h2>Which LUNÉVA Kit Is Right For You?</h2>

            <div className="routineOptions">
                <button onClick={() => setSkin("dull")}>Dull / Tanned Skin</button>
                <button onClick={() => setSkin("dry")}>Dry / Dehydrated</button>
                <button onClick={() => setSkin("beginner")}>Beginner Routine</button>
                <button onClick={() => setSkin("night")}>Night Repair</button>
            </div>

            <button className="routineMainBtn" onClick={buildRoutine}>
                Find My Ritual
            </button>

            {result && <div className="routineResult">{result}</div>}
        </section>
    );
}