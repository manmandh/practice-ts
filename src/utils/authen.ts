export const authen = () => {
  const user = localStorage.getItem("users");
  if (!user) {
    window.location.pathname = "/login";
  }
};
