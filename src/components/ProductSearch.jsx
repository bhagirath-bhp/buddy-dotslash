import React from 'react'

const ProductSearch = () => {
    const products = [
        { name: "Product 1", features: "Feature 1" },
        { name: "Product 2", features: "Feature 2" },
        { name: "dotslash", features: "hackathon" },
        { name: "paneeer bhurji", features: "sabji" },
    ];

    const paragraph = "I am interested in Product 1 and Product 3. Can you provide more information? tip: I like paneeer bhurji";

    const extractProductNames = (paragraph, products) => {
        const productNames = products.map(product => product.name);
        const regex = new RegExp('\\b(' + productNames.join('|') + ')\\b', 'gi');
        const matches = paragraph.match(regex);
        console.log(matches)

        if (matches) {
            return matches;
        } else {
            return [];
        }
    };

    const matchedProductNames = extractProductNames(paragraph, products);
    console.log(matchedProductNames);
    return (
        <div>
            <p>
                {matchedProductNames}
            </p>
        </div>
    )
}

export default ProductSearch