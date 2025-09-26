import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const checkoutProcess = new CheckoutProcess();

checkoutProcess.displaySubtotal();

const zip = document.getElementById("zip");

if (zip.checkValidity()) {
  checkoutProcess.displayOrderSummary();
}
zip.addEventListener("change", () => {
  if (zip.checkValidity()) {
    checkoutProcess.displayOrderSummary();
  }
});

document.querySelector("form#checkout").addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});

loadHeaderFooter();
