import {
  doesPasswordMatch,
  doesUsernameExist,
  getUserInfo,
} from "../../../../lib/utils/dbUtils";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const { name, password } = req.body;
  try {
    const validUser = await doesUsernameExist(name);
    const passwordMatch = await doesPasswordMatch(name, password);

    if (validUser && passwordMatch) {
      const user = await getUserInfo(name);
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ error: "invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    await prisma.$disconnect(); 
  }
}
