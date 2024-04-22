import prisma from "../../../../lib/prisma";
import { doesPasswordMatch, doesUsernameExist, getUserInfo } from "../../../../lib/utils/dbUtils";

export default async function handle(req, res){
  const{name, password} = req.body
  console.log('HERE', req.body)
  console.log('name from body', name)
  const validUser = await doesUsernameExist(name)
  const passwordMatch = await doesPasswordMatch(name, password)

  if(validUser && passwordMatch){
    const user = await getUserInfo(name)
    return res.status(200).json(user)
  }
  else{
    return res.status(401).json({error: 'invalid username or password'})
  }
}