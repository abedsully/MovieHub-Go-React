export const api = "http://localhost:8080";

export const ApiMovieHub = {
    register: `${api}/auth/register`,
    login: `${api}/auth/login`,
    currentUser: `${api}/auth/current_user`,
    logout: `${api}/auth/logout`,
}

export const tmdbAPI = "https://api.themoviedb.org/3";
export const tmdbAPIImage = "https://image.tmdb.org/t/p/w500/"

export const tmbdAPIKey = import.meta.env.VITE_API_KEY

export const API_Tmdb = {
    trendingMovie: `${tmdbAPI}/trending/movie/day?api_key=${tmbdAPIKey}`,
}
