import ExternalServices from "./ExternalServices.mjs";
import { formatNumToCurrency, getLocalStorage } from "./utils.mjs";




const services = new ExternalServices();




export default class CheckoutProcess {
    constructor() {

    }

    displaySubtotal() {
        this.cart = getLocalStorage("so-cart");
        this.subtotal = this.cart.reduce((total, product) => total + product.FinalPrice, 0);

        document.getElementById("subtotal").textContent += formatNumToCurrency(this.subtotal);
    }

    displayOrderSummary() {
        this.tax = this.subtotal * .06;
        this.shipping = 8 + 2 * this.cart.length;
        this.total = this.subtotal + this.tax + this.shipping;

        document.getElementById("tax").textContent += formatNumToCurrency(this.tax);
        document.getElementById("shipping").textContent += formatNumToCurrency(this.shipping);
        document.getElementById("total").textContent += formatNumToCurrency(this.total);
    }

    async checkout(form) {
    // get the form element data by the form name
    // convert the form data to a JSON order object using the formDataToJSON function
    // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
    // call the checkout method in the ExternalServices module and send it the JSON order data.

        const jsonData = formDataToJSON(form);
        
        jsonData.orderDate = new Date().toISOString();
        jsonData.orderTotal = this.total;
        jsonData.shipping = this.shipping;
        jsonData.tax = this.tax;
        jsonData.items = packageItems(this.cart);


        const response = await services.checkout(jsonData).then(res => res.json());

        // console.log(response);
    }

    
}


// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
  // An Array.map would be perfect for this process.
    const simplifiedItems = items.map(item => {
        const simplified ={};
        simplified.id = item.Id;
        simplified.name = item.Name;
        simplified.price = item.FinalPrice;
        simplified.quantity = 1;

        return simplified;
    });

    return simplifiedItems;
    
  
}

function formDataToJSON(form) {
    const jsonData = {}
    const formData = new FormData(form);

    formData.forEach((value, key) => {
        jsonData[key] = value;
    })

    return jsonData;
}
