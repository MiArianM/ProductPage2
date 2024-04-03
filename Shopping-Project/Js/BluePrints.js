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
    const ProductImage = this.CreatingImage(Product);
    CardProduct.appendChild(ProductImage);
    /* Product Informations */
    const ProductInfo = document.createElement("div");
    /* Product Name */
    const ProductName = this.CreateProductName(Product);
    ProductInfo.appendChild(ProductName);
    /* --------------->Product Price and Button */
    const ProPrBu = document.createElement("div");
    /* Product Price */
    const ProductPrice = this.CreateProductPrice(Product);
    ProductInfo.appendChild(ProductPrice);
    /* Product Button */
    const AddButton = this.CreateProductButton(Product);
    /*Apply To Parents Lmao ! */
    this.ApplyTime(CardProduct, ProductInfo, ProPrBu, ProductPrice, AddButton);
  }
  CreatingImage(Product) {
    const { image, alt } = Product;
    const ProductImage = document.createElement("img");
    ProductImage.src = image;
    ProductImage.alt = alt;
    return ProductImage;
  }
  CreateProductName(Product) {
    const { name } = Product;
    const ProductName = document.createElement("h3");
    ProductName.innerText = name;
    return ProductName;
  }
  CreateProductPrice(Product) {
    const { price } = Product;
    const ProductPrice = document.createElement("span");
    ProductPrice.innerText = price + " $";
    return ProductPrice;
  }
  CreateProductButton(Product) {
    const { id } = Product;
    const AddButton = document.createElement("button");
    AddButton.innerText = "+";
    AddButton.setAttribute("data-set", id);
    return AddButton;
  }
  ApplyTime(CardProduct, ProductInfo, ProPrBu, ProductPrice, AddButton) {
    ProPrBu.append(ProductPrice, AddButton);
    ProductInfo.appendChild(ProPrBu);
    CardProduct.appendChild(ProductInfo);
    this.CardPlace.appendChild(CardProduct);
  }
}
export default Products;
