const SideBar = () => {
  return `
    <section class="sidebar active">
      <figure class="sidebar__logo">
        <img src="/logo.3e864662.svg" alt="" />
      </figure>

      <span class="menu-toggle">&equiv;</span>
      <div class="sidebar__menu">
        <a href="/dashboard" class="sidebar__menu--item">
          <img src="/dashboaard.6c717686.svg" alt="" class="icon" />
          <img class="icon white" src="/dashboard-white.c512d05a.svg" alt="" />
          <p>dashboard</p>
        </a>
        <a href="/product/all" class="sidebar__menu--item">
          <img src="/all-products.897c51a3.svg" alt="" />
          <img class="white" src="/all-products-white.3ef31713.svg" alt="" />
          <p>all products</p>
        </a>
        <a href="/product/table" class="sidebar__menu--item">
          <img src="/product-list.7f703628.svg" alt="" />
          <img class="white" src="/product-list-white.7a51d84c.svg" alt="" />
          <p>product list</p>
        </a>
      </div>

      <div class="sidebar__category">
        <h2>Categories</h2>
        <img src="/chevron_down-big.30530540.svg" alt="" />
      </div>
    </section>
  `;
};

export default SideBar;
