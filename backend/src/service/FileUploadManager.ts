import path from 'path';
import config from 'config';
import fs from 'fs/promises';
import { logger } from '../logger';
import { IUploadManger } from './IUploadManager';

export class UploadManger implements IUploadManger {
    public static readonly PATH = 'storage.filePath';

    constructor() {
        UploadManger.createDir(path.dirname(config.get(UploadManger.PATH)));
    }

    public async delete(videoUrl: string): Promise<void> {
        return fs.unlink(UploadManger.getPathToVideoFile(videoUrl));
    }

    public async save(videoUrl: string, file: any): Promise<void> {
        return new Promise((resolve, reject) => {
            file.mv(UploadManger.getPathToVideoFile(videoUrl), (err: any) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            })
        });
    }

    private static async createDir(p: string): Promise<void> {
        await fs.mkdir(p, {recursive: true});
        logger.debug(`path created: ${p}`);
    }

    private static getPathToVideoFile(videoUrl: string) {
        return path.join(path.dirname(config.get(UploadManger.PATH)), videoUrl);
    }
}
