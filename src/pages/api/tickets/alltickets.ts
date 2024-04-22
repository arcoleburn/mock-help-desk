import prisma from "../../../../lib/prisma";

export default async function handle(req, res){
  
  const result = await prisma.ticket.findMany()

  res.json(result)
}