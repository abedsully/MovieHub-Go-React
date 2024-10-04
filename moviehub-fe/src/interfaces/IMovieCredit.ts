import IPeople from "./IPeople";

interface IMovieCredit {
    id: string;
    cast: IPeople[];
    crew: IPeople[];
}

export default IMovieCredit