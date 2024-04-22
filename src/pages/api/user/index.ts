import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const { name } = req.body;

  const user = await prisma.user.findUnique({
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

  if (user) {
    return res.status(200).json({ user });
  }
  else{
    return res.status(400).json({message: 'No user found'})
  }
}
