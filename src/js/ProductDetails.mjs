// ProductDetails.mjs
import { addToLocalStorage, qs } from "./utils.mjs";

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
    addToLocalStorage("so-cart", this.product);

    // Simple alert confirmation
    alert(`✅ Added "${this.product.NameWithoutBrand}" to your cart!`);

    // Optional: update a cart badge
    const cartCount = qs("#cart-count");
    if (cartCount) {
      const current = parseInt(cartCount.textContent) || 0;
      cartCount.textContent = current + 1;
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
