interface IComment {
    id: string;
    movieId: number;
    userId: string;
    comment: string;
    dateInputted: string;
    limit?: number;
}

export default IComment