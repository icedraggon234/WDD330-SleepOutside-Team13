<<<<<<< HEAD
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
=======
import { getParam } from "./utils.mjs";
>>>>>>> 41ec5edc615efac07be2b369cfa9f1403fe1c8c6
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

<<<<<<< HEAD
function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart"); // get cart array of items from local storage if null set to empty array
  if (!Array.isArray(cartItems)) cartItems = [];

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
=======
product.init();
>>>>>>> 41ec5edc615efac07be2b369cfa9f1403fe1c8c6
