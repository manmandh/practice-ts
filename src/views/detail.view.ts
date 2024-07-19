import config from "../api/config";
import { validateShoes } from "../helper/validation";
import { MyFile, Product } from "../resources/types/product";
import { View } from "../utils/common";
import { createToast } from "./components/handle_toast";

class DetailView extends View {
  constructor() {
    super();
  }

  async bindAddShoes(
    addShoes: (shoes: Product) => Promise<void>,
    getShoes: (id: number) => Promise<Product | undefined>
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
      const id = +(document.getElementById("sku-id") as HTMLInputElement)
        ?.value;
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

        let imageUrl = "";
        let image: MyFile | null = null;
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
          imageUrl = imageData.data.url;
          image = imageInput.files?.[0] as MyFile | null;
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
          imageUrl,
          image,
          status: "active",
        };

        await addShoes(newShoes);
        createToast("info", "Add shoes successfully");
        setTimeout(() => {
          window.location.href = "/product/table";
        }, 3000);

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
        const id = +idInput.value;
        const name = nameInput.value;
        const description = descriptionInput.value;
        const category = categoryInput.value;
        const brand = brandInput.value;
        const amount = +amountInput.value;
        const price = +priceInput.value;
        const salePrice = +salePriceInput.value;

        let imageUrl = "";
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
          imageUrl = data.data.url;
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
          imageUrl,
          status: "active",
        };

        await config.patch(`/shoes/${id}`, newShoes);

        createToast("info", "Update shoes successfully");
        setTimeout(() => {
          window.location.href = "/product/table";
        }, 2000);
      } else {
        createToast("error", "Error updating table");
      }
    });
  }

  cancelShoes(): void {
    const cancelShoesButton = document.getElementById(
      "btn-cancel"
    ) as HTMLButtonElement | null;
    if (cancelShoesButton) {
      cancelShoesButton.addEventListener("click", () => {
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    const inputs = document.querySelectorAll(
      ".restore-value"
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      if (!input.dataset.oldValue) {
        input.dataset.oldValue = input.value;
      }
      input.placeholder = input.dataset.oldValue || "Fill in here";
    });
  }

  async loadShoesSelected(
    getShoes: (productId: string) => Promise<Product>
  ): Promise<void> {
    try {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get("productId");
      if (!productId) return;
      const shoes: Product = await getShoes(productId);
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
        } else if (shoes.image instanceof File) {
          const objectUrl = URL.createObjectURL(shoes.image);
          img.src = objectUrl;
        } else {
          img.src = ""; // Set a default value if shoes.image is null or undefined
        }
      });
    } catch (err) {
      // createToast('error', 'Error loading selected shoes');
    }
  }

  bindDeleteShoes(deleteShoes: (id: number) => Promise<void>): void {
    const deleteShoesButton = document.getElementById(
      "btn-delete"
    ) as HTMLButtonElement | null;
    if (deleteShoesButton) {
      deleteShoesButton.addEventListener("click", async () => {
        const skuIdInput = document.getElementById(
          "sku-id"
        ) as HTMLInputElement;
        const id = Number(skuIdInput.value);
        const productForm = document.querySelector(
          ".product__form"
        ) as HTMLFormElement | null;
        if (productForm && validateShoes(productForm)) {
          await deleteShoes(id);
          createToast("info", "Delete shoes successfully");
          setTimeout(() => {
            window.location.href = "/product/table";
          }, 3000);
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
