import { Controller, Service, View } from "./utils/common";

export type RouteConfig = {
  path: string;
  element: string;
  params?: string[];
  controller: { new (): Controller };
  view: { new (): View };
  service: { new (): Service };
  pattern?: RegExp;
};

class Router {
  routes: RouteConfig[];
  currentRoute: RouteConfig | null;

  constructor() {
    this.routes = [];
    this.currentRoute = null;
  }

  // Define a new route with a regular expression pattern
  define(routerConfig: RouteConfig): void {
    // Convert path to a regex pattern
    const { path, element, controller, view, service, params } = routerConfig;
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
    // Find matching route
    const route = this.findRoute()!;
    const { controller } = route;

    if (route) {
      const root = document.querySelector("#root > .container")!;

      root.innerHTML = route.element;
      new controller();
      // const element =
      //   typeof route.element === "function"
      //     ? route.element(params)
      //     : route.element;

      // if (root) {
      //   root.innerHTML = "";

      //   if (typeof element === "string") {
      //     root.innerHTML = element;
      //   } else {
      //     root.appendChild(element);
      //   }
      // } else {
      //   console.error("Root element not found.");
      // }
    } else {
      console.error("No matching route found.");
    }
  }

  findRoute(): RouteConfig | undefined {
    const path = window.location.pathname;
    return this.routes.find((route) => route?.pattern?.test(path));
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
