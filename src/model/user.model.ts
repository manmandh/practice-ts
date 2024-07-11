import randomID from "../helper/id";
import { IUser } from "../resources/types/user";

class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  notifications: string[];

  constructor({
    firstName,
    lastName,
    email,
    password,
    notifications = [],
  }: IUser) {
    this.id = randomID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.notifications = notifications;
  }
}

export default User;
