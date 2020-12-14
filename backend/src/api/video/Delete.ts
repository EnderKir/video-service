import { Router, Response } from 'express';
import { IStorageService } from '../../service/IStorageService';

export function handler(router: Router, videoService: IStorageService) {
    router.delete('/delete/:id', async (req: any, res: Response) => {
        return videoService.delete(req.params.id)
            .then((video) => res.json(video))
            .catch((reason) => res.status(reason.statusCode).send(reason.message));
    });
}
