import { Request, Router, Response } from 'express';
import { StorageService } from '../../service/StorageService';

export function handler(router: Router, videoService: StorageService) {
    router.get('/video', async (req: Request, res: Response) => {
        res.json(await videoService.findAll());
    });
}
