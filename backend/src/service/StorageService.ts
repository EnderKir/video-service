import { Video } from '../model/Video';

export interface StorageService {
  findAll(): Promise<Video[]>;

  save(video: Video, file: any): Promise<Video>;

  delete(videoId: string): Promise<Video>;
}
