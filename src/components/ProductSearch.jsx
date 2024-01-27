import React from 'react'

const ProductSearch = () => {
    const products = [
        { id:2, name: "Product 1", imageURL: "Feature 1", productURL: "/images/dummy.jpg"},
        { id:2, name: "Paneer Bhurji", imageURL: "Feature 1", productURL: "/images/dummy.jpg"},
        { id:2, name: "LG TV", imageURL: "Feature 1", productURL: "/images/dummy.jpg"},
        { id:2, name: "Chrome Book", imageURL: "Feature 1", productURL: "/images/dummy.jpg"},
        { id:2, name: "Coffee", imageURL: "Feature 1", productURL: "/images/dummy.jpg"},
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