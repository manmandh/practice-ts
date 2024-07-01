import LoginController from "../controllers/login.controller";
import RegisterController from "../controllers/register.controller";
import Router from "../routes";
import LoginService from "../services/login.service";
import RegisterService from "../services/register.service";
import { Controller } from "../utils/common";
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
  }
}

export default ShoesView;
