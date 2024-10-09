import MediaTypes from "../constant/MediaTypesEnum";

interface IComment {
    id: string;
    movieId: number;
    userId: string;
    comment: string;
    dateInputted: string;
    limit?: number;
    type: MediaTypes;
}

export default IComment