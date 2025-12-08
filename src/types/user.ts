export interface User {
  id: string;
  username: string;
  email: string;
}

type UserRegisterBase = Omit<User, "id">;

export interface UserRegister extends UserRegisterBase {
  password: string;
}

type UserLoginBase = Omit<User, "id" | "username">;

export interface UserLogin extends UserLoginBase {
  password: string;
}
