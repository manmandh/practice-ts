import Shoes from "../model/shoes.model";
import { View } from "../utils/common";
import TableBody from "./components/table_row";

class ProductsView extends View {
  constructor() {
    super();
  }

  bindTable(shoes: Shoes[]): void {
    const table = document.querySelector(".table-content table");
    if (!table) return;

    const tableBody = table.querySelector("tbody");
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
          return;
        }

        if (target.closest(".product-checkbox")) return;
        window.location.href = `/product/detail?productId=${productId}`;
      });
    });
  }
}

export default ProductsView;
