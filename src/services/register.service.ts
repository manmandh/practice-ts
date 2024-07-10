import config from "../api/config";
import User from "../model/user.model";
import { Service } from "../utils/common";

class RegisterService extends Service {
  constructor() {
    super();
  }

  async addUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const newUser = new User({ firstName, lastName, email, password });
      console.log(newUser);
      await config.post("/users", newUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default RegisterService;
