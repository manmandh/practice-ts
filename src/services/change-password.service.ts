import { createToast } from "../views/components/handle_toast";
import { Service } from "../utils/common";
import config from "../api/config";

class ChangePasswordService extends Service {
  constructor() {
    super();
  }

  public async changePassword(
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    id: string
  ): Promise<void> {
    try {
      await config.patch(`/users/${id}`, {
        firstName,
        lastName,
        password,
        email,
      });
      createToast("info", "Password updated successfully");
    } catch (err) {
      createToast("error", "Error updating password. Please try again.");
      console.error(err);
    }
  }
}

export default ChangePasswordService;
