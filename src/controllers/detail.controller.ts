import DetailService from "../services/detail.service";
import { Controller } from "../utils/common";
import DetailView from "../views/detail.view";

class DetailController extends Controller {
  private view: DetailView;
  private service: DetailService;

  constructor() {
    super();
    this.view = new DetailView();
    this.service = new DetailService();

    const userJson = localStorage.getItem("user");
    console.log(userJson);
    if (userJson) {
      const user = JSON.parse(userJson);
      this.view.bindNotification(user.notifications);
    }

    this.view.loadShoesSelected(this.service.getShoes);
    this.view.bindAddShoes(this.service.addShoes, this.service.getShoes);
    // this.view.bindDeleteShoes(this.service.)
    this.view.uploadImage();
    this.view.updateShoesUI();
  }
}

export default DetailController;
