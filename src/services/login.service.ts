import config from "../api/config";
import { IUser } from "../resources/types/user";
import { Service } from "../utils/common";

class LoginService extends Service {
  constructor() {
    super();
  }

  async getUser(
    email: string,
    password: string
  ): Promise<Partial<IUser> | null> {
    try {
      const res = await config.get("/users", {
        params: {
          email,
          password,
        },
      });
      const data = res.data[0];

      if (data && data.email === email && data.password === password) {
        const { ...otherData } = data;
        return otherData;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default LoginService;
