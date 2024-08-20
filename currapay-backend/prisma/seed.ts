import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Insert fake data into User Table
  for (let i = 0; i < 10; i++) { 
    const user = await prisma.user.create({
      data: {
        emailAddress: faker.internet.email(),
        country: faker.address.country(),
        city: faker.address.city(),
        age: faker.datatype.number({ min: 18, max: 99 }),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        occupation: faker.name.jobTitle(),
        nationality: faker.address.country(),
        deviceUsed: faker.vehicle.type(),
        internetAccess: faker.datatype.boolean(),
        mobilePenetration: parseFloat(faker.datatype.float({ min: 0, max: 1 }).toFixed(2)),
        accountCreationDate: faker.date.past().toISOString(),
      },
    });
    console.log('Inserted new user:', user);
  }

  // Insert fake data into Transaction Table
  for (let i = 0; i < 10; i++) { 
    const userId = faker.datatype.number({ min: 1, max: 10 }); 
    const transaction = await prisma.transaction.create({
      data: {
        userId: userId,
        amount: parseFloat(faker.finance.amount()),
        currency: faker.finance.currencyCode(),
        exchangeRate: parseFloat(faker.finance.amount()),
        fees: parseFloat(faker.finance.amount()),
        processingTime: faker.datatype.number({ min: 1, max: 120 }),
        transferMethod: faker.finance.transactionType(),
        purposeOfTransfer: faker.lorem.word(),
        status: faker.helpers.arrayElement(['Completed', 'Pending', 'Failed']),
        timestamp: faker.date.recent().toISOString(),
      },
    });
    console.log('Inserted new transaction:', transaction);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
