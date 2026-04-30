export default function FloatingWhatsApp() {
    const message = encodeURIComponent(
        "Hi LUNÉVA ✨ I want to know which skincare kit is best for my skin."
    );

    return (
        <a
            className="floatingWhatsapp"
            href={`https://wa.me/919136797849?text=${message}`}
            target="_blank"
            rel="noreferrer"
        >
            WhatsApp
        </a>
    );
}