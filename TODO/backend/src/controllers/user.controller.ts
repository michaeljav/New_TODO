import { Request, Response } from 'express';
import UserService from '../services/user.service';
const userService = new UserService();

export const newUser = async (req: Request, res: Response) => {
  // console.log(req.body);

  const { username, password } = req.body;

  try {
    const response = await userService.create(username, password);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // // console.log(req.body);
  console.log('MICHAEL USUARIO LOGGED IN ', req.user);
  console.log(username, password);
  try {
    const response = await userService.login(username, password);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const findAllUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // // console.log(req.body);
  console.log('MICHAEL USUARIO LOGGED IN ', req.user);
  console.log(username, password);
  try {
    const response = await userService.findAllUser(username);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
