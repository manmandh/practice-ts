import DetailController from "../controllers/detail.controller";
import LoginController from "../controllers/login.controller";
import RegisterController from "../controllers/register.controller";
import Router from "../routes";
import DetailService from "../services/detail.service";
import LoginService from "../services/login.service";
import RegisterService from "../services/register.service";
import { Controller } from "../utils/common";
import ProductDetail from "./components/product_detail";
import ProductHeader_Two from "./components/product_header_two";
import DetailView from "./detail.view";
import Footer from "./layouts/footer";
import Header from "./layouts/header";
import SideBar from "./layouts/sidebar";
import LoginView from "./login.view";
import loginForm from "./pages/login";
import registerForm from "./pages/register";
import RegisterView from "./register.view";

class ShoesView {
  main: Element;
  router: Router;

  constructor() {
    this.main = document.querySelector("#root")!;
    const container = document.createElement("div");
    container.className = "container";
    this.router = new Router();

    this.init();

    const router = this.router.findRoute()!;
    if (router) {
      const { view, service } = router;
      new Controller(view, service);
    }

    this.router.listen();
  }

  init() {
    this.router.define({
      path: "/login",
      element: loginForm(),
      view: LoginView,
      controller: LoginController,
      service: LoginService,
    });
    this.router.define({
      path: "/register",
      element: registerForm(),
      view: RegisterView,
      controller: RegisterController,
      service: RegisterService,
    });
    this.router.define({
      path: "/product/detail",
      element: this.ProductDetails(),
      view: DetailView,
      controller: DetailController,
      service: DetailService,
    });
  }

  ProductDetails() {
    const bodyFooter = `
      <div class="body__footer">
        ${ProductHeader_Two()}
        ${ProductDetail()}
        ${Footer()}
      </div>
    `;
    const main = `
      <main class="main">
        ${Header()}
        ${bodyFooter}
      </main>
    `;
    const element = `
      <div class="container">
        ${SideBar()}
        ${main}
      </div>
    `;
    return element;
  }
}

export default ShoesView;
