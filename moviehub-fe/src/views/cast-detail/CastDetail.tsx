import { useEffect, useState } from "react";
import CastList from "../../component/cast-list/CastList";
import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { API_Tmdb } from "../../constant/Api";
import { convertIdToInt } from "../../utils/utils";
import axios from "axios";
import ICast from "../../interfaces/ICast";
import IMovie from "../../interfaces/IMovie";
import Enums from "../../constant/Enums";

const CastDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<IMovie | undefined>(undefined);
  const [movieCredit, setMovieCredit] = useState<ICast[]>([]);
  const movieId = convertIdToInt(typeof id === "string" ? id : "");

  useEffect(() => {
    const fetchMovieCasts = async () => {
      try {
        const movieResponse = await axios.get(
          `${API_Tmdb.detail(Enums.MediaTypes.MOVIE, movieId)}`
        );
        setMovieDetail(movieResponse.data);

        const movieCredits = await axios.get(
          `${API_Tmdb.credits(Enums.MediaTypes.MOVIE, movieId)}`
        );
        setMovieCredit(movieCredits.data.cast);
      } catch (error) {
        console.error("Error fetching casts");
      }
    };

    fetchMovieCasts();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>MovieHub</title>
      </Helmet>

      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>

      <div className="flex flex-col lg:flex-row items-start p-4 gap-[5rem] mt-[2rem] lg:ml-[8rem]">
        {movieDetail && movieDetail.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
            className="rounded-lg mr-4 mt-[2rem] lg:mt-[0rem]"
          />
        )}

        <div className="flex flex-col ml-[3rem]">
          <h1 className="text-white mb-4 text-xl text-start">
            Cast Lists:
          </h1>
          {movieCredit.length > 0 ? (
            <CastList cast={movieCredit} />
          ) : (
            <p className="text-white">No cast information available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CastDetail;