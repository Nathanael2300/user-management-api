import { faker } from "@faker-js/faker";

export default function userFactory() {
  return {
    username: faker.internet.username(),
    nickname: faker.internet.username(),
    profilePicture: faker.image.avatar(),
    bio: faker.lorem.sentence(),

    phoneNumber: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    },
    website: faker.internet.url(),
    socialLinks: [
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
    ],
  };
}
