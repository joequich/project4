export interface IFile {
    name: string;
}

export interface IUploadsService {
    uploadImage: (fileLocalPath: string) => Promise<string>;
    destroyImage: (fileCloudPath: string) => Promise<void> 
}