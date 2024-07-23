import LoginService from "../services/login.service";
import { Controller } from "../utils/common";
import LoginView from "../views/login.view";

class LoginController extends Controller {
  private view: LoginView;
  private service: LoginService;

  constructor() {
    super();
    this.view = new LoginView();
    this.service = new LoginService();

    this.login();
  }

  login() {
    this.view.login(this.service.getUser);
  }
}

export default LoginController;
