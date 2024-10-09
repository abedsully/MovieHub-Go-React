import MediaTypes from "../constant/MediaTypesEnum";

interface IFavorite {
    id: string;
    user_id: string;
    movie_id: number;
    type: MediaTypes;
    dateInputted: string;
}

export default IFavorite