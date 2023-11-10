import { Request, Response } from 'express';
import userModel from '../models/user.model';
import jwt from "jsonwebtoken";

class AuthenticatedClass {
  async register(req: Request, res: Response) {
    try {
      const { redirect_url } = req.query;
      const { username, password, email, last_name, first_name, phone_number } =
        req.body;
      const userExisting = await userModel.findOne({ username });
      const emailExisting = await userModel.findOne({ email });
      if (userExisting && emailExisting)
        return res.status(400).json({ success: false, message: 'Username or email already exists' });

      const passwordHash = await Bun.password.hash(password);

      const data_created = {
        username,
        password: passwordHash,
        email,
        last_name,
        first_name,
        phone_number,
      };

      const result = await userModel.create(data_created)
      //@ts-ignore
      delete result.password
      //@ts-ignore
      const accessToken = result.jwt(result._doc).access_token
      res.redirect(`${redirect_url}?jwt=${accessToken}`);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { redirect_url, rule } = req.query;
      const { username, password } = req.body;
      //Kiểm tra tài khoản có tồn tại trong DB 
      const select_rule = rule + ' password'
      const account = await userModel.findOne({ username }).select(select_rule);

      if (!account) {
        return res.status(404).json({ message: 'Account is not available' })
      }
      const isPasswordValid = await Bun.password.verify(password, account.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      //@ts-ignore
      delete account._doc.password

      //@ts-ignore
      const { access_token, refresh_token } = rule ? account.jwt(account._doc) : account.jwt();

      //@ts-ignore
      return res.redirect(`url=${redirect_url}jwt=${access_token}&rjwt=${refresh_token}`);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async logout(req: Request, res: Response) {
    const accessToken = req.body.token;
    if (!accessToken) res.status(403).json({ message: 'you must be logged in' });
    await userModel.updateOne({ access_token: " " });
    res.status(200).json({ message: 'logout successfully' });
  }

  async refresh(req: Request, res: Response) {
    try {
      const refresh_token = req.body.token;
      if (!refresh_token) res.status(401);
      // const check_refresh_token = await userModel.findOne(refresh_token)
      // if (!check_refresh_token) res.status(403);
      jwt.verify(`${refresh_token}`, `${process.env.REFRESH_TOKEN_SECRET}`, function (err: any, data: any) {
        console.log(data);
        if (err) res.status(err);
        const access_token = jwt.sign({ _id: data._id, fullname: data.fullname },
          process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: (1 * 60 * 60 * 1000) });
        res.status(200).json({ message: "success", access_token });
      });
    } catch (error) {
      res.status(401).json({ messager: error });
    }
  }
}

export default new AuthenticatedClass();
