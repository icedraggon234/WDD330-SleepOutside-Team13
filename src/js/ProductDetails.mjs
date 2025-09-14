import { addToLocalStorage, qs } from "./utils.mjs";


export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();
        qs("button#addToCart").addEventListener("click", this.addProductToCart.bind(this));
        

    }
    addProductToCart() {
        addToLocalStorage("so-cart", this.product);
    }

    renderProductDetails() {


        const [h3, h2, img, price, color, description, button] = qs("section.product-detail").querySelectorAll("h3, h2, img, p, p, p, button");
        h3.textContent = this.product.Brand.Name;
        h2.textContent = this.product.NameWithoutBrand;
        img.src = this.product.Image;
        img.alt = this.product.NameWithoutBrand;
        price.textContent = `$${this.product.FinalPrice}`;
        
        color.textContent = this.product.Colors.map(color => color.ColorName).join(", ");

        description.innerHTML = this.product.DescriptionHtmlSimple;

        button.dataset.id = this.productId;



    //     const productCard = `
    //     <h3>${this.product.Brand.Name}</h3>

    //     <h2 class="divider">${this.product.NameWithoutBrand}</h2>

    //     <img
    //       class="divider"
    //       src="${this.product.Image}"
    //       alt="${this.product.NameWithoutBrand}"
    //     />

    //     <p class="product-card__price">$${this.product.FinalPrice}</p>

    //     <p class="product__color">${this.product.Colors.map(color => color.ColorName).join(", ")}</p>

    //     <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

    //     <div class="product-detail__add">
    //       <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
    //     </div>`


    //   qs("section.product-detail").innerHTML = productCard;
    //   qs("#addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }

}


