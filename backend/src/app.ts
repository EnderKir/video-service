import express, { NextFunction } from 'express';
import http from 'http';
import config from 'config';
import path from 'path';
import fileUpload from 'express-fileupload';
import videoApi from './api/VideoApi';
import { logger } from './logger';
import { config as conf } from 'dotenv';
import { Request, Response } from 'express-serve-static-core';
import { ApiStatus } from './api/ApiStatus';
import { DbService } from './service/DbService';
// @ts-ignore
import { sequelize } from './orm';
import { CacheServiceProxy } from './service/CacheServiceProxy';
// @ts-ignore
import { UploadManger } from './service/FileUploadManager';
import cors from 'cors';

conf();

const app = express();

app.use(express.json());
app.use(fileUpload());

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3000',
  preflightContinue: false,
};

// @ts-ignore
app.use(cors(options));

app.use((req, res, next) => {
  logger.debug('HTTP:' + req.originalUrl);
  next();
});

const router = express.Router();

const videoService = new CacheServiceProxy(new DbService(sequelize, new UploadManger()));
videoApi(router, videoService);

app.use(router);

const port = process.env.PORT || config.get('default.port');

app.use(express.static(path.dirname(config.get('storage.filePath'))));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(err.statusCode || ApiStatus.INTERNAL_ERROR).json({
      status: err.status || 'error',
      message: err.message
    });
  }
  next();
});

const server = http.createServer(app);
server.listen(port, () => logger.info(`Simple Youtube app listening at http://localhost:${port}`));

export { app };
