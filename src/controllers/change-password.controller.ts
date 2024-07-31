import ChangePasswordView from "../views/change-password.view";
import { Controller } from "../utils/common";
import ChangePasswordService from "../services/change-password.service";

class ChangePasswordController extends Controller {
  private view: ChangePasswordView;
  private service: ChangePasswordService;

  constructor() {
    super();
    this.view = new ChangePasswordView();
    this.service = new ChangePasswordService();

    this.changePassword();
  }

  private changePassword() {
    this.view.changePassword(this.service.changePassword);
  }
}

export default ChangePasswordController;
