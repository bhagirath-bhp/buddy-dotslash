export const extractProductNames = (paragraph, products) => {
    const productNames = products.map(product => product.name);
    const regex = new RegExp('\\b(' + productNames.join('|') + ')\\b', 'gi');
    const matches = new Set(paragraph.match(regex));

    if (matches) {
        return matches;
    } else {
        return "no match found";
    }
};