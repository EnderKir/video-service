import { Router, Response } from 'express';
import { StorageService } from '../../service/StorageService';

export function handler(router: Router, videoService: StorageService) {
    router.delete('/delete/:id', async (req: any, res: Response) => {
        return videoService.delete(req.params.id)
            .then((video) => res.json(video))
            .catch((reason) => res.status(reason.statusCode).send(reason.message));
    });
}
