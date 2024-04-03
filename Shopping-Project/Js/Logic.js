import Getting from "./RequestData.js";
import Products from "./BluePrints.js";
const ProductSection = document.getElementById("Products");
document.addEventListener("DOMContentLoaded", load);
async function load() {
  const Getto = await Getting();
  const ProductInstance = new Products(ProductSection, Getto);
  console.log(ProductInstance);
  ProductInstance.showProduct();
}
