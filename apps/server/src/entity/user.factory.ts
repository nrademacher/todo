import { setSeederFactory } from "typeorm-extension";
import { User } from "./user.entity";

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.name.firstName("male");
  user.lastName = faker.name.lastName("male");
  user.email = faker.internet.email(user.firstName, user.lastName);

  return user;
});
