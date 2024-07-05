import Shoes from "../model/shoes.model";
import { Service } from "../utils/common";
import config from "../api/config";

class ProductsService extends Service {
  private shoes: Shoes[] = [];

  constructor() {
    super();
  }
  async getAllShoes(): Promise<Shoes[]> {
    try {
      const { data } = await config.get<Shoes[]>("/shoes");
      if (data) {
        this.shoes = data.map((shoeData) => new Shoes(shoeData));
        return this.shoes;
      }
      return [];
    } catch (error) {
      console.error("Error fetching shoes:", error);
      throw error;
    }
  }
}

export default ProductsService;
