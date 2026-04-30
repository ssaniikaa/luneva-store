export const products = [
    {
        id: 1,
        name: "LUNÉVA Clarité Cleanser",
        subtitle: "Brightening Face Wash",
        price: 599,
        image: "/products/cleanser.png",
        ingredients:
            "Aqua (Water), Aloe Barbadensis Leaf Extract, Curcuma Longa (Turmeric) Extract, Crocus Sativus (Saffron) Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Azadirachta Indica (Neem) Extract, Ocimum Sanctum (Tulsi) Extract, Rosa Damascena Flower Water, Coco Glucoside, Glycerin, Tocopheryl Acetate (Vitamin E)",
        benefits: [
            "Helps cleanse dust, sweat and pollution buildup.",
            "Turmeric, saffron and licorice support a brighter-looking glow.",
            "Aloe vera and glycerin help maintain hydration.",
            "Neem and tulsi support fresh, balanced skin."
        ],
        bestFor: "Dullness, pollution-exposed skin, daily cleansing"
    },
    {
        id: 2,
        name: "LUNÉVA Éclat Elixir",
        subtitle: "Rice Radiance Serum",
        price: 899,
        image: "/products/serum.png",
        ingredients:
            "Aqua (Water), Oryza Sativa (Rice) Extract, Aloe Barbadensis Leaf Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Camellia Sinensis (Green Tea) Extract, Sodium Hyaluronate (Hyaluronic Acid), Glycerin, Tocopheryl Acetate (Vitamin E)",
        benefits: [
            "Rice extract supports soft, radiant-looking skin.",
            "Licorice and green tea help with dullness and environmental stress.",
            "Hyaluronic acid and glycerin help improve hydration.",
            "Vitamin E supports skin comfort and glow."
        ],
        bestFor: "Glow, hydration, uneven-looking tone"
    },
    {
        id: 3,
        name: "LUNÉVA Sunveil Shield",
        subtitle: "SPF 50 Sunscreen",
        price: 799,
        image: "/products/sunscreen.png",
        ingredients:
            "Aqua (Water), Zinc Oxide, Aloe Barbadensis Leaf Extract, Daucus Carota Sativa (Carrot Seed) Oil, Rubus Idaeus (Raspberry) Seed Oil, Butyrospermum Parkii (Shea Butter), Cocos Nucifera (Coconut) Oil, Prunus Amygdalus Dulcis (Almond) Oil, Glycerin",
        benefits: [
            "Zinc oxide helps provide sun protection support.",
            "Aloe vera and glycerin help reduce dryness.",
            "Shea butter, coconut and almond oil support nourishment.",
            "Good for Indian sun exposure and daily outdoor routine."
        ],
        bestFor: "Sun exposure, outdoor use, daily protection"
    },
    {
        id: 4,
        name: "LUNÉVA Aqua Réveil Gel",
        subtitle: "Hydrating Night Gel",
        price: 699,
        image: "/products/nightgel.png",
        ingredients:
            "Aqua (Water), Aloe Barbadensis Leaf Juice, Cucumis Sativus (Cucumber) Extract, Camellia Sinensis (Green Tea) Extract, Chamomilla Recutita (Chamomile) Extract, Lavandula Angustifolia (Lavender) Oil, Glycerin, Sodium Hyaluronate (Hyaluronic Acid), Tocopheryl Acetate (Vitamin E)",
        benefits: [
            "Aloe vera, cucumber and hyaluronic acid support hydration.",
            "Green tea and chamomile help calm tired-looking skin.",
            "Lightweight gel texture suits humid Indian weather.",
            "Best for night-time skin comfort."
        ],
        bestFor: "Dehydrated, tired, heat-exposed skin"
    },
    {
        id: 5,
        name: "LUNÉVA Nocturne Repair Cream",
        subtitle: "Night Cream",
        price: 849,
        image: "/products/nightcream.png",
        ingredients:
            "Aqua (Water), Aloe Barbadensis Leaf Extract, Butyrospermum Parkii (Shea Butter), Prunus Amygdalus Dulcis (Almond) Oil, Simmondsia Chinensis (Jojoba) Oil, Rosa Canina (Rosehip) Oil, Hippophae Rhamnoides (Sea Buckthorn) Extract, Niacinamide, Kojic Dipalmitate, Santalum Album (Sandalwood) Extract, Crocus Sativus (Saffron) Extract, Tocopheryl Acetate (Vitamin E)",
        benefits: [
            "Niacinamide supports an even-looking glow.",
            "Rosehip and sea buckthorn support skin nourishment.",
            "Shea butter, almond and jojoba oils help lock moisture.",
            "Saffron and sandalwood support a premium night-care ritual."
        ],
        bestFor: "Night repair, glow, nourishment"
    }
];

export const bundles = [
    {
        id: "kit-999",
        name: "Glow Starter Kit",
        tag: "Starter",
        price: 999,
        mrp: 1498,
        stock: 18,
        highlight: false,
        products: ["Clarité Cleanser", "Rice Radiance Serum"],
        benefit: "Perfect beginner routine for daily cleansing and glow."
    },
    {
        id: "kit-1999",
        name: "Glow Boost Ritual",
        tag: "Most Popular 🔥",
        price: 1999,
        mrp: 2947,
        stock: 9,
        highlight: true,
        products: ["Face Wash", "Rice Serum", "Night Gel", "SPF 50"],
        benefit: "Complete glow ritual for Indian sun, pollution and dullness."
    },
    {
        id: "kit-2999",
        name: "Complete Radiance Ritual",
        tag: "Best Value 💎",
        price: 2999,
        mrp: 3845,
        stock: 6,
        highlight: false,
        products: ["All 5 LUNÉVA products"],
        benefit: "Complete AM + PM skincare ritual with maximum savings."
    }
];