import { toggleMenu } from "../helper/menu";
import config from "../api/config";
import { validateShoes } from "../helper/validation";
import { Product } from "../resources/types/product";
import { View } from "../utils/common";
import { createToast } from "./components/handle_toast";
import { authen } from "../utils/authen";

class DetailView extends View {
  constructor() {
    super();
    authen();
    toggleMenu();
    this.cancelShoes();
  }

  async bindAddShoes(
    addShoes: (shoes: Product) => Promise<void>,
    getShoes: (id: string) => Promise<Product | undefined>
  ): Promise<void> {
    const addShoesButton = document.getElementById(
      "btn-add"
    ) as HTMLButtonElement | null;
    addShoesButton?.addEventListener("click", async () => {
      const name = (document.getElementById("name") as HTMLInputElement)?.value;
      const description = (
        document.getElementById("description") as HTMLInputElement
      )?.value;
      const category = (
        document.getElementById("category") as HTMLSelectElement
      )?.value;
      const brand = (document.getElementById("brand") as HTMLInputElement)
        ?.value;
      const id = (document.getElementById("sku-id") as HTMLInputElement)?.value;
      const amount = +(document.getElementById("amount") as HTMLInputElement)
        ?.value;
      const price = +(document.getElementById("price") as HTMLInputElement)
        ?.value;
      const salePrice = +(
        document.getElementById("sale-price") as HTMLInputElement
      )?.value;
      const imageInput = document.getElementById(
        "imageUpload"
      ) as HTMLInputElement;
      const productForm = document.querySelector(
        ".product__form"
      ) as HTMLFormElement;

      if (validateShoes(productForm)) {
        const data = await getShoes(id);
        console.log(data);
        if (data) {
          createToast("error", "ID already existed");
          return;
        }

        let image = "";
        if (imageInput.files?.length) {
          const form = new FormData();
          form.append("image", imageInput.files?.[0] as Blob);

          const response = await fetch(
            "https://api.imgbb.com/1/upload?key=12bf5830553fd071836060cc5f97b484",
            {
              method: "POST",
              body: form,
            }
          );
          const imageData = await response.json();
          image = imageData.data.url;
        }

        const newShoes: Product = {
          id,
          name,
          description,
          category,
          brand,
          amount,
          price,
          salePrice,
          image,
          status: "active",
        };

        await addShoes(newShoes);
        createToast("info", "Add shoes successfully");

        window.location.href = "/product/table";

        const storedUser = localStorage.getItem("users");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const currentTime = new Date().toLocaleString();
        if (user) {
          user.notifications.push(`You added ${name} at ${currentTime}`);
          localStorage.setItem("users", JSON.stringify(user));
        }
      } else {
        createToast("error", "Error adding shoes");
      }
    });
  }

  async updateShoesUI(): Promise<void> {
    const updateShoesButton = document.getElementById(
      "btn-update"
    ) as HTMLButtonElement | null;
    updateShoesButton?.addEventListener("click", async () => {
      const nameInput = document.getElementById("name") as HTMLInputElement;
      const descriptionInput = document.getElementById(
        "description"
      ) as HTMLInputElement;
      const categoryInput = document.getElementById(
        "category"
      ) as HTMLSelectElement;
      const brandInput = document.getElementById("brand") as HTMLInputElement;
      const idInput = document.getElementById("sku-id") as HTMLInputElement;
      const amountInput = document.getElementById("amount") as HTMLInputElement;
      const priceInput = document.getElementById("price") as HTMLInputElement;
      const salePriceInput = document.getElementById(
        "sale-price"
      ) as HTMLInputElement;
      const imageInput = document.getElementById(
        "imageUpload"
      ) as HTMLInputElement;
      const productForm = document.querySelector(
        ".product__form"
      ) as HTMLFormElement;

      if (validateShoes(productForm)) {
        const id = idInput.value;
        const name = nameInput.value;
        const description = descriptionInput.value;
        const category = categoryInput.value;
        const brand = brandInput.value;
        const amount = +amountInput.value;
        const price = +priceInput.value;
        const salePrice = +salePriceInput.value;

        let image = "";
        if (imageInput.files?.length) {
          const form = new FormData();
          form.append("image", imageInput.files?.[0] as Blob);

          const response = await fetch(
            "https://api.imgbb.com/1/upload?key=12bf5830553fd071836060cc5f97b484",
            {
              method: "POST",
              body: form,
            }
          );
          const data = await response.json();
          image = data.data.url;
        }

        const newShoes: Product = {
          id,
          name,
          description,
          category,
          brand,
          amount,
          price,
          salePrice,
          image,
          status: "active",
        };

        await config.patch(`/shoes/${id}`, newShoes);

        createToast("info", "Update shoes successfully");
        window.location.href = "/product/table";
      } else {
        createToast("error", "Error updating table");
      }
    });
  }

  cancelShoes(): void {
    const cancelShoesButton = document.getElementById(
      "btn-cancel"
    ) as HTMLButtonElement | null;
    cancelShoesButton?.addEventListener("click", () => {
      this.resetForm();
    });
  }

  resetForm(): void {
    const inputs = document.querySelectorAll(
      ".restore-value"
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  async loadShoesSelected(
    getShoes: (productId: string) => Promise<Product | undefined>
  ): Promise<void> {
    try {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get("productId");
      if (!productId) return;
      const shoes = await getShoes(productId);
      console.log(shoes);
      const nameInput = document.getElementById("name") as HTMLInputElement;
      const descriptionInput = document.getElementById(
        "description"
      ) as HTMLInputElement;
      const categoryInput = document.getElementById(
        "category"
      ) as HTMLInputElement;
      const brandInput = document.getElementById("brand") as HTMLInputElement;
      const skuIdInput = document.getElementById("sku-id") as HTMLInputElement;
      const amountInput = document.getElementById("amount") as HTMLInputElement;
      const priceInput = document.getElementById("price") as HTMLInputElement;
      const salePriceInput = document.getElementById(
        "sale-price"
      ) as HTMLInputElement;
      if (!shoes) return;

      nameInput.value = shoes.name;
      descriptionInput.value = shoes.description;
      categoryInput.value = shoes.category;
      brandInput.value = shoes.brand;
      skuIdInput.value = shoes.id.toString();
      amountInput.value = shoes.amount.toString();
      priceInput.value = shoes.price.toString();
      salePriceInput.value = shoes.salePrice.toString();

      const imagePreview =
        document.querySelectorAll<HTMLImageElement>(".img-preview");
      imagePreview.forEach((img) => {
        if (typeof shoes.image === "string") {
          img.src = shoes.image;
        } else {
          img.src = "";
        }
      });
    } catch (err) {
      // createToast('error', 'Error loading selected shoes');
    }
  }

  bindDeleteShoes(deleteShoes: (id: string) => Promise<void>): void {
    const deleteShoesButton = document.getElementById(
      "btn-delete"
    ) as HTMLButtonElement | null;
    if (deleteShoesButton) {
      deleteShoesButton.addEventListener("click", async () => {
        const skuIdInput = document.getElementById(
          "sku-id"
        ) as HTMLInputElement;
        const id = skuIdInput.value;
        const productForm = document.querySelector(
          ".product__form"
        ) as HTMLFormElement | null;
        if (productForm) {
          await deleteShoes(id);
          createToast("info", "Delete shoes successfully");
          window.location.href = "/product/table";
        }
      });
    }
  }

  uploadImage() {
    const image = document.getElementById("imageUpload") as HTMLInputElement;
    const imagePreview =
      document.querySelectorAll<HTMLImageElement>(".img-preview");

    if (image) {
      image.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (target?.files?.length) {
          const src = URL.createObjectURL(target.files[0]);
          imagePreview.forEach((img) => {
            img.src = src;
          });
        }
      });
    }
  }

  bindNotification(notifications: string[] = []) {
    const updateNoti = document.querySelector<HTMLElement>(".noti-list");
    console.log(updateNoti);
    if (updateNoti) {
      const notiList = notifications
        .map((noti) => {
          return `<p class="noti-para">${noti}</p>`;
        })
        .join("");
      updateNoti.innerHTML = notiList;
    }
  }
}

export default DetailView;
