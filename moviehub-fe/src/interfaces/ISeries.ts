import IGenre from "./IGenre";
import IProductCompanies from "./IProductionCompanies";
import ISeason from "./ISeason";

interface ISeries {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    media_type: string;
    vote_average: number;
    overview: string;
    genres: IGenre[];
    production_companies: IProductCompanies[];
    homepage: string;
    seasons: ISeason[];
}

export default ISeries