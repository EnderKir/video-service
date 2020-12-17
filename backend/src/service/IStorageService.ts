
export interface IStorageService<T> {
  findAll(): Promise<T[]>;

  save(video: T, file: any): Promise<T>;

  delete(videoUrl: string): Promise<void>;
}
