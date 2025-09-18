import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const cart = new ShoppingCart();

cart.init();

loadHeaderFooter();
