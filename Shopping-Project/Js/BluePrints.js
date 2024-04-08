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
    ProductPrice.innerText = "$ " + price;
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
  handleEvent(event) {
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
    this.ListOfProductsPlace.addEventListener("click", this);
  }
  ShowBoughtProduct() {
    console.log(this.PriceOfProducts);
    this.FinalProductBoughtList = [...new Set(this.ProductBoughtList)];
    this.ListOfProductsPlace.innerHTML = "";
    this.FinalProductBoughtList.forEach((Product) => {
      const Quantity = this.ProductBoughtList.filter(
        (P) => P.id === Product.id
      ).length;
      this.CreateBoughtProductSection(Product, Quantity);
    });
    this.CalculatePrice();
  }
  CreateBoughtProductSection(Product, Quantity) {
    const CardEle = document.createElement("div");
    CardEle.innerHTML = this.CreateImgEle(Product);
    CardEle.innerHTML += this.CreateInfoEle(Product);
    CardEle.innerHTML += this.CreateControlEle(Product, Quantity);
    this.ListOfProductsPlace.appendChild(CardEle);
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
        <p>$ ${price}</p>
      </div>
    `;
    return InfoJSX;
  }
  CreateControlEle(data, Quantity) {
    const { id } = data;
    const ControlJSX = `
      <div>
        <div>
        <button class="custom-btn btn-addremove"><span  data-id = ${id} >-</span></button>
        <span>${Quantity}</span>
        <button class="custom-btn btn-addremove"><span  data-id = ${id} >+</span></button>
        </div>
        <button class = "explore" data-id = ${id}>Remove</button>
      </div>
    `;
    return ControlJSX;
  }
  handleEvent(event) {
    const TextClicked = event.target.innerText;
    const IdClicked = event.target.dataset.id;
    this.CheckClickedButton(TextClicked, IdClicked);
  }
  CheckClickedButton(TextClicked, IdClicked) {
    switch (TextClicked) {
      case "+":
        this.increaseValue(IdClicked);
        break;
      case "-":
        this.decreaseValue(IdClicked);
        break;
      case "Remove":
        this.RemoveValue(IdClicked);
        break;
    }
  }
  increaseValue(Productid) {
    const Product = this.ProductBoughtList.find((p) => p.id === +Productid);
    this.ProductBoughtList.push(Product);
    this.ShowBoughtProduct();
  }
  decreaseValue(Productid) {
    const Productindex = this.ProductBoughtList.findIndex(
      (p) => p.id === +Productid
    );
    this.ProductBoughtList.splice(Productindex, 1);
    this.ShowBoughtProduct();
  }
  RemoveValue(Productid) {
    const NewProductList = this.ProductBoughtList.filter(
      (p) => p.id !== +Productid
    );
    this.ProductBoughtList = NewProductList;
    this.ShowBoughtProduct();
  }
  CalculatePrice() {
    const AllBoughtProducts = this.ProductBoughtList.reduce(
      (acc, cur) => (acc += cur.price),
      0
    );
    this.PriceOfProducts.innerText = "$ " + AllBoughtProducts;
  }
}
export { Products as Products, Cart as Carting };
