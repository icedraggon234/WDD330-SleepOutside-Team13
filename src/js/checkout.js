import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const checkoutProcess = new CheckoutProcess();

checkoutProcess.displaySubtotal();

const form = document.getElementById("checkout");
const zip = form.zip;
const expiration = form.expiration;

if (zip.checkValidity()) {
  checkoutProcess.displayOrderSummary();
}
zip.addEventListener("change", () => {
  if (zip.checkValidity()) {
    checkoutProcess.displayOrderSummary();
  }
});

function expirationValidityHandling() {
  // console.log(form.expiration.value);

  const currentDate = new Date();
  const expireDate = new Date(
    parseInt(expiration.value.split("/")[1]) + 2000,
    parseInt(expiration.value.split("/")[0]) - 1,
  );

  if (expiration.validity.patternMismatch) {
    expiration.setCustomValidity(
      "Please enter a valid expiration date.\nFormat: MM/YY",
    );
    // console.log("patternMismatch");
  } else if (currentDate > expireDate) {
    expiration.setCustomValidity(
      "Date has expired.\nPlease enter a valid expiration date.",
    );
    // console.log("expired");
  } else {
    expiration.setCustomValidity("");
    // console.log("valid");
  }
}

expirationValidityHandling();
expiration.addEventListener("change", expirationValidityHandling);

document.querySelector("button.submit").addEventListener("click", (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    checkoutProcess.checkout(form);
  } else {
    form.reportValidity();
  }
});

loadHeaderFooter();
