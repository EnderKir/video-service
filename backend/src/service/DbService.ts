import { Video } from '../model/Video';
import { StorageService } from "./StorageService";
import { Sequelize } from "sequelize-typescript";
import { logger } from '../logger';
import { DbVideo } from "./models/DbVideo";
import fs from "fs/promises";
import path from 'path';
import config from "config";

export class DbService implements StorageService {
  public static readonly PATH = 'storage.filePath';

  private data: Video[];
  private isDataLoaded = false;

  private sequelize: Sequelize;

  public constructor() {
    this.data = [];

    this.sequelize = new Sequelize({
      logging: logger.debug,
      dialect: 'sqlite',
      storage: config.get('storage.dbPath'),
      models: [__dirname + '/models']
    });

    this.sequelize.authenticate()
        .then(() => {
          logger.debug('Connection has been established successfully.')
          this.sequelize.sync({ force: true })
        })
        .catch((error) => logger.error('Unable to connect to the database:', error));
  }

  public async findAll(): Promise<Video[]> {
    return this.isDataLoaded ? this.data : this.load();
  }

  public async save(video: Video, file: any): Promise<Video> {
    await this.findAll();
    return this.saveUnsafe(video, file);
  }

  public async delete(videoId: number): Promise<Video> {
    const data = await this.findAll();
    const video: Video | undefined = data.find((v) => v.id === videoId);
    if (data && video) {
      await fs.unlink(this.getPathToVideoFile(videoId, path.extname(video.url)));
      this.data = data.filter((v) => v.id !== videoId);

      await DbVideo.destroy({
        where: {url: video.url}
      });

      return video;
    }

    return Promise.reject({statusCode: 404, message: `Video with id='${videoId}' not found`});
  }

  private async saveUnsafe(video: Video, file: any): Promise<Video> {
    if (this.data) {
      this.data.push(video);
    }

    const dbVideo = new DbVideo(video);
    await dbVideo.save();

    return new Promise((resolve, reject) => {
      file.mv(this.getPathToVideoFile(video.id, path.extname(file.name)),
          (err: any) => {
            if (err) {
              return reject(err);
            }

            return resolve(video);
          },
      )
    });
  }

  private getPathToVideoFile(videoId: number, extension: string) {
    return path.join(path.dirname(config.get(DbService.PATH)), videoId + extension);
  }

  private async createDir(p: string): Promise<void> {
    await fs.mkdir(p, {recursive: true});
    logger.debug(`path created: ${p}`);
  }

  private async load(): Promise<Video[]> {
    logger.debug('loading from db...');
    this.data = await DbVideo.findAll({raw:true});

    logger.debug('loaded:', this.data.length);
    this.isDataLoaded = true;
    return this.data;
  }
}
