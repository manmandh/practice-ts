function Toast(type: "error" | "info" | "warning", msg: string): string {
  const icons: { [key: string]: string } = {
    error: "ti-na",
    info: "ti-info-alt",
    warning: "ti-alert",
  };

  const icon = icons[type];

  return `
    <div class="column">
      <i class="${icon}"></i>
      <span>${msg}</span>
    </div>
    <i class="ti-close"></i>
  `;
}

export default Toast;
