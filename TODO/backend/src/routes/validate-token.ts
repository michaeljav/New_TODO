import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import sequelize from '../db/connection/connectionSequelize';

//middleware
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers['authorization'];

  // console.log('token MICHAEL  ', headerToken);

  //si no lo envian el token
  if (headerToken === undefined) {
    return res.status(401).json({ msg: 'Acceso denegado' });
  }
  //si no conmienza con Bearer
  if (!headerToken.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Acceso denegado' });
  }
  //si la variable no es mayor de 7 no contiene el hash del token
  if (!(headerToken.length > 7)) {
    return res.status(401).json({ msg: 'Acceso denegado' });
  }

  try {
    // tiene Token desde el caracter 7 en adelante
    const bearerToken = headerToken.slice(7);

    const decoded = jwt.verify(bearerToken, config.jwtSecretKey);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Acceso denegado ' });
  }
};

export default validateToken;
