const products =  [
    {
        id: 'redshoe',
        description: 'Red Shoe',
        price: 42.12,
        reviews: []
    },
    {
        id: 'bluejean',
        description: 'Blue Jean',
        price: 53.12,
        reviews: []
    }
]


function getAllProducts() {
    return products
}
function getProductsByPrice(min, max) {
return products.filter((product) => {
    return product.price >= min && product.price <= max
})
}
function getProductById(id) {
    return products.find((product) => {
        return product.id === id
    })
}
function createNewProducts(id, description, price) {
    const newProduct = {
        id,
        description,
        price,
        reviews: []
    }

    products.push(newProduct)
    return newProduct

}

function createNewReview(id, rating, comment) {
    const matchedProduct = getProductById(id)
    if (matchedProduct) {
        const newReview = {
            rating,
            comment
        }
    matchedProduct.reviews.push(newReview)

    return newReview
    }
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    getProductById,
    createNewProducts,
    createNewReview
}