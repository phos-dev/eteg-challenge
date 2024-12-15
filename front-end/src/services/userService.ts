import api from "./api";

export const createUser = (createUserDto: CreateUserDto) => {
  return api.post("/users", createUserDto);
};
