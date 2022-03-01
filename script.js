//Initialising the client...
const client = ShopifyBuy.buildClient({
    domain: 'drinkz123.myshopify.com',
    storefrontAccessToken: '367c90263dad51dcd09f790472d20442'
    //dev domain: environment: domain: 'drinkz-development-store.myshopify.com',
    //dev token: storefrontAccessToken: 'f03245f1af9d31e8b41d045819e8bd40'
});

// Creating Checkout
client.checkout.create().then((checkout) => {
    currentCheckout = checkout;
    currentCheckoutId = checkout.id;
  });

client.collection.fetchByHandle('buuz-storefront').then((collections) => {
    console.log(collections);

        //setting the collection image as background image...
        document.querySelector('html').style.backgroundImage = 'url('+collections.image.src+')';
        //creating the grid container...
        const gridContainer = document.querySelector('.grid-container');
    
        console.log(collections);
        
        collections.products.forEach(element => {
            //console.log(element);

            //set these to the DOM...
            let gridItem = document.createElement('div');
            let productImage = document.createElement('img');
            let productTitle = document.createElement('h3');
            let productDescription = document.createElement('p');
            let addToCartBtn = document.createElement('button');
            let removeFromCartBtn = document.createElement('button');
            let lineItemId = element.variants[0].id;
    
            //create the css grid in the DOM...
            gridContainer.appendChild(gridItem).className = "grid-item";
            gridItem.appendChild(productImage).className = "grid-image";
            gridItem.appendChild(productTitle).className = "grid-title";
            gridItem.appendChild(productDescription).className = "grid-description";
            gridItem.appendChild(addToCartBtn).className = "grid-addToCart";
            gridItem.appendChild(removeFromCartBtn).className = "grid-removeFromCart";
    
            //send the variables to the DOM...
            productTitle.innerHTML = element.title;
            productDescription.innerHTML = element.description;
            productImage.src = element.images[0].src;
            addToCartBtn.innerHTML = "+ Voeg toe";
            removeFromCartBtn.innerHTML = "- Verwijder";
    
            //add to cart
            addToCartBtn.onclick = function() {
                //setting the clicked product as lineitem...
                lineItemsToAdd = [
                    {
                        variantId: lineItemId,
                        quantity: 1
                    }
                ]
                //adding the lineitem to the cart...
                client.checkout.addLineItems(currentCheckoutId, lineItemsToAdd).then((checkout) => {
                    document.querySelector('.cart-total').innerHTML = "€" + checkout.subtotalPrice;
                })
            }
    
            //remove from cart
            removeFromCartBtn.onclick = function() {
                //fetching the current checkout
                // FIXME: See why this throws an error on the first click!
                client.checkout.fetch(currentCheckoutId).then((checkout) => {
                    console.log(checkout.lineItems[0].id);
                    lineItemsToRemove = checkout.lineItems[0].id;
                });
    
                lineItemIdsToRemove = [
                    lineItemsToRemove
                ]
                client.checkout.removeLineItems(currentCheckoutId, lineItemIdsToRemove).then((checkout) => {
                    document.querySelector('.cart-total').innerHTML = "€" + checkout.subtotalPrice;
                });
            }
    
        });

});

// Fetch all products inside a collection
// client.collection.fetchAllWithProducts().then((collections) => {
    // do something with all collections. Max is 20!
// });

//create checkout url
document.querySelector('.checkout').onclick = function getCheckout() {
    //console.log(currentCheckout.webUrl);
    location.href = currentCheckout.webUrl;
}