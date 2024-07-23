import ProductAllService from "../services/product-all.service";
import { Controller } from "../utils/common";
import ProductAllView from "../views/product-all.view";

class ProductAllController extends Controller {
  private view: ProductAllView;
  private service: ProductAllService;

  constructor() {
    super();
    this.view = new ProductAllView();
    this.service = new ProductAllService();
  }
}

export default ProductAllController;
