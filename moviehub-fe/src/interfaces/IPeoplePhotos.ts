interface IBackdrop {
    file_path: string
}

interface IPeoplePhotos {
    id: number;
    profiles: IBackdrop[];
}

export default IPeoplePhotos