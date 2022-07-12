
window.addEventListener('load', (event) => {
    getAllProducts();

    document.getElementById('searchButton').addEventListener('click', searchProduct) ; 


    document.getElementById('productSearch').addEventListener('keyup', (event) => {
        if (event.target.value.length == 0 ){
            getAllProducts();
        }
    }) ; 
});

const getAllProducts = async () => {
    const response = await fetch('/api/products');
    const products = await response.json();
    await generateProductDisplay(products);
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

        fetch('/api/cart', requestOptions)
        .then(async response => {

        })
        .catch(error => {
            element.parentElement.innerHTML = DOMPurify.sanitize(`Error: ${error}`);
            console.error('There was an error!', error);
        });
   
}


const generateProductDisplay = async (products) => {
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

    document.getElementById('productsRow').innerHTML = DOMPurify.sanitize(newHtml) ;


    const cartIcons  = document.querySelectorAll('.cartImg');
    cartIcons.forEach(el => el.addEventListener('click', (e)  => { getUpdateCart(e) }  ));


    if(products.length > 0){
        document.getElementById('information').innerHTML = '';
    }else{
        document.getElementById('information').innerHTML = 'No products to display';
    }   

    document.getElementById('searchButton').disabled = false;
}


const searchProduct = async () =>{
    document.getElementById('searchButton').disabled = true;
    
    let search = document.getElementById('productSearch').value ;
    
    if(search.length > 0 ){
        const response = await fetch('/api/products/search?' + new URLSearchParams({
            name: search
        }))

        const products = await response.json();
        await generateProductDisplay(products);
        
    }else{
        document.getElementById('searchButton').disabled = false;
    }



}

