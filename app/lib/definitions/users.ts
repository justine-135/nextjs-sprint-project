export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}
