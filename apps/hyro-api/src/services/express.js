import express from 'express';
import cors from 'cors';

import configs from '../configs';
import api from '../api';
import { errorHandler } from '../middlewares';

export default (app) => {
  app.use(cors({ origin: configs.authorizedUrls.split(','), credentials: true }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(api);
  app.use('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: \n');
  });

  app.use(errorHandler);
};
