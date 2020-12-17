import { Request, Response, Router } from 'express';
import { IStorageService } from '../service/IStorageService';
import { Video } from '../data/Video';
import { ApiStatus } from './ApiStatus';
import { v4 as uuid } from 'uuid';

export default (router: Router, videoService: IStorageService<Video>) => {

    const requestHandler = (handler: (req: any, res: Response) => Promise<any>) => {
        return async (req: any, res: Response) => {
            handler(req, res)
                .then((result: any) => res.json(result))
                .catch((reason: any) => res.status(reason.statusCode || ApiStatus.INTERNAL_ERROR).send(reason.message))
        };
    }

    router.get('/video', async (req: Request, res: Response) => {
        res.json(await videoService.findAll());
    });

    router.post('/upload', requestHandler(async (req: Request, res: Response) => {
        if (!req.files || !req.files.file) {
            return res.status(ApiStatus.VALIDATION_ERROR).send('no file provided')
        }

        const id = uuid();
        return videoService.save({
            id,
            url: `${id}.mp4`,
            title: req.body.videoTitle,
            description: req.body.videoDesc
        }, req.files.file);
    }));

    router.delete('/delete/:id', requestHandler((req: Request) =>
        videoService.delete(req.params.id)));
}
