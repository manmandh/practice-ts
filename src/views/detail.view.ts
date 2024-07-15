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
}

export default DetailView;
