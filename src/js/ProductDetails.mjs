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




    }

}


