import { Router } from 'express';
import {
  create,
  findAllByUser,
  update,
  _delete,
  findById,
  findAllByUserAchived,
} from '../controllers/note.controller';
import validateToken from './validate-token';

const router = Router();

router.post('/', validateToken, create);
router.get('/', validateToken, findAllByUser);
router.get('/findAllByUserAchived', validateToken, findAllByUserAchived);
router.get('/:id', validateToken, findById);
router.put('/:id', validateToken, update);
router.delete('/:id', validateToken, _delete);

export default router;
