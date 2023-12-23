import { faker } from '@faker-js/faker';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();
const createProducts = async (quantity: number) => {
  const products: Product[] = [];
  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName();

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        images: faker.image.url(),
        quantity: parseInt(faker.commerce.price()),
      },
    });
    products.push(product);
    console.log(product);
  }
  console.log(`length ${products.length}`);
};

async function main() {
  await createProducts(10);

  console.log();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
