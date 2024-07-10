import TableBody from "./table_row";

const ShoesTable = (): string => {
  return `
    <div class="table-title">
      <p>Recent Purchases </p>
    </div>
    <div class="table-content">
      <table>
          <thead>
            <tr>
              <td><input id="input" type="checkbox" /></td>
              <td>Product</td>
              <td>SKU ID</td>
              <td>Amount</td>
              <td>Category</td>
              <td>Brand</td>
              <td>Status</td>
              <td>Regular Price</td>
            </tr>
          </thead>
          <tbody>
            ${TableBody()}
          </tbody>
      </table>
    </div>
  `;
};

export default ShoesTable;
