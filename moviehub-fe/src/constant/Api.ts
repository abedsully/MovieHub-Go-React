export const api = "http://localhost:8080";

export const ApiMovieHub = {
    register: `${api}/auth/register`,
    login: `${api}/auth/login`,
    currentUser: `${api}/auth/current_user`,
    logout: `${api}/auth/logout`,
}