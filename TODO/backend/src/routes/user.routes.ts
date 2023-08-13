import { Router } from 'express';
import { newUser, login, findAllUser } from '../controllers/user.controller';

const router = Router();

router.post('/', newUser);
router.post('/login', login);
router.get('/', findAllUser);

export default router;
