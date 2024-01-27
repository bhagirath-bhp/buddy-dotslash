import axios from "axios";
import { useEffect, useState } from "react";

const ProductSearch = ({ }) => {
    const DB_URI = "https://ultimatecc-strapi.onrender.com/api";
    const bearer = "5a2c40b8f8edf75a9877089261a42e0c16a257a3d18ace5af3297a4affd6ade0402a647251e8a08aba1bcb43d87484c0778fc96b9250fb03e9ad27f24f05d67a743f1fa1ea6148a57accf52e1542ef8a8ee93b9b203a57beb2ce0230490a3ce25f8bd1ea652c622e3cf390959cb818643ba2385eb53b52e99e45ecf25895ef2f"
    const products = [
        {name: "SonicWave 2000"}
    ];
    const paragraph = "The SonicWave 2000 is an over-ear wireless headphone model from AudioPro Company. It features active noise cancellation for a more immersive listening experience. The headphone delivers crystal-clear audio quality with deep bass and crisp highs. It has a long battery life of up to 30 hours on a single charge. The headband is adjustable, and the ear cushions are made of memory foam for added comfort. The SonicWave 2000 also has a built-in microphone for hands-free calls. The price of the SonicWave 2000 is 11151 rupees, and it currently has a discount of 10%.";



    const extractProductNames = (paragraph, products) => {
        const productNames = products.map(product => product.name);
        const regex = new RegExp('\\b(' + productNames.join('|') + ')\\b', 'gi');
        const matches = new Set(paragraph.match(regex));

        if (matches) {
            return matches;
        } else {
            return [];
        }
    };

    const matchedProductNames = extractProductNames(paragraph, products);
    return (
        <div>
            <p>
                {}
            </p>
        </div>
    )
}

export default ProductSearch