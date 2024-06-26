import Getting from "./RequestData.js";
import { Products, Carting } from "./BluePrints.js";
const ProductSection = document.getElementById("Products");
const PriceCart = document.getElementById("PricePlace");
const ListCart = document.getElementById("List");
document.addEventListener("DOMContentLoaded", load);
async function load() {
  const Getto = await Getting();
  const CartInstance = new Carting(ListCart, PriceCart);
  const ProductInstance = new Products(ProductSection, Getto, CartInstance);
  ProductInstance.showProduct();
  CartInstance.ShowBoughtProduct();
}
