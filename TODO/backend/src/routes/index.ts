// const express = require('express');
// // import express from 'express';

import express, { Application } from 'express';

import routesUser from './../routes/user.routes';
import routesCategory from './../routes/category.routes';
import routesNote from './../routes/note.routes';
import validateToken from './validate-token';

export const routerApi = (app: Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', routesUser);
  router.use('/categories', routesCategory);
  router.use('/notes', routesNote);
};
