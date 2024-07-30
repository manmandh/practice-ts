import ProductsService from "../services/products.service";
import { Controller } from "../utils/common";
import ProductsView from "../views/products.view";

class ProductsController extends Controller {
  private view: ProductsView;
  private service: ProductsService;

  constructor() {
    super();
    this.service = new ProductsService();
    this.view = new ProductsView(this.service.updateStatus);

    this.renderShoes();
    this.showTable();

    this.view.logout();

    // this.view.handleSearch(this.service.searchShoes)
  }

  private async renderShoes() {
    const shoes = await this.service.getAllShoes();
    if (shoes) {
      this.view.bindTable(shoes);
    }
  }

  private async showTable() {
    const shoes = await this.service.getAllShoes();
    if (shoes) {
      this.view.showTable(shoes);
    }
  }
}

export default ProductsController;
