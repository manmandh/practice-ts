import randomID from "../helper/id";
import { validateForm } from "../helper/validation";
import { AddUserFunction } from "../resources/types/user";
import RegisterService from "../services/register.service";
import { View } from "../utils/common";
import { createToast } from "./components/handle_toast";

class RegisterView extends View {
  private form: HTMLFormElement | null;
  private registerService: RegisterService;

  constructor() {
    super();
    this.form = null;
    this.registerService = new RegisterService();
    this.register((firstName, lastName, email, password) =>
      this.registerService.addUser(
        randomID(),
        firstName,
        lastName,
        email,
        password
      )
    );
  }

  register(addUser: AddUserFunction): void {
    this.form = document.querySelector("form");
    this.form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstNameInput = document.getElementById(
        "firstName"
      ) as HTMLInputElement;
      const lastNameInput = document.getElementById(
        "lastName"
      ) as HTMLInputElement;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;

      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const password = passwordInput.value;
      const email = emailInput.value;

      const accepts = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      if (accepts?.length < 2) {
        createToast("warning", "You need to agree to the policy");
        return;
      }

      const isValid = validateForm(firstName, lastName, password, email);
      if (isValid) {
        addUser(firstName, lastName, email, password)
          .then(() => {
            createToast("info", "Register successfully");
            setTimeout(() => {
              window.location.href = "/login";
            }, 5000);
          })
          .catch((err) => {
            console.error(err);
            createToast("error", "Error registering user");
          });
      }
    });
  }
}

export default RegisterView;
