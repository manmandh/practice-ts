import ProductsService from "../services/products.service";
import ProductsView from "../views/products.view";

class ProductsController {
  view: ProductsView;
  service: ProductsService;

  constructor(view: ProductsView, service: ProductsService) {
    this.view = view;
    this.service = service;
  }
}

export default ProductsController;
