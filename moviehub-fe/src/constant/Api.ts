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

    // Area API Trending Movies/Series/People
    trendingMovie: `${tmdbAPI}/trending/all/day?api_key=${tmbdAPIKey}`,

    // Area API Search Movies/Series/People
    searchMulti: (category: string) => {
        return `${tmdbAPI}/search/${category}?api_key=${tmbdAPIKey}`
    },

    // Area API Detail Movies/Series/People
    detail: (category: string, id: number) => {
        return `${tmdbAPI}/${category}/${id}?api_key=${tmbdAPIKey}`
    }
}
