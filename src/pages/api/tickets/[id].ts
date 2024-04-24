import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const { id } = req.query;
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        status: true,
        reporter: {
          select: {
            name: true,
            email: true,
          },
        },
        responder: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });

    return res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
