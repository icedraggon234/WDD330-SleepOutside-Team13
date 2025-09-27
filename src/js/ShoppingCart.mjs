import { formatNumToCurrency, getLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

return newItem
}


export default class ShoppingCart {
    constructor() {
        this.listElement =  document.querySelector("ul.product-list");
        this.productList = getLocalStorage("so-cart");
    }

    init() {

        renderListWithTemplate(this.productList, this.listElement, cartItemTemplate, "beforeend");

        if (this.productList[0]) {
          qs("div.cart-footer").classList.remove("hide");
          console.log(this.productList)

          const productPrices = this.productList.map(product => product.FinalPrice);
          const total = productPrices.reduce((total, productPrice) => total + productPrice, 0);
          

          const formattedTotal = formatNumToCurrency(total);

          qs("p.cart-total").textContent = `Total: ${formattedTotal}`;

        }
    }


}
