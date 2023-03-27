import User from "../model/User.js";
import { obtainToken } from "../utilis/obtainTokenFromHeader.js";
import { verifyToken } from "../utilis/verifyToken.js";



// Authenticate JWT token
export const isAdmin = async (req, res, next)=> {
  const token = obtainToken(req);
  const userDecoded = verifyToken(token);

  req.userAuth = userDecoded.id;

  //Find the user
  const findUser = await User.findById(userDecoded.id);
  if (!findUser.isAdmin){
    return res.json({
        status: 'error',
        message:"Access Denied"
    })
  }else{
      next();
  }
}