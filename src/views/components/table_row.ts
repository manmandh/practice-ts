import { Product } from "../../resources/types/product";

const TableRow = (row: Product) => {
  return `
    <tr class="product-row" id="${row.id}">
      <td>
        <input type="checkbox" id="checkbox" class="product-checkbox" />
      </td>
      <td>${row.name}</td>
      <td>${row.id}</td>
      <td>${row.amount}</td>
      <td>${row.category}</td>
      <td class="row">
        <img src="${row.image}" alt="" />
        <p>${row.brand}</p>
      </td>
      <td>
        <div class="stock-wrapper">
          <span class="${row.status ? "stock" : "sold-out"}"></span>
          <p>${row.status ? "Stock" : "Sold out"}</p>
        </div>
      </td>
      <td>${row.price}</td>
    </tr>
  `;
};

const TableBody = (products: Product[] = []): string => {
  return `
    ${products.map((product) => TableRow(product)).join("")}
  `;
};

export default TableBody;
