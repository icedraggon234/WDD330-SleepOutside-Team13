import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const lineTotal = (item.FinalPrice * quantity).toFixed(2);

  return `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Images?.PrimaryMedium || ''}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'N/A'}</p>
    <div class="cart-card__quantity">
      <button class="qty-btn decrease">-</button>
      <span class="qty-value">${quantity}</span>
      <button class="qty-btn increase">+</button>
    </div>
    <p class="cart-card__price">$${lineTotal}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor() {
    this.listElement = qs("ul.product-list");
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

    if (this.productList.length > 0) {
      qs("div.cart-footer").classList.remove("hide");
    } else {
      qs("div.cart-footer").classList.add("hide");
    }

    this.updateTotal();
  }

  attachQuantityHandlers() {
    // Event delegation: attach listener to the parent UL
    this.listElement.addEventListener("click", (e) => {
      const li = e.target.closest("li.cart-card");
      if (!li) return;

      const id = li.dataset.id;
      const product = this.productList.find(p => p.Id === id);
      if (!product) return;

      if (e.target.classList.contains("increase")) {
        product.quantity = (product.quantity || 1) + 1;
      } else if (e.target.classList.contains("decrease")) {
        product.quantity = (product.quantity || 1) - 1;
        if (product.quantity < 1) product.quantity = 1;
      }

      setLocalStorage("so-cart", this.productList);
      this.renderCart(); // re-render with updated quantity
    });
  }

  updateTotal() {
    const total = this.productList.reduce(
      (sum, item) => sum + (item.FinalPrice * (item.quantity || 1)),
      0
    );

    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD"
    });

    qs("p.cart-total").textContent = `Total: ${formatter.format(total)}`;
  }
}
