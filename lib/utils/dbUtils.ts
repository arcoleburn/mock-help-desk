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
  return user;
};

const doesUsernameExist = async (name: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  return !!user; // Returns true if user exists, false otherwise
};

const doesPasswordMatch = async (
  name: string,
  password: string
): Promise<boolean> => {
  // Find the user by username
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  // If user not found or password doesn't match, return false
  if (!user || user.password !== password) {
    return false;
  }

  // Password matches
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
return res
};
export { getUserInfo, doesPasswordMatch, doesUsernameExist, addNewTicket };
