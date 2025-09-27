import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const lineTotal = (item.FinalPrice * quantity).toFixed(2);

  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="qty-btn decrease">-</button>
      <span class="qty-value">${quantity}</span>
      <button class="qty-btn increase">+</button>
    </div>
    <p class="cart-card__price">$${lineTotal}</p>
  </li>`;
  return newItem;
}

export default class ShoppingCart {
  constructor() {
    this.listElement = document.querySelector("ul.product-list");
    this.productList = getLocalStorage("so-cart") || [];
  }

  init() {
    this.renderCart();
    this.attachQuantityHandlers();
    this.updateTotal();
  }

  renderCart() {
    this.listElement.innerHTML = "";
    renderListWithTemplate(this.productList, this.listElement, cartItemTemplate, "beforeend");

        if (this.productList[0]) {
          qs("div.cart-footer").classList.remove("hide");
          console.log(this.productList)

          const productPrices = this.productList.map(product => product.FinalPrice);
          const total = productPrices.reduce((total, productPrice) => total + productPrice, 0);
          const formatter = new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD"
          });

          const formattedTotal = formatter.format(total);
          console.log(formattedTotal)

          qs("p.cart-total").textContent = `Total: ${formattedTotal}`;

        }
    }


}
