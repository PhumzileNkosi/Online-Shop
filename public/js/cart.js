window.addEventListener('load', (event) => {
    getUserCart();

});

const getUserCart = async () => {
    const response = await fetch('/api/cart');
    const cartProducts = await response.json();

    generateCartHtml(cartProducts)
}


const generateCartHtml = (products) => {
    let newHTML = '';

    products.forEach(product =>{
        newHTML += `
        <div class="column">
            <div class="leftPanel">
                <img class="productImg" src="/images/placeholder.png">
            </div>
            <div class="rightPanel">
                <label class="cardHeading">${ product.Name}</label>
                <p class="cardDescription">R${product.Description}</p>
                <p class="cardPrice">R${product.Price} (per item)</p>
                <p class="cardQuantity">
                   Quantity : 
                   <span class="tooltip">
                        ${product.Quantity} <i class="fa fa-minus minusItem" data-product-id="${product.Product_ID }"></i>
                        <span class="tooltiptext">Remove 1 from Cart</span>
                   </span>
                   
                </p>
            </div>
        </div>
        `;
    })

    document.getElementById('productRow').innerHTML = DOMPurify.sanitize(newHTML);
    document.getElementById('cartTotal').innerHTML = DOMPurify.sanitize('Items( ' + products.length + ' )');

    if(products.length == 0 ){
        document.getElementById('notification').innerHTML = 'Start adding items to your cart to see them here' ; 
    }


    const cartIcons  = document.querySelectorAll('.minusItem');
    cartIcons.forEach(el => el.addEventListener('click', (e)  => { removeCartItem(e) }  ));

}


const removeCartItem = async (event) => {
    let item = event.target.getAttribute("data-product-id") 

        let bodyObject = {
            "item" : item,
        }

        //Add code for removal
   
}