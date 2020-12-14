import { Request, Router, Response } from 'express';
import { IStorageService } from '../../service/IStorageService';

export function handler(router: Router, videoService: IStorageService) {
    router.get('/video', async (req: Request, res: Response) => {
        res.json(await videoService.findAll());
    });
}
