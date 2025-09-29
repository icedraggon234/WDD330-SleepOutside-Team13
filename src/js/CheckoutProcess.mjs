import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, formatNumToCurrency, getLocalStorage, setLocalStorage } from "./utils.mjs";




const services = new ExternalServices();




export default class CheckoutProcess {
    constructor() {

    }

    displaySubtotal() {
        this.cart = getLocalStorage("so-cart");
        this.subtotal = this.cart.reduce((total, product) => total + product.FinalPrice * product.quantity, 0);

        // console.log(this.cart)

        document.getElementById("subtotal").textContent += formatNumToCurrency(this.subtotal);
    }

    displayOrderSummary() {
        this.tax = this.subtotal * .06;
        this.shipping = 8 + 2 * this.cart.reduce((amountOfProduct, product) => amountOfProduct + product.quantity, 0);
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

        let response;

        // The convertToJson function in ExternalServices used in it's checkout function now throws an
        // error if something is wrong, as per individual activity 4.
        try {
        response = await services.checkout(jsonData).then(res => res.json());
        } catch (error) {
            console.log("Something wrong with CheckoutProcess.checkout()");
            console.error(error);
        }

        // console.log(response);

        if (response.message === "Order Placed") {
            // console.log("success");

            // Clearing cart after a successfully placed order
            setLocalStorage("so-cart", []);

            // Redirecting to the success page.
            window.location.href = "success.html";
        } else {
            alertMessage("Something went wrong with placing the order.", true, 3000)
        }
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
