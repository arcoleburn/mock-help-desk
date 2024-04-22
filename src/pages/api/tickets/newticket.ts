import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const { userId, title, description, priority } = req.body;
  console.log(req.body)
console.log({ userId, title, description, priority });

  const result = await prisma.ticket.create({
    data: {
      reporterId: userId,
      title: title,
      description: description,
      priority: priority
    },
  });
  console.log({ result });
  res.json(result);
}
