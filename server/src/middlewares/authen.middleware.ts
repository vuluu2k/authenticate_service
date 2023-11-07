import { Response, Request } from "express"
import jwt from "jsonwebtoken";

const authenToken = (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader?.split(' ')[1];
    if (!token) res.status(401);
    const data = jwt.verify(`${token}`, `${process.env.ACCESS_TOKEN_SECRET}`, function (err: any, data: any) {
      console.log(data) // bar
    });
    res.status(200).json({ message: "success", data });
  } catch (error) {
    res.status(500).json({ message: "fail" });
  }
}
export default authenToken;