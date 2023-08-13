import { Request, Response } from 'express';

import NoteService from '../services/note.service';
const noteService = new NoteService();

export const create = async (req: Request, res: Response) => {
  // const { title, description } = req.body;
  const body = req.body;
  const { username } = req.user;

  try {
    const response = await noteService.create(username, body);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const findAllByUserAchived = async (req: Request, res: Response) => {
  const { username } = req.user;

  try {
    const response = await noteService.findAllByUserAchived(username);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
export const findAllByUser = async (req: Request, res: Response) => {
  const { username } = req.user;

  try {
    const response = await noteService.findAllByUser(username);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
export const findById = async (req: Request, res: Response) => {
  const { username } = req.user;
  const { id } = req.params;
  try {
    const response = await noteService.findById(username, id);
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
    const response = await noteService.update(username, id, body);
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
    const response = await noteService._delete(username, id);
    res.json(response);
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
};
