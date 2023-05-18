export class UsersDto {
    constructor(user) {
      this.name = user.name;
      this.last_name = user.last_name;
      this.full_name = `${user.name} ${user.last_name}`;
      this.email = user.email;
      this.age = user.age;
      this.role = user.role;
      this.cart = user.cart;
    }
  }

// export const usersDto = new UsersDto()