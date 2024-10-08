import Enums from "./Enums";

export const api = "http://localhost:8080";

export const ApiMovieHub = {

    // Area API Authentication
    register: `${api}/auth/register`,
    login: `${api}/auth/login`,
    currentUser: `${api}/auth/current_user`,
    logout: `${api}/auth/logout`,

    // Area API Comments
    addComment: `${api}/comments/post-comment`,
    getComments: `${api}/comments`,
    getCommentsByUserId: (userId: string) => {
        return `${api}/comments/user/${userId}`
    },

    // Area API Favorite
    addFavorite: (movieId: number) => {
        return `${api}/favorite/add/${movieId}`
    }, 
    removeFavorite: (movieId: number) => {
        return `${api}/favorite/remove/${movieId}`
    }, 
    checkFavorite: (movieId: number) => {
        return `${api}/favorite/check/${movieId}`
    },

    // Area API User
    getUserByUserId: (userId: string) => {
        return `${api}/users/${userId}`
    },

    editProfile: (userId: string) => {
        return `${api}/users/edit/${userId}`
    },

    profileImage: `${api}/uploads/`
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

    combinedCredits: (person_id: string) => {
        return `${tmdbAPI}/${Enums.MediaTypes.PEOPLE}/${person_id}/combined_credits?api_key=${tmbdAPIKey}`
    },

    // Area API Get People's Tagged Images
    taggedImages: (person_id: number) => {
        return `${tmdbAPI}/${Enums.MediaTypes.PEOPLE}/${person_id}/tagged_images?api_key=${tmbdAPIKey}`
    }
}
