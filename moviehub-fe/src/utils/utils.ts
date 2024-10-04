export const getReleaseYear = (releaseDate: string): number => {
    return new Date(releaseDate).getFullYear();
  };
  
  export const convertDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} min`;
  };
  
  export const formatVoteAverage = (voteAverage: number): string => {
    return voteAverage.toFixed(1);
  };