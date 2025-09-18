import ProductData from "../js/ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, qs } from "./utils.mjs";
import Alert from "./Alert.js";

const category = "tents";
const listElement = qs("ul.product-list");

const dataSource = new ProductData(category);
const productList = new ProductList(category, dataSource, listElement);

productList.init();

const alerts = new Alert();
alerts.loadAlerts();

loadHeaderFooter();
