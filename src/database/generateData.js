const faker = require("faker");
const fs = require("fs");

const products = [];

for (let i = 0; i < 100; i++) {
  const generateData = {
    id: faker.random.uuid(),
    name: faker.name.jobTitle(),
    price: faker.random.number(),
    description: faker.name.jobDescriptor(),
    product: faker.name.lastName(),
    color: faker.name.firstName(),
    createAt: faker.date.recent(),
    image: faker.image.imageUrl(),
  };
  products.push(generateData);
}

fs.writeFileSync("./products.json", JSON.stringify(products));
