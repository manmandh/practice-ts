import { Controller } from "../resources/types/index";
import { Service, View } from "../utils/common";

class ShoesController implements Controller {
  view: View;
  service: Service;

  constructor(view: View, service: Service) {
    this.view = view;
    this.service = service;
  }
}

export default ShoesController;
