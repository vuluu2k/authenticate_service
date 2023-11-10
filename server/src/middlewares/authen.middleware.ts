import { Response, Request } from "express"
import jwt from "jsonwebtoken";

const authenToken = (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    console.log(req.headers);

    const token = authorizationHeader?.split(' ')[1];
    console.log(token);
    if (!token) res.status(401);
    const data = jwt.verify(`${token}`, `${process.env.ACCESS_TOKEN_SECRET}`);
    res.status(200).json({ message: "success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messager: "Fail" });
  }
}
export default authenToken;