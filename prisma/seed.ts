export {};

import { PrismaClient, Priority, Status } from '@prisma/client';
import seedData from './seedData.json';


 const prisma = new PrismaClient()

async function seedDatabase() {
  const { users, admins, tickets } = seedData;


  // Create users
  await prisma.user.createMany({ data: users });

  // Create admins
  await prisma.user.createMany({ data: admins });

  // Map ticket data to use enum values
  const mappedTickets = tickets.map((ticket) => ({
    ...ticket,
    priority: ticket.priority as Priority, // Cast priority to Priority enum
    status: ticket.status as Status, // Cast status to Status enum
  }));

  // Create tickets
  await prisma.ticket.createMany({
    data: mappedTickets,
  });

  console.log("Seed data created successfully!");
}

seedDatabase()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });