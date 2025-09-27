import { addToLocalStorage, qs } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error(`Product with ID ${this.productId} not found`);
      qs("section.product-detail").innerHTML = "<p>Product not found.</p>";
      return;
    }

    this.renderProductDetails();

    const addButton = qs("#addToCart");
    if (addButton) {
      addButton.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    addToLocalStorage("so-cart", this.product);
  }

  renderProductDetails() {
    const container = qs("section.product-detail");
    if (!container) {
      console.error("No .product-detail section found in DOM");
      return;
    }

    // Brand
    const brand = container.querySelector(".product__brand") || container.querySelector("h3");
    if (brand) brand.textContent = this.product.Brand?.Name ?? "Unknown Brand";

    // Name
    const name = container.querySelector(".product__name") || container.querySelector("h2");
    if (name) name.textContent = this.product.NameWithoutBrand ?? this.product.Name;

    // Image
    const img = container.querySelector("img");
    if (img) {
      img.src = this.product.Image ?? "";
      img.alt = this.product.NameWithoutBrand ?? this.product.Name;
    }

    // Price
    const price = container.querySelector(".product-card__price");
    if (price) {
      price.textContent = this.product.FinalPrice
        ? `$${this.product.FinalPrice}`
        : "Price unavailable";
    }

    // Colors
    const color = container.querySelector(".product__color");
    if (color) {
      color.textContent = this.product.Colors?.length
        ? this.product.Colors.map((c) => c.ColorName).join(", ")
        : "No color info";
    }

    // Description
    const description = container.querySelector(".product__description");
    if (description) {
      description.innerHTML = this.product.DescriptionHtmlSimple ?? "No description available.";
    }

    // Add-to-cart button
    const button = container.querySelector("#addToCart");
    if (button) button.dataset.id = this.productId;
  }
}
