import { IStorageService } from './IStorageService';


export class CacheServiceProxy<T extends {url: string}> implements IStorageService<T> {

    private data: Map<string, T> = new Map<string, T>();
    private isDataLoaded = false;

    public constructor(
        private originalService: IStorageService<T>) {
    }

    async delete(videoUrl: string): Promise<void> {
        if (this.isDataLoaded && this.data.has(videoUrl)) {
            this.data.delete(videoUrl);
        }

        return this.originalService.delete(videoUrl);
    }

    async findAll(): Promise<T[]> {
        if (!this.isDataLoaded) {
            const all = await this.originalService.findAll();
            this.data = new Map<string, T>(all.map(v => [v.url, v])) ;
        }

        return Array.from(this.data.values());
    }

    async save(video: T, file: any): Promise<T> {
        if (this.isDataLoaded) {
            this.data.set(video.url, video);
        }
        return this.originalService.save(video, file);
    }
}
