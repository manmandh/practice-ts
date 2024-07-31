import { authen } from "../utils/authen";
import { toggleMenu } from "../helper/menu";

class AllProductsView {
  constructor() {
    authen();
    const sidebarMenuItem = document.querySelector(
      ".sidebar__menu--item:nth-child(2)"
    ) as HTMLElement;
    sidebarMenuItem?.classList.add("active");
    this.ProductAll();
    toggleMenu();
  }

  private ProductAll(): void {
    const btn = document.querySelector(".btn") as HTMLButtonElement;
    btn?.addEventListener("click", () => {
      window.location.pathname = "product/detail";
    });
  }
}

export default AllProductsView;
