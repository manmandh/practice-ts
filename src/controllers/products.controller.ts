import ProductsService from "../services/products.service";
import { Controller } from "../utils/common";
import ProductsView from "../views/products.view";

class ProductsController extends Controller {
  private view: ProductsView;
  private service: ProductsService;

  constructor() {
    super();
    this.view = new ProductsView();
    this.service = new ProductsService();

    this.renderShoes();
  }

  private async renderShoes() {
    const shoes = await this.service.getAllShoes();
    if (shoes) {
      this.view.bindTable(shoes);
    }
  }
}

export default ProductsController;
