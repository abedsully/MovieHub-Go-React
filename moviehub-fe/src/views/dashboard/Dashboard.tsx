import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_Tmdb, ApiMovieHub } from "../../constant/Api";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../component/card-component/CardComponent";
import Searchbar from "../../component/search-bar/Searchbar";
import IMovie from "../../interfaces/IMovie";

interface User {
  id: string;
  username: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(ApiMovieHub.currentUser, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            console.error("Unauthorized access. Redirecting...");
            navigate("/login");
          }
        }
      }
    };

    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(API_Tmdb.trendingMovie);
        setMovies(response.data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };

    fetchCurrentUser();
    fetchTrendingMovies();
  }, [navigate]);

  return (
    <>
      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>

      <div className="flex flex-col pt-4 2xl:w-[100rem] xl:ml-[16rem] px-[1rem] pr-[1rem] lg:px-[2.5rem] mb-10">
        {/* Search Bar */}
        <Searchbar />

        {/* Area Trending Movies */}
        <div className="flex flex-col mt-10 text-white">
          <h1 className="text-lg font-semibold">
            Trending Movies & Television Series
          </h1>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
            {movies.map((movie) => (
              <CardComponent key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
