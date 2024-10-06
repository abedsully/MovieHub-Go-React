import { useEffect, useState } from "react";
import IMovie from "../../interfaces/IMovie";
import axios from "axios";
import { API_Tmdb } from "../../constant/Api";
import CardComponent from "../card-component/CardComponent";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const response = await axios.get(API_Tmdb.upcomingMovies);
      setMovies(response.data.results.splice(0, 6));
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <CardComponent key={movie.id} movie={movie} size="large" upcoming={true} />
        ))}
      </div>
    </>
  );
};

export default UpcomingMovies;