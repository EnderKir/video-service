import { Video } from '../data/Video';

export interface IStorageService {
  findAll(): Promise<Video[]>;

  save(video: Video, file: any): Promise<Video>;

  delete(videoId: number): Promise<Video>;
}
