import { Validation } from "../resources/types/validation";
import { createToast } from "../views/components/handle_toast";

export function validateForm(
  firstName = "",
  lastName = "",
  password = "",
  email = ""
): boolean {
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z]+$/;
  const validations: Validation[] = [
    {
      field: firstName,
      regex: nameRegex,
      errorMessage: "First name should contain only characters.",
    },
    {
      field: lastName,
      regex: nameRegex,
      errorMessage: "Last name should contain only characters.",
    },
    { field: firstName.trim(), errorMessage: "First name cannot be empty." },
    { field: lastName.trim(), errorMessage: "Last name cannot be empty." },
    {
      field: password,
      regex: passwordRegex,
      errorMessage:
        "Password must be at least 8 characters with at least one uppercase, one lowercase, one special character, and a number.",
    },
    {
      field: email.trim(),
      regex: emailRegex,
      errorMessage: "Please enter a valid email address.",
    },
  ];

  let isValid = true;

  validations.forEach((validation) => {
    if (!validation.field) {
      createToast("warning", validation.errorMessage);
      isValid = false;
    } else if (validation.regex && !validation.regex.test(validation.field)) {
      createToast("warning", validation.errorMessage);
      isValid = false;
    }
  });

  return isValid;
}

const inputValidationRules: Record<string, RegExp> = {
  name: /.+/,
  description: /.+/,
  category: /.+/,
  brand: /.+/,
  "sku-id": /^\d+$/,
  amount: /^\d+$/,
  price: /^\d+(\.\d{1,2})?$/,
  "sale-price": /^\d+(\.\d{1,2})?$/,
};

const inputCollection: Record<string, string> = {
  name: "Name",
  description: "Description",
  category: "Category",
  brand: "Brand",
  "sku-id": "ID",
  amount: "Amount",
  price: "Price",
  "sale-price": "Sale Price",
};

const errorMsg: Record<string, string> = {
  require: " cannot be empty!",
  invalid: "please enter valid ",
  tooShort: " must be longer than 5 characters.",
  negativeNum: "value must be greater than 0.",
};

const handleValidate = (
  input: HTMLElement,
  condition: boolean,
  injectClass: string
) => {
  if (condition) {
    input.classList.remove(injectClass);
  } else {
    input.classList.add(injectClass);
  }
};

const checkInput = (target: HTMLInputElement, eventType: string) => {
  const inputTarget = target;
  const inputValue = inputTarget.value;
  const inputName = inputTarget.id;

  switch (eventType) {
    case "focus": {
      handleValidate(inputTarget, true, "invalid");
      break;
    }
    case "blur": {
      const inputValidate = inputValidationRules[inputName].test(inputValue);
      if (inputValue.trim().length === 0) {
        createToast("warning", inputCollection[inputName] + errorMsg.require);
        handleValidate(inputTarget, false, "invalid");
      } else if (
        ["amount", "price", "sale-price", "sku-id"].includes(inputName)
      ) {
        if (isNaN(parseFloat(inputValue)) || parseFloat(inputValue) <= 0) {
          createToast("warning", errorMsg.negativeNum);
          handleValidate(inputTarget, false, "invalid");
        } else {
          handleValidate(inputTarget, true, "invalid");
        }
      } else {
        if (inputValue.length < 5) {
          createToast(
            "warning",
            inputCollection[inputName] + errorMsg.tooShort
          );
          handleValidate(inputTarget, false, "invalid");
        } else if (!inputValidate) {
          createToast("warning", errorMsg.invalid + inputCollection[inputName]);
          handleValidate(inputTarget, inputValidate, "invalid");
        } else {
          handleValidate(inputTarget, true, "invalid");
        }
      }
      break;
    }
    default:
      break;
  }
};

export function validateShoes(form: HTMLFormElement): boolean {
  const inputs = form.querySelectorAll<HTMLInputElement>(".restore-value");
  let isValid = true;

  inputs.forEach((input) => {
    checkInput(input, "blur");
    if (input.classList.contains("invalid")) {
      isValid = false;
    }
  });

  inputs.forEach((input) => input.classList.remove("invalid"));
  return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
  const passwordInputs =
    document.querySelectorAll<HTMLInputElement>(".password");
  passwordInputs.forEach(function (input) {
    input.addEventListener("keyup", function () {
      const p = document.getElementById("p") as HTMLInputElement;

      if (p && p.value.length >= 8) {
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /\d/;

        const isValid =
          upperCaseRegex.test(p.value) &&
          lowerCaseRegex.test(p.value) &&
          specialCharacterRegex.test(p.value) &&
          numberRegex.test(p.value);

        if (!isValid) {
          document.getElementById("valid")!.innerHTML =
            "Password does not meet the requirements";
        } else {
          document.getElementById("valid")!.innerHTML = "";
        }

        const strength =
          p.value.length > 6 && p.value.match(/[^\w\s]/gi)
            ? "strong"
            : p.value.length > 5 && p.value.match(/\d+/g)
              ? "medium"
              : "weak";

        const strengthElement = document
          .getElementById("strong")!
          .getElementsByTagName("span")[0];
        strengthElement.className = strength;
        strengthElement.innerHTML = strength;
      } else {
        document.getElementById("valid")!.innerHTML =
          "Password must be at least 8 characters long";
        const strengthElement = document
          .getElementById("strong")!
          .getElementsByTagName("span")[0];
        strengthElement.className = "";
        strengthElement.innerHTML = "";
      }
    });
  });
});

function validateFormPassword(): boolean {
  const password = (document.getElementById("p") as HTMLInputElement)?.value;
  const confirmPassword = (document.getElementById("p-c") as HTMLInputElement)
    ?.value;

  if (!password.trim() || !confirmPassword.trim()) {
    createToast("warning", "Please fill in all fields.");
    return false;
  }

  return true;
}

export default validateFormPassword;
