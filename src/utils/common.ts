export class View {
  constructor(...params: string[]) {
    console.log("View initialized with params:", params);
  }
}

export class Service {
  constructor() {
    console.log("Service initialized");
  }
}

export class Controller {
  constructor() {}
}
