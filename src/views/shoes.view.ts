import ChangePasswordController from "../controllers/change-password.controller";
import DashboardController from "../controllers/dashboard.controller";
import DetailController from "../controllers/detail.controller";
import LoginController from "../controllers/login.controller";
import ProductAllController from "../controllers/product-all.controller";
import ProductsController from "../controllers/products.controller";
import RegisterController from "../controllers/register.controller";
import Router from "../routes";
import ChangePasswordService from "../services/change-password.service";
import DashboardService from "../services/dashboard.service";
import DetailService from "../services/detail.service";
import LoginService from "../services/login.service";
import ProductAllService from "../services/product-all.service";
import ProductsService from "../services/products.service";
import RegisterService from "../services/register.service";
import ChangePasswordView from "./change-password.view";
import Pagination from "./components/pagination";
import ProductDetail from "./components/product_detail";
import ProductHeader from "./components/product_header";
import ProductHeader_Two from "./components/product_header_two";
import ShoesTable from "./components/shoes_table";
import DashboardView from "./dashboard.view";
import DetailView from "./detail.view";
import Footer from "./layouts/footer";
import Header from "./layouts/header";
import SideBar from "./layouts/sidebar";
import LoginView from "./login.view";
import changePassword from "./pages/change-password";
import loginForm from "./pages/login";
import registerForm from "./pages/register";
import ProductAllView from "./product-all.view";
import ProductsView from "./products.view";
import RegisterView from "./register.view";

class ShoesView {
  main: Element;
  router: Router;
  toastList: HTMLElement;

  constructor() {
    this.main = document.querySelector("#root")!;
    const container = document.createElement("div");
    container.className = "container";
    this.toastList = document.createElement("ul");
    this.toastList.classList.add("notifications");
    console.log(this.toastList);
    this.main.append(container, this.toastList);
    this.router = new Router();

    this.init();

    const router = this.router.findRoute()!;
    if (router) {
      const { controller } = router;
      new controller();
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
    this.router.define({
      path: "/change-password",
      element: changePassword(),
      view: ChangePasswordView,
      controller: ChangePasswordController,
      service: ChangePasswordService,
    });
    this.router.define({
      path: "/dashboard",
      element: this.Dashboard(),
      view: DashboardView,
      controller: DashboardController,
      service: DashboardService,
    });
    this.router.define({
      path: "/product/all",
      element: this.ProductAll(),
      view: ProductAllView,
      controller: ProductAllController,
      service: ProductAllService,
    });
    this.router.define({
      path: "/product/table",
      element: this.ProductTable(),
      view: ProductsView,
      controller: ProductsController,
      service: ProductsService,
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

  Dashboard() {
    const bodyFooter = `
      <div class="body__footer">
        <div>Coming soon</div>
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

  ProductAll() {
    const bodyFooter = `
      <div class="body__footer">
        <div>
          <button class="btn" style="background-color: #4a69e2; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; font-weight: 600; font-family: 'Open Sans', sans-serif; cursor: pointer;">
            Add new product
          </button>
        </div>
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

  ProductTable(): string {
    const bodyFooter = `
      <div class="body__footer">
        ${ProductHeader()}
        ${ShoesTable()}
        ${Pagination()}
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
