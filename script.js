//Initialising the client...
const client = ShopifyBuy.buildClient({
    domain: 'drinkz-development-store.myshopify.com',
    storefrontAccessToken: 'f03245f1af9d31e8b41d045819e8bd40'
});

//Creating the Product Card variables...
let productTitle = document.querySelector(".title");
let productDescription = document.querySelector(".description");
let productImage = document.querySelector(".image");

// Fetch all collections, including their products
client.collection.fetchAllWithProducts().then((collections) => {
    //log all products in the specific collection...
    collections[1].products.forEach(element => {

        let titles = element.title;
        let descriptions = element.description;
        let images = element.images[0].src;

        console.log(element)
        console.log(element.title);
        console.log(element.description);
        console.log(element.images[0].src); //TODO: write a catch if there is no image. now errors..
        
        //sending the values to the DOM...
        productImage.src = images;
        productTitle.innerHTML = titles;
        productDescription.innerHTML = descriptions;

    });
});

// Create an empty checkout
client.checkout.create().then((checkout) => {
    // Do something with the checkout

    console.log(checkout);
    console.log(checkout.subtotalPrice);
    console.log(checkout.webUrl);
    console.log(checkout.id);

    //when add to cart is clicked...
    document.querySelector('.add-to-cart').onclick = function addToCart() {
        //add to cart code...
        const checkoutId = checkout.id; // ID of an existing checkout
        const lineItemsToAdd = [
            {
                variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MTU4NDI5NTU3NTcxNA==',
                quantity: 1      
            }
        ];
        
        // Add an item to the checkout
        client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
        // Do something with the updated checkout
        console.log(checkout.lineItems); // Array with one additional line item
        })
    }

});
