import { Request, Response } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

class AuthenticatedClass {
  async register(req: Request, res: Response) {
    try {
      const { username, password, email, last_name, first_name, phone_number } =
        req.body;
      const userExisting = await userModel.findOne({ username });
      const emailExisting = await userModel.findOne({ email });
      if (userExisting && emailExisting)
        return res.status(400).json({
          success: false,
          message: "Username or email already exists",
        });

      const passwordHash = await Bun.password.hash(password);

      const data_created = {
        username,
        password: passwordHash,
        email,
        last_name,
        first_name,
        phone_number,
      };

      const result = await userModel.create(data_created);
      //@ts-ignore
      delete result._doc.password;
      //@ts-ignore
      const { access_token, refresh_token } = result.jwt(result._doc);
      return res.status(200).json({
        success: true,
        access_token,
        refresh_token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { rule } = req.query;
      const { username, password } = req.body;
      //Kiểm tra tài khoản có tồn tại trong DB
      const select_rule = rule + " password";
      const account = await userModel.findOne({ username }).select(select_rule);

      if (!account) {
        return res
          .status(404)
          .json({ success: false, message: "Account is not available" });
      }
      const isPasswordValid = await Bun.password.verify(
        password,
        account.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }
      //@ts-ignore
      delete account._doc.password;

      //@ts-ignore
      const { access_token, refresh_token } = rule
        ? //@ts-ignore
        account.jwt(account._doc)
        : //@ts-ignore
        account.jwt();

      //@ts-ignore
      return res.status(200).json({
        success: true,
        access_token,
        refresh_token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const userExisting = await userModel.findById(userId);
      if (!userExisting)
        return res.status(403).json({ message: "you must be logged in" });
      await userModel.updateOne({ refresh_token: " " });
      return res.status(200).json({ message: "logout successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  //dsa
  async refresh(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;
      if (!refresh_token) return res.status(401);
      const data: any = jwt.verify(
        refresh_token as string,
        process.env.REFRESH_TOKEN_SECRET as string
      );

      const userId: string = data._id;
      const userExisting = await userModel.findById(userId);

      const { access_token, refresh_token: new_refresh_token } =
        //@ts-ignore
        await userExisting.jwt(userExisting);
      return res.status(200).json({
        access_token,
        refresh_token: new_refresh_token,
      });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}

export default new AuthenticatedClass();
