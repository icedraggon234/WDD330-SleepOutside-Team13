import ProductData from "../js/ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";

const category = "tents";
const listElement = qs("ul.product-list");

const dataSource = new ProductData(category);
const productList = new ProductList(category, dataSource, listElement);

productList.init();
