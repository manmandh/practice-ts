import Shoes from "../model/shoes.model";
import TableBody from "./components/table_row";
import { View } from "../utils/common";

class ProductsView extends View {
  private itemsPerPage: number;
  private allShoes: Shoes[] = [];
  private totalPages: number = 0;

  constructor(
    private updateStatus: (productId: string, status: boolean) => Promise<void>
  ) {
    super();
    this.itemsPerPage = 8;
    this.updateURLParameter();
    this.bindNotification();
    const lastSidebarItem = document.querySelector(
      ".sidebar__menu--item:last-child"
    ) as HTMLElement;
    lastSidebarItem?.classList.add("active");
    // toggleMenu();
  }

  bindTable(shoes: Shoes[]): void {
    const table = document.querySelector(
      ".table-content table"
    ) as HTMLTableElement;
    if (!table) return;

    const tableBody = table.querySelector("tbody") as HTMLTableSectionElement;
    if (!tableBody) return;

    if (shoes && shoes.length) {
      tableBody.innerHTML = TableBody(shoes);
    } else {
      tableBody.innerHTML = "";
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.setAttribute("colspan", "8");
      cell.setAttribute("align", "center");
      cell.innerText = "No row";
      row.appendChild(cell);
      tableBody.appendChild(row);
    }

    const tableRows = document.querySelectorAll(".product-row");
    tableRows.forEach((row) => {
      row.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const productId = target.closest(".product-row")?.id;
        if (!productId) return;

        if (target.closest(".stock-wrapper")) {
          e.stopPropagation();
          if (this.updateStatus) {
            this.switchStatus(productId, target, this.updateStatus);
          }
          return;
        }

        if (target.closest(".product-checkbox")) return;
        window.location.href = `/product/detail?productId=${productId}`;
      });
    });
  }

  async showTable(shoes: Shoes[]): Promise<void> {
    this.allShoes = shoes;
    this.updatePage();
    this.handlePagination();
  }

  private getCurrentPageFromURL(): number {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("currentPage") || "1", 10);
  }

  private updateURLParameter(currentPage: number = 1): void {
    const params = new URLSearchParams(window.location.search);
    params.set("currentPage", currentPage.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }

  private updatePage = (shoes?: Shoes[]): void => {
    const currentPage = this.getCurrentPageFromURL();
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const shoesToShow = shoes
      ? shoes.slice(startIndex, endIndex)
      : this.allShoes.slice(startIndex, endIndex);
    this.bindTable(shoesToShow);
  };

  private bindPaginationButtons = (): void => {
    const paginationButtons = document.querySelectorAll(
      ".pagination > button"
    ) as NodeListOf<HTMLElement>;
    console.log(paginationButtons);
    let currentPage = this.getCurrentPageFromURL();
    const maxDisplayedButtons = 10;
    let numButtonsToShow = Math.min(maxDisplayedButtons, this.totalPages);

    if (this.totalPages <= maxDisplayedButtons) {
      numButtonsToShow = this.totalPages;
    }

    paginationButtons.forEach((button, index) => {
      button.style.display = index < numButtonsToShow ? "block" : "none";
      button.onclick = () => {
        const buttonText = button.innerText.toLowerCase();
        if (buttonText === "next") {
          const currentButton = Array.from(paginationButtons).findIndex(
            (btn) => btn.id === "current"
          );
          console.log(currentButton);
          if (
            currentButton >= 0 &&
            currentButton + 1 < paginationButtons.length
          ) {
            paginationButtons[currentButton + 1].setAttribute("id", "current");
            paginationButtons[currentButton].removeAttribute("id");

            if (currentPage < this.totalPages) {
              currentPage++;
            }
          }
        } else {
          paginationButtons.forEach((btn) => {
            if (btn.id === "current") btn.removeAttribute("id");
          });
          button.setAttribute("id", "current");
          currentPage = parseInt(button.innerText, 10);
        }
        this.updateURLParameter(currentPage);
        this.updatePage();
        this.toggleNextButtonVisibility(currentPage, this.totalPages);
      };
    });
  };

  private toggleNextButtonVisibility = (
    currentPage: number,
    totalPages: number
  ): void => {
    const nextButton = document.getElementById("next") as HTMLElement;
    if (nextButton) {
      nextButton.style.display = currentPage === totalPages ? "none" : "flex";
    }
  };

  private async handlePagination(): Promise<void> {
    const currentPage = this.getCurrentPageFromURL();
    this.totalPages = Math.ceil(this.allShoes.length / this.itemsPerPage);

    this.updatePage();
    this.bindPaginationButtons();
    this.toggleNextButtonVisibility(currentPage, this.totalPages);
  }

  private switchStatus(
    productId: string,
    target: HTMLElement,
    updateStatus: (productId: string, status: boolean) => void
  ): void {
    const dot = target.querySelector("span") as HTMLElement;
    const status = target.querySelector("p") as HTMLElement;
    if (status && dot) {
      if (status.innerText === "Sold out") {
        status.innerText = "Stock";
        dot.className = "stock";
        updateStatus(productId, true);
      } else {
        status.innerText = "Sold out";
        dot.className = "sold-out";
        updateStatus(productId, false);
      }
    }
  }

  private bindNotification(): void {
    const updateNoti = document.querySelector(".noti-list") as HTMLElement;
    const notifications = JSON.parse(
      localStorage.getItem("users") || "{}"
    ).notifications;
    const notiList = notifications
      .map((noti: string) => `<p class="noti-para">${noti}</p>`)
      .join("");
    updateNoti && (updateNoti.innerHTML = notiList);
  }

  // private debounce<T extends (...args: any[]) => void>(
  //   func: T,
  //   delay: number
  // ): (...args: Parameters<T>) => void {
  //   let timeoutId: number;
  //   return (...args: Parameters<T>): void => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     timeoutId = window.setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // }

  // handleSearch(searchShoes: (name: string) => Promise<Shoes[]>): void {
  //   const searchIcon = document.getElementById("searchIcon") as HTMLElement;
  //   const searchBoxLayout = document.querySelector(
  //     ".header__search--input"
  //   ) as HTMLElement;
  //   const searchInput = document.getElementById(
  //     "searchInput"
  //   ) as HTMLInputElement;

  //   searchIcon.addEventListener("click", () => {
  //     searchBoxLayout.classList.toggle("show");
  //   });

  //   const debounceSearch = this.debounce(async (event: Event) => {
  //     const searchTerm = (event.target as HTMLInputElement).value.trim();
  //     const data = await searchShoes(searchTerm);
  //     this.updatePage(data);
  //   }, 500);

  //   searchInput.addEventListener("input", debounceSearch);
  // }

  logout(): void {
    const selects = document.querySelector(
      ".header__select"
    ) as HTMLSelectElement;
    selects?.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const { value } = target;

      if (value === "logout") {
        localStorage.removeItem("users");
        window.location.pathname = "/login";
      }

      if (value === "changePassword") {
        window.location.pathname = "/change-password";
      }
    });
  }
}
export default ProductsView;
