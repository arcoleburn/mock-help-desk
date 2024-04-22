import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.ticket.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      priority: true,
      status: true,
      reporterId: true,
      responder: {
        select: {
          name: true,
        },
      },
      createdAt: true
    },
  });

  res.json(result);
}
