import ProductAction from "./product_action";
import ProductForm from "./product_form";
import ProductImage from "./product_image";

const ProductDetail = () => {
  return `
    <div class="product--all">
      <div class = "product">
        ${ProductForm()}
        <div class="product-right">
          ${ProductImage()}
          ${ProductAction()}
        </div>
      </div>
    </div>
  `;
};

export default ProductDetail;
