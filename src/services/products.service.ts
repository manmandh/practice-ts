import Shoes from "../model/shoes.model";
import { Service } from "../utils/common";
import config from "../api/config";
import { createToast } from "../views/components/handle_toast";

class ProductsService extends Service {
  private shoes: Shoes[] = [];

  constructor() {
    super();
  }

  async getAllShoes(): Promise<Shoes[] | undefined> {
    try {
      const { data } = await config.get("/shoes");
      if (data) {
        this.shoes = data.map((shoes: Shoes) => new Shoes(shoes));
        return this.shoes;
      }
    } catch (error) {
      createToast("error", "Error fetching all shoes");
    }
  }
}

export default ProductsService;
