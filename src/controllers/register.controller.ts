import { Controller } from "../utils/common";
import RegisterView from "../views/register.view";

class RegisterController extends Controller {
  constructor() {
    super();
    new RegisterView();
  }
}

export default RegisterController;
