import User from "../model/user.model";
import validateFormPassword from "../helper/validation";
import { View } from "../utils/common";
import { createToast } from "./components/handle_toast";
import { authen } from "../utils/authen";

class ChangePasswordView extends View {
  private form?: HTMLFormElement;
  constructor() {
    super();
    authen();
  }

  public changePassword(
    updatePassword: (
      firstName: string,
      lastName: string,
      password: string,
      email: string,
      id: string
    ) => Promise<void>
  ): void {
    this.form = document.querySelector("form") as HTMLFormElement;

    this.form?.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      const password = (document.getElementById("p") as HTMLInputElement).value;
      const repassword = (document.getElementById("p-c") as HTMLInputElement)
        .value;
      const storedUser = localStorage.getItem("users");
      const user: User | null = storedUser ? JSON.parse(storedUser) : null;

      if (user && validateFormPassword()) {
        try {
          console.log(password, repassword);
          await updatePassword(
            user.firstName,
            user.lastName,
            repassword,
            user.email,
            user.id
          );
          createToast("info", "Change password successfully");
          window.location.pathname = "/product/table";
        } catch (err) {
          console.error(err);
          createToast("warning", "Error. Please try again");
        }
      }
    });
  }
}

export default ChangePasswordView;
