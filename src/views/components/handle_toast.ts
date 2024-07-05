import Toast from "./toast";

export const removeToast = (toast: HTMLElement): void => {
  toast.classList.add("hide");
  if ((toast as { timeoutId?: number }).timeoutId)
    clearTimeout((toast as { timeoutId?: number }).timeoutId);
  setTimeout(() => toast.remove(), 500);
};

export const createToast = (
  type: "error" | "info" | "warning" = "error",
  msg: string = "Error: Fail to implement!"
): void => {
  const toastList = document.querySelector(
    ".notifications"
  ) as HTMLElement | null;
  if (!toastList) {
    console.error('Element with class "notifications" not found.');
    return;
  }

  const toast = document.createElement("li");
  toast.className = `toast ${type}`;
  toast.innerHTML = Toast(type, msg);

  toastList.appendChild(toast);
  (toast as { timeoutId?: number }).timeoutId = setTimeout(
    () => removeToast(toast),
    5000
  );
};
