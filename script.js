// TODO: The collection image should be used as Hero Image.
// TODO: console.log(collections[1].image.src) gets you the correct img
// TODO: Find a way to give that src as a src for the background image of the html!

//Initialising the client...
const client = ShopifyBuy.buildClient({
    domain: 'drinkz-development-store.myshopify.com',
    storefrontAccessToken: 'f03245f1af9d31e8b41d045819e8bd40'
});

//Creating the Product Card elements
let productTitle = document.querySelector(".title");
let productDescription = document.querySelector(".description");
let productImage = document.querySelector(".image");

// Fetch all collections, including their products
client.collection.fetchAllWithProducts().then((collections) => {

    console.log(collections[1].image.src);

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

// Creating Checkout
client.checkout.create().then((checkout) => {
    console.log(checkout);
    console.log(checkout.subtotalPrice);
    console.log(checkout.webUrl);
    console.log(checkout.id);
    //Creating public variables, to be used outside the function TODO: Check if this is safe!
    currentCheckout = checkout;
    currentCheckoutId = checkout.id;
    lineItemsToAdd = [
        {
            variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MTU3MzAxNjU2Nzk3MA==', //TODO: make this dynamic...
            quantity: 1      
        }
    ];
    lineItemIdsToRemove = [
        'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzQxNTczMDE2NTY3OTcwMD9jaGVja291dD00Y2Q3OTkwNjA5M2Q3Njc3ZDZmZWViOWExY2E0YjhkMA=='
    ];
});

//add to cart
document.querySelector('.add-to-cart').onclick = function addToCart() {
    console.log('Checkout id in scope= ' + currentCheckoutId);
    // Add an item to the checkout
    client.checkout.addLineItems(currentCheckoutId, lineItemsToAdd).then((checkout) => {
    // Do something with the updated checkout
    console.log(checkout.lineItems); // Array with one additional line item
    console.log(checkout.lineItems[0].id);
    document.querySelector('.cart-total').innerHTML = checkout.subtotalPrice;
    })
}

//remove from cart
 document.querySelector('.remove-from-cart').onclick = function removeFromCart() {
    client.checkout.removeLineItems(currentCheckoutId, lineItemIdsToRemove).then((checkout) => {
    //console.log(checkout.lineItems);
    document.querySelector('.cart-total').innerHTML = checkout.subtotalPrice;
    });
}

//create checkout url
document.querySelector('.checkout').onclick = function getCheckout() {
    //console.log(currentCheckout.webUrl);
    location.href = currentCheckout.webUrl;
}