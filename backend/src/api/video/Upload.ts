import { Router, Response } from 'express';
import { StorageService } from '../../service/StorageService';
import { v4 as uuid } from 'uuid';
import { ApiStatus } from '../ApiStatus';
import {logger} from "../../logger";

export function handler(router: Router, videoService: StorageService) {
    router.post('/upload', async (req: any, res: Response) => {
        if (!req.files || !req.files.file) {
            return res.status(ApiStatus.VALIDATION_ERROR).send('no file provided')
        }

        const id = uuid();
        return videoService.save({
            id,
            url: `${id}.mp4`,
            title: req.body.videoTitle,
            description: req.body.videoDesc
        }, req.files.file)
            .then((video) => res.json(video))
            .catch((reason) => res.status(reason.statusCode || ApiStatus.INTERNAL_ERROR).send(reason.message));
    });
}
