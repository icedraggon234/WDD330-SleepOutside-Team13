import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { capitalize, getParam, loadHeaderFooter, qs } from "./utils.mjs";

const category = getParam("category");
const listElement = qs("ul.product-list");

qs("title").textContent =
  `Top Products: ${category.split("-").map(capitalize).join(" ")}`;

const dataSource = new ExternalServices(category);
const productList = new ProductList(category, dataSource, listElement);

productList.init();
loadHeaderFooter();
