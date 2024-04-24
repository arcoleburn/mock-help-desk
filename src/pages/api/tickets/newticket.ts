import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const { userId, title, description, priority } = req.body;
  try {
    const result = await prisma.ticket.create({
      data: {
        reporterId: userId,
        title: title,
        description: description,
        priority: priority,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
