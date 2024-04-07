class Products {
  constructor(SectionParent, Data, Cart) {
    this.CardPlace = SectionParent;
    this.ProductData = Data;
    this.Cart = Cart;
    this.CardPlace.addEventListener("click", this);
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
    AddButton.setAttribute("data-id", id);
    return AddButton;
  }
  ApplyTime(CardProduct, ProductInfo, ProPrBu, ProductPrice, AddButton) {
    ProPrBu.append(ProductPrice, AddButton);
    ProductInfo.appendChild(ProPrBu);
    CardProduct.appendChild(ProductInfo);
    this.CardPlace.appendChild(CardProduct);
  }
  handleEvent() {
    const eve = event.target;
    if (eve.tagName === "BUTTON") {
      this.addToCart(eve.dataset.id);
    }
  }
  addToCart(id) {
    const Pro = this.ProductData.find((i) => i.id === +id);
    this.Cart.ProductBoughtList.push(Pro);
    this.Cart.ShowBoughtProduct();
  }
}
class Cart {
  constructor(ListOfProductsPlace, PriceOfProducts) {
    this.ListOfProductsPlace = ListOfProductsPlace;
    this.PriceOfProducts = PriceOfProducts;
    this.ProductBoughtList = [];
    this.FinalProductBoughtList = [];
  }
  ShowBoughtProduct() {
    this.FinalProductBoughtList = [...new Set(this.ProductBoughtList)];
    this.ListOfProductsPlace.innerHTML = "";
    this.FinalProductBoughtList.forEach((Product) => {
      const Quantity = this.ProductBoughtList.filter(
        (P) => P.id === Product.id
      ).length;
      this.CreateBoughtProductSection(Product, Quantity);
    });
  }
  CreateBoughtProductSection(Product, Quantity) {
    const CardEle = document.createElement("div");
    CardEle.innerHTML = this.CreateImgEle(Product);
    CardEle.innerHTML += this.CreateInfoEle(Product);
    CardEle.innerHTML += this.CreateControlEle(Product, Quantity);
    this.ListOfProductsPlace.appendChild(CardEle);
    console.log(Product);
  }
  CreateImgEle(data) {
    const { image, alt } = data;
    const ImageJSX = `
      <img src = ${image} alt = ${alt}></img>
    `;
    return ImageJSX;
  }
  CreateInfoEle(data) {
    const { name, price } = data;
    const InfoJSX = `
      <div>
        <h3>${name}</h3>
        <p>${price} $</p>
      </div>
    `;
    return InfoJSX;
  }
  CreateControlEle(data, Quantity) {
    const { id } = data;
    const ControlJSX = `
      <div>
        <div>
        <button data-id = ${id} class="custom-btn btn-addremove"><span>-</span></button>
        <span>${Quantity}</span>
        <button data-id = ${id} class="custom-btn btn-addremove"><span>+</span></button>
        </div>
        <button class = "explore" data-id = ${id}>Remove</button>
      </div>
    `;
    return ControlJSX;
  }
}
export { Products as Products, Cart as Carting };
