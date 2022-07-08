
const service = require ('../../src/helpers/service')

const populateProducts =() => {
    const p1 = document.getElementById('p');
    console.log(service.getAllProducts())
    p1.appendChild(document.createTextNode(service.getAllProducts()))
}
window.onload(populateProducts())
