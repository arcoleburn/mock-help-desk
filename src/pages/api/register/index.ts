import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const { userName, email, password, isAdmin } = req.body;

  const result = await prisma.user.create({
  data:{
    name: userName,
    password: password,
    email: email,
    isAdmin: isAdmin,
  }
})
  res.json(result);
}