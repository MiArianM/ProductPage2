class Products {
  constructor(SectionParent, Data) {
    this.CardPlace = SectionParent;
    this.ProductData = Data;
  }
  showProduct() {
    this.ProductData.forEach((Product) => this.CreateProduct(Product));
  }
  CreateProduct(Product) {
    const CardProduct = document.createElement("div");
    /* Image Section For Card */
    const ProductImage = document.createElement("img");
    ProductImage.src = Product.image;
    ProductImage.alt = Product.alt;
    CardProduct.appendChild(ProductImage);
    /* Product Informations */
    const ProductInfo = document.createElement("div");
    /* Product Name */
    const ProductName = document.createElement("h3");
    ProductName.innerText = Product.name;
    ProductInfo.appendChild(ProductName);
    /* --------------->Product Price and Button */
    const ProPrBu = document.createElement("div");
    /* Product Price */
    const ProductPrice = document.createElement("span");
    ProductPrice.innerText = Product.price + " $";
    ProductInfo.appendChild(ProductPrice);
    /* Product Button */
    const AddButton = document.createElement("button");
    AddButton.innerText = "+";
    ProPrBu.append(ProductPrice, AddButton);
    ProductInfo.appendChild(ProPrBu);
    CardProduct.appendChild(ProductInfo);
    this.CardPlace.appendChild(CardProduct);
  }
}
export default Products;
