import { IUser } from "../resources/types/user";
import { View } from "../utils/common";
import { createToast } from "./components/handle_toast";

class LoginView extends View {
  private formLogin: HTMLFormElement | null;

  constructor() {
    super();
    this.formLogin = document.querySelector(".form__right");
  }

  login(
    getUser: (email: string, password: string) => Promise<Partial<IUser> | null>
  ) {
    this.formLogin?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = (
        document.querySelector(
          '.form__right input[type="text"]'
        ) as HTMLInputElement
      ).value;
      const password = (
        document.querySelector(
          '.form__right input[type="password"]'
        ) as HTMLInputElement
      ).value;
      const accepts = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      );

      console.log(email, password, accepts);

      if (accepts.length < 1) {
        createToast("warning", "You need to agree to the policy");
        return;
      }

      try {
        const users = await getUser(email, password);
        if (users) {
          console.log(users);
          localStorage.setItem("users", JSON.stringify(users));
          window.location.href = "/product/table";
        } else {
          createToast("error", "User not found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default LoginView;
