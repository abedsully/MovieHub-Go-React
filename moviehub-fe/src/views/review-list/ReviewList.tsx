import { useEffect, useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { API_Tmdb } from "../../constant/Api";
import { convertIdToInt } from "../../utils/utils";
import axios from "axios";
import IMovie from "../../interfaces/IMovie";
import Comments from "../../component/comment/Comments";
import MediaTypes from "../../constant/MediaTypesEnum";

const ReviewList = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<IMovie | undefined>(undefined);
  const movieId = convertIdToInt(typeof id === "string" ? id : "");

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        const movieResponse = await axios.get(
          `${API_Tmdb.detail(MediaTypes.MOVIE, movieId)}`
        );
        setMovieDetail(movieResponse.data);

      } catch (error) {
        console.error("Error fetching casts");
      }
    };

    fetchReviewList();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{movieDetail?.title ?? "MovieHub"}'s Reviews</title>
      </Helmet>

      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>

      <div className="flex flex-col lg:flex-row items-start p-4 gap-[5rem] mt-[2rem] lg:ml-[8rem]">
        {movieDetail && movieDetail.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className="rounded-lg mr-4 mt-[2rem] lg:mt-[0rem]"
          />
        )}

        <div className="flex flex-col lg:w-[30rem] w-[20rem]">
          <h1 className="text-white mb-4 text-xl text-start">
            Review Lists:
          </h1>
          <Comments movieId={movieId}/>
        </div>
      </div>
    </>
  );
};

export default ReviewList;