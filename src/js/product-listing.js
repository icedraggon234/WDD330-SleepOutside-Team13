import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { capitalize, getParam, loadHeaderFooter, qs } from "./utils.mjs";

const category = getParam("category");
const listElement = qs("ul.product-list");

// 🐞 Debugging logs
console.log("🔍 category =", category);

const dataSource = new ExternalServices(category);
dataSource.getData(category).then(data => {
  console.log("📦 fetched data for", category, ":", data);
});

qs("title").textContent =
  `Top Products: ${category.split("-").map(capitalize).join(" ")}`;

const productList = new ProductList(category, dataSource, listElement);

productList.init();
loadHeaderFooter();
