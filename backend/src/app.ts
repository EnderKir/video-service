import express, {NextFunction} from 'express';
import http from 'http';
import config from 'config';
import path from 'path';
import fileUpload from 'express-fileupload';
import {videoDelete, videoList, videoUpload} from './api/video';
import {logger} from './logger';
import {config as conf} from 'dotenv';
import {Request, Response} from 'express-serve-static-core';
import {ApiStatus} from './api/ApiStatus';
import {DbService} from './service/DbService';
import cors from 'cors';

conf();

const app = express();
const server = http.createServer(app);

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

let videoService = new DbService();

const router = express.Router();

videoList(router, videoService);
videoUpload(router, videoService);
videoDelete(router, videoService);

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

server.listen(port, () => {
  logger.info(`Simple Youtube app listening at http://localhost:${port}`)
});

export { app };
