export const api = "http://localhost:8080";

export const ApiMovieHub = {
    register: `${api}/auth/register`,
    login: `${api}/auth/login`,
    currentUser: `${api}/auth/current_user`,
    logout: `${api}/auth/logout`,
    addPost: `${api}/post-comment`,
    getComments: `${api}/get-comments`,
    getUserByUserId: (userId: string) => {
        return `${api}/users/${userId}`
    },
}

export const tmdbAPI = "https://api.themoviedb.org/3";
export const tmdbAPIImage = "https://image.tmdb.org/t/p/w500/"

export const tmbdAPIKey = import.meta.env.VITE_API_KEY

export const API_Tmdb = {

    // Area API Trending Movies/Series/People
    trending: (category: string) => {
        return `${tmdbAPI}/trending/${category}/day?api_key=${tmbdAPIKey}`
    },

    // Area API Search Movies/Series/People
    searchMulti: (category: string) => {
        return `${tmdbAPI}/search/${category}?api_key=${tmbdAPIKey}`
    },

    // Area API Detail Movies/Series/People
    detail: (category: string, id: number) => {
        return `${tmdbAPI}/${category}/${id}?api_key=${tmbdAPIKey}`
    },

    // Area API Get Featured Videos Movies/Series
    videos: (category: string, id: number) => {
        return `${tmdbAPI}/${category}/${id}/videos?api_key=${tmbdAPIKey}`
    },

    // Area API Movie Credits Actor/Director
    credits: (category: string, id: number) => {
        return `${tmdbAPI}/${category}/${id}/credits?api_key=${tmbdAPIKey}`
    },

    // Area API Get Images
    images: (category: string, id: number) => {
        return `${tmdbAPI}/${category}/${id}/images?api_key=${tmbdAPIKey}`
    },

    // Area API Get Recommendations from Id - Movie, Sereis
    recommendation: (category: string, id: number) => {
        return `${tmdbAPI}/${category}/${id}/recommendations?api_key=${tmbdAPIKey}`
    },

    upcomingMovies: `${tmdbAPI}/movie/upcoming?api_key=${tmbdAPIKey}`,
}
