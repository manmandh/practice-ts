export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  notifications?: string[];
}

export type AddUserFunction = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => Promise<void>;
