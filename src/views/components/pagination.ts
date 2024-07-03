const Pagination = () => {
  return `
    <div class="pagination">
      <button id="current">1</button>
      <button  class="hide">2</button>
      <button class="hide">3</button>
      <button class="hide">4</button>
      <button  class="hide">...</button>
      <button  class="hide">10</button>
      <button id= "next">
        <p>NEXT</p>
        <img src = "/chevron_forward.c5f0065d.svg"  alt="" />
      </button>
    </div>
  `;
};

export default Pagination;
