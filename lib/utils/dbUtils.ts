import prisma from "../prisma";

const getUserInfo = async (name) => {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
    select: {
      name: true,
      id: true,
      isAdmin: true,
      email: true,
    },
  });
  await prisma.$disconnect();

  return user;
};

const doesUsernameExist = async (name: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  await prisma.$disconnect();

  return !!user; // Returns true if user exists, false otherwise
};

const doesPasswordMatch = async (
  name: string,
  password: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  await prisma.$disconnect();

  // If user not found or password doesn't match, return false
  if (!user || user.password !== password) {

    return false;
  }

  return true;
};

const addNewTicket = async (id, title, description, priority) => {
  const res = await prisma.ticket.create({
    data:{
      reporterId: id,
      title,
      description,
      priority,
    }
  })
  await prisma.$disconnect();

return res
};
export { getUserInfo, doesPasswordMatch, doesUsernameExist, addNewTicket };
