
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    const cartIcons  = document.querySelectorAll('.cartImg');

    cartIcons.forEach(el => el.addEventListener('click', (e)  => { getUpdateCart(e) }  ));

    document.getElementById('loadProducts').addEventListener('click', getAllProducts)



});

const getAllProducts = async () => {
    const response = await fetch('/api/products');
    const myJson = await response.json();
    console.log(myJson)
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

