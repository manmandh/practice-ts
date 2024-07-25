import config from "../api/config";
import { Service } from "../resources/types/index";
import { createToast } from "../views/components/handle_toast";

class ShoeService implements Service {
  constructor() {}
  async updateStatus(id: string, status: boolean): Promise<void> {
    try {
      await config.patch(`/shoes/${id}`, { status });
    } catch (err) {
      createToast("error", "Error updating status");
    }
  }
}

export default ShoeService;
