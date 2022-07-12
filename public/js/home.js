
window.addEventListener('load', (event) => {
    getAllProducts();
});

const getAllProducts = async () => {
    const response = await fetch('/api/products');
    const products = await response.json();
    generateProductDisplay(products);
}


const getUpdateCart = async (event) => {
    let item = event.target.getAttribute("data-product-id") 
    let itemQuantity = document.getElementById("quantity-"+item).value ; 

        let bodyObject = {
            "item" : item,
            "quantity" : itemQuantity
        }

        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyObject)
        };

        fetch('/cart', requestOptions)
        .then(async response => {
            response.json();
            console.log(response.json())

            
        })
        .catch(error => {
            element.parentElement.innerHTML = `Error: ${error}`;
            console.error('There was an error!', error);
        });
   
}


const generateProductDisplay = (products) => {
    let newHtml = '';

    products.forEach(product =>{
        newHtml += `
        <div class="column">
        <div class="card">
          <img class="productImg" src="/images/placeholder.png">
          <label class="cardHeading">${product.Name}</label>
          <p class="cardPrice">R${product.Price}</p>
          <p class="cardQuantity">Available: ${ product.Quantity }</p>
          <div class="tooltip">
            <img class="cartImg" src="/images/cart.png" data-product="${product.Name }" data-product-id="${product.Product_ID}">
            <span class="tooltiptext">Add To Cart</span>
          </div>
          <input type="number" id="quantity-${product.Product_ID}" name="quantity" min="1" max="${product.Quantity }" value="1"
          onKeyUp="if(this.value > ${product.Quantity }){this.value='${ product.Quantity }';}else if(this.value<1){this.value='1';}"
          >
        </div>
      </div>
        `
    })

    document.getElementById('productsRow').innerHTML = newHtml ;


    const cartIcons  = document.querySelectorAll('.cartImg');
    cartIcons.forEach(el => el.addEventListener('click', (e)  => { getUpdateCart(e) }  ));
}

