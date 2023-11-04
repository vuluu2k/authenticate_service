import { Request, Response } from 'express';
import userModel from '../models/user.model';

class AuthenticatedClass {
  async register(req: Request, res: Response) {
    try {
      const { username, password, email, last_name, first_name, phone_number } =
        req.body;

      const userExisting = await userModel.findOne({ username });
      if (userExisting)
        return res
          .status(400)
          .json({ success: false, message: 'Username already exists' });

      const passwordHash = await Bun.password.hash(password);

      const data_created = {
        username,
        password: passwordHash,
        email,
        last_name,
        first_name,
        phone_number,
      };

      await userModel.create(data_created);

      //@ts-ignore
      delete data_created.password;

      res.status(201).json({ success: true, data: data_created });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response) {
    res.json({ text: 'login' });
  }

  async logout(req: Request, res: Response) {
    res.json({ text: 'logout' });
  }
}

export default new AuthenticatedClass();
