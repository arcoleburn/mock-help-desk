import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const { userName, email, password, isAdmin } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        name: userName,
        password: password,
        email: email,
        isAdmin: isAdmin,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
