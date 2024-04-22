import prisma from '../../../../lib/prisma';

// POST /api/register
// Required fields in body: title
// Optional fields in body: content

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

  // const result = await prisma.post.create({
  //   data: {
  //     title: title,
  //     content: content,
  //     author: { connect: { email: session?.user?.email } },
  //   },
  // });
  res.json(result);
}