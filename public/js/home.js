
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');



    const cartIcons  = document.querySelectorAll('.cartImg');
    cartIcons.forEach(el => el.addEventListener('click', event => {
        console.log('Add To Cart: ' + event.target.getAttribute("data-product"));
        //code for adding to cart
    }));


});
