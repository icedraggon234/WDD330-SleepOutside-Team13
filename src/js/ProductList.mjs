import { renderListWithTemplate, addToLocalStorage } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // fetch the product data
    const productList = await this.dataSource.getData(this.category);
    console.log("📦 rendering products:", productList);

    // render products
    renderListWithTemplate(productList, this.listElement, productCardTemplate, "beforeend", true);

    // attach click listeners to all add-to-cart buttons
    this.listElement.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.dataset.id;
        const product = await this.dataSource.findProductById(id);
        if (product) {
          addToLocalStorage("so-cart", product);
          alert(`${product.NameWithoutBrand} added to cart!`);
        } else {
          console.error(`Product with ID ${id} not found.`);
        }
      });
    });
  }
}
