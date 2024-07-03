const ProductForm = () => {
  return `
    <div class="product__form">

      <div class="product__form--item">
        <h3>Product name</h3>
        <input class="restore-value" id="name" type="text" placeholder="Adidas Ultra boost"/>
      </div>

      <div class="product__form--item">
        <h3>Description</h3>
        <input class="restore-value" id="description"  placeholder="Long distance running requires a lot from athletes."></input>
      </div>

      <div class="product__form--item">
        <h3>Category</h3>
        <input class="restore-value" id="category" type="text" placeholder="Sneaker" />
      </div>

      <div class="product__form--item">
        <h3>Brand Name</h3>
        <input class="restore-value" id="brand" type="text" placeholder="Addidas" />
      </div>

      <div class="product__form--row">
        <div class="product__form--item">
          <h3>SKU</h3>
          <input class="restore-value" id="sku-id" type="text" />
        </div>
        <div class="product__form--item">
          <h3>Stock Quantity</h3>
          <input class="restore-value" id="amount" type="text" placeholder="21" />
        </div>
      </div>

      <div class="product__form--row">
        <div class="product__form--item">
          <h3>Regular Price</h3>
          <input class="restore-value" id="price" type="text" placeholder="$110.40" />
        </div>
        <div class="product__form--item">
          <h3>Sale Price</h3>
          <input class="restore-value" id="sale-price" type="text" placeholder="$450" />
        </div>
      </div>

      <div class="product__form--item">
        <h3>Tag</h3>
        <div class="product--btn">
          <button id="name-product-1"><a href="">Adidas</a></button>
          <button id="name-product-2"><a href="">Shoes</a></button>
          <button id="name-product-3"><a href="">Sneakers</a></button>
          <button id="name-product-4"><a href="">Ultraboost</a></button>
        </div>
      </div>
    </div>
  `;
};

export default ProductForm;
