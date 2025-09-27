// ProductDetails.mjs
import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product
    this.renderProductDetails();

    // Attach the Add to Cart button
    const button = qs("button#addToCart");
    if (button) {
      button.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart");

    // Check if product already exists in cart
    const existing = cart.find(item => item.Id === this.productId);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cart.push(this.product);
    }

    // Save updated cart
    setLocalStorage("so-cart", cart);

    // Alert confirmation
    alert(`✅ Added "${this.product.NameWithoutBrand}" to your cart!`);

    // Optional: update cart badge
    const cartCount = qs("#cart-count");
    if (cartCount) {
      const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      cartCount.textContent = totalCount;
    }
  }

  renderProductDetails() {
    const section = qs("section.product-detail");
    if (!section) return;

    const h3 = section.querySelector("h3");
    const h2 = section.querySelector("h2");
    const img = section.querySelector("img");
    const price = section.querySelector(".product-card__price");
    const color = section.querySelector(".product__color");
    const description = section.querySelector(".product__description");
    const button = section.querySelector("button#addToCart");

    h3.textContent = this.product.Brand?.Name || "Brand";
    h2.textContent = this.product.NameWithoutBrand || "Product";
    img.src = this.product.Images?.PrimaryLarge || "";
    img.alt = this.product.NameWithoutBrand || "Product Image";
    price.textContent = `$${this.product.FinalPrice?.toFixed(2) || "0.00"}`;
    color.textContent = this.product.Colors?.map(c => c.ColorName).join(", ") || "N/A";
    description.innerHTML = this.product.DescriptionHtmlSimple || "";

    if (button) {
      button.dataset.id = this.productId || "";
    }
  }
}
