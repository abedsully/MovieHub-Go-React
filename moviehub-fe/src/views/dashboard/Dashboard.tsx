import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_Tmdb} from "../../constant/Api";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../component/card-component/CardComponent";
import IMovie from "../../interfaces/IMovie";
import IPeople from "../../interfaces/IPeople";
import ISeries from "../../interfaces/ISeries";
import PeopleComponent from "../../component/people-component/PeopleComponent";

const Dashboard = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [series, setSeries] = useState<ISeries[]>([]);
  const [people, setPeople] = useState<IPeople[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchTrendingMovies();
      await fetchTrendingSeries();
      await fetchTrendingPeople();
    };

    fetchData();
  }, [navigate]);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(API_Tmdb.trending("movie"));
      setMovies(response.data.results.slice(0, 6));
    } catch (error) {
      console.error("Error fetching trending movies", error);
    }
  };

  const fetchTrendingSeries = async () => {
    try {
      const response = await axios.get(API_Tmdb.trending("tv"));
      setSeries(response.data.results.slice(0, 6));
    } catch (error) {
      console.error("Error fetching trending tv series", error);
    }
  };

  const fetchTrendingPeople = async () => {
    try {
      const response = await axios.get(API_Tmdb.trending("person"));
      setPeople(response.data.results.slice(0, 8));
    } catch (error) {
      console.error("Error fetching trending people", error);
    }
  };

  return (
    <>
      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>

      <div className="flex flex-col pt-4 2xl:w-[100rem] xl:ml-[16rem] px-[1rem] pr-[1rem] lg:px-[2.5rem] mb-10">
        {/* Area Trending Movies */}
        <div className="flex flex-col mt-10 text-white">
          <h1 className="text-lg font-semibold">Trending Movies</h1>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
            {movies.map((movie) => (
              <CardComponent key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Area Trending Television Series */}
        <div className="flex flex-col mt-10 text-white">
          <h1 className="text-lg font-semibold">Trending Television Series</h1>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
            {series.map((series) => (
              <CardComponent key={series.id} movie={series} />
            ))}
          </div>
        </div>

        {/* Area Trending People */}
        <div className="flex flex-col mt-10 text-white">
          <h1 className="text-lg font-semibold">Trending People</h1>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mt-4">
            {people.map((person) => (
              <PeopleComponent key={person.id} people={person} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
