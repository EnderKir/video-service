

export interface IUploadManger {

    delete(videoUrl: string): Promise<void>;

    save(videoUrl: string, file: any): Promise<void>;
}
