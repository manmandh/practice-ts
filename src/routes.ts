type RouteConfig = {
  path: string;
  element:
    | string
    | HTMLElement
    | ((params: { [key: string]: string }) => string | HTMLElement);
  controller: () => void;
  view: () => void;
  service: () => void;
  params: string[];
  pattern: RegExp;
};

class Router {
  routes: RouteConfig[];
  currentRoute: RouteConfig | null;

  constructor() {
    this.routes = [];
    this.currentRoute = null;
  }

  // Define a new route with a regular expression pattern
  define(
    path: string,
    element:
      | string
      | HTMLElement
      | ((params: { [key: string]: string }) => string | HTMLElement),
    controller: () => void,
    view: () => void,
    service: () => void,
    params: string[] = []
  ): void {
    // Convert path to a regex pattern
    const pattern = new RegExp(
      "^" + path.replace(/:[^\s/]+/g, "([\\w-]+)") + "$"
    );

    // Store route with pattern and element
    this.routes.push({
      path,
      element,
      controller,
      view,
      service,
      params,
      pattern,
    });
  }

  // Listen for changes in the URL
  listen(): void {
    const path = window.location.pathname;

    // Find matching route
    const route = this.findRoute();

    if (route) {
      const params = this.extractParams(path, route.pattern, route.params);
      const element =
        typeof route.element === "function"
          ? route.element(params)
          : route.element;

      const root = document.getElementById("root");

      if (root) {
        root.innerHTML = "";

        if (typeof element === "string") {
          root.innerHTML = element;
        } else {
          root.appendChild(element);
        }
      } else {
        console.error("Root element not found.");
      }
    } else {
      console.error("No matching route found.");
    }
  }

  findRoute(): RouteConfig | undefined {
    const path = window.location.pathname;
    return this.routes.find((route) => route.pattern.test(path));
  }

  // Extract parameters from the path
  extractParams(
    path: string,
    pattern: RegExp,
    paramNames: string[]
  ): { [key: string]: string } {
    const matches = path.match(pattern);
    const params: { [key: string]: string } = {};

    if (matches && paramNames.length === matches.length - 1) {
      paramNames.forEach((name, index) => {
        params[name] = matches[index + 1];
      });
    }

    return params;
  }
}

export default Router;
