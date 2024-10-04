interface IBackdrop {
    file_path: string;
}

interface IPhotos {
    backdrops: IBackdrop[];
}

export default IPhotos;
