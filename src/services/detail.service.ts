import config from "../api/config";
import { Product } from "../resources/types/product";
import { Service } from "../utils/common";
import { createToast } from "../views/components/handle_toast";

class DetailService extends Service {
  constructor() {
    super();
  }

  async getShoes(id: string): Promise<Product | undefined> {
    try {
      const { data } = await config.get<Product[]>(`/shoes`, {
        params: { id },
      });
      return data[0];
    } catch (error: unknown) {
      createToast("error", "Error fetching shoes by id");
      return undefined;
    }
  }

  async addShoes(shoes: Product): Promise<void> {
    try {
      await config.post("/shoes", shoes);
    } catch (error: unknown) {
      createToast("error", "Error adding shoes");
      console.log(error);
    }
  }
  async updateShoes(id: string, newShoes: Product): Promise<void> {
    try {
      await config.patch(`/shoes/${id}`, newShoes);
    } catch (error) {
      createToast("error", "Error updating shoes");
      console.error(error);
    }
  }
}

export default DetailService;
