export const toggleMenu = (): void => {
  const menuToggleButton = document.querySelector(
    ".menu-toggle"
  ) as HTMLElement;
  const nav = document.querySelector(".sidebar") as HTMLElement;
  menuToggleButton.onclick = () => {
    nav.classList.toggle("active");
  };
};
