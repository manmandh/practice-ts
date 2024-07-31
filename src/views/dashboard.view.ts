import { View } from "../utils/common";
import { authen } from "../utils/authen";

class DashboardView extends View {
  constructor() {
    super();
    authen();
  }
}

export default DashboardView;
