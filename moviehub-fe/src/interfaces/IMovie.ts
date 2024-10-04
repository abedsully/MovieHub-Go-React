import IGenre from "./IGenre";

interface IMovie {
    genres: IGenre[];
    overview: string;
    id: number;
    title: string;
    name?: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number; 
    vote_average: number;
    media_type: string;
}

export default IMovie