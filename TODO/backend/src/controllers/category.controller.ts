import { Request, Response } from 'express';

import CategoryService from '../services/category.service';
const categoryService = new CategoryService();

export const create = async (req: Request, res: Response) => {
  const { description } = req.body;
  const { username } = req.user;

  try {
    const response = await categoryService.create(username, description);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const findAllByUser = async (req: Request, res: Response) => {
  const { username } = req.user;

  try {
    const response = await categoryService.findAllByUser(username);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
export const findById = async (req: Request, res: Response) => {
  const { username } = req.user;
  const { id } = req.params;
  try {
    const response = await categoryService.findById(username, id);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
export const update = async (req: Request, res: Response) => {
  // const { title, description } = req.body;
  const body = req.body;
  const { id } = req.params;
  const { username } = req.user;

  console.log('Update michael ');
  try {
    const response = await categoryService.update(username, id, body);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const _delete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.user;

  console.log('Update michael ');
  try {
    const response = await categoryService._delete(username, id);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
