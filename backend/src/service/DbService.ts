import { Video } from '../data/Video';
import { IStorageService } from './IStorageService';
import { Sequelize } from 'sequelize-typescript';
import { logger } from '../logger';
import { DbVideo } from '../models/DbVideo';
// @ts-ignore
import { IUploadManger } from './IUploadManager';

export class DbService implements IStorageService<Video> {

  public constructor(
      private sequelize: Sequelize,
      private uploadManager: IUploadManger,
  ) {
  }

  public async findAll(): Promise<Video[]> {
    logger.debug('loading from db...');
    return DbVideo.findAll({raw: true});
  }

  public async save(video: Video, file: any): Promise<Video> {
    await new DbVideo(video).save();
    await this.uploadManager.save(video.url, file);

    return video;
  }

  public async delete(videoUrl: string): Promise<void> {
      await this.uploadManager.delete(videoUrl);
      await DbVideo.destroy({where: {url: videoUrl}});
  }
}
