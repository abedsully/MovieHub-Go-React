import axios from "axios";
import { useEffect, useState } from "react";
import { API_Tmdb, ApiMovieHub, tmdbAPIImage } from "../../constant/Api";
import { Link, useParams } from "react-router-dom";
import IFavorite from "../../interfaces/IFavorite";
import MediaTypes from "../../constant/MediaTypesEnum";
import IMovie from "../../interfaces/IMovie";
import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png"


const FavoritePage = () => {
  const [favorite, setFavorite] = useState<IFavorite[]>([]);
  const [mediaDetails, setMediaDetails] = useState<{ [key: number]: IMovie }>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchFavoriteMovie = async () => {
      try {
        const response = await axios.post(
          ApiMovieHub.getFavoriteByUserId,
          { user_id: id },
          { withCredentials: true }
        );

        const mediaMap = new Map<number, MediaTypes>();

        response.data.forEach((favorite: IFavorite) => {
          mediaMap.set(favorite.movie_id, favorite.type);
        });

        const mediaDetailsPromises = Array.from(mediaMap.keys()).map(
          async (id) => {
            const mediaType = mediaMap.get(id);
            const mediaResponse = await axios.get(
              `${API_Tmdb.detail(mediaType!, id)}`
            );
            return { id, data: mediaResponse.data };
          }
        );

        const mediaDetailsArray = await Promise.all(mediaDetailsPromises);
        const mediaDetailsMap = mediaDetailsArray.reduce(
          (acc, { id, data }) => {
            acc[id] = data;
            return acc;
          },
          {} as { [key: number]: IMovie }
        );

        setMediaDetails(mediaDetailsMap);
        setFavorite(response.data);
      } catch {
        console.error("failed to fetch favorite movie");
      }
    };

    fetchFavoriteMovie();
  }, [id]);

  return (
    <>
      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>
    <h3 className="text-center text-white mt-[2rem]">Favorite Movie Lists</h3>
      <div className="lg:ml-[17rem] text-white mt-[2rem]">
        <div className="grid grid-cols-3 gap-[4rem] w-full">
          {favorite.map((fav) => {
            const movie = mediaDetails[fav.movie_id];
            return movie ? (
              <Link to={`/${fav.type}/${movie.id}`}>
              <div key={fav.movie_id} className="text-center">
                <img
                  src={`${tmdbAPIImage}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-72 h-auto object-cover"
                />
                <h4 className="text-center mt-4">{movie.title ?? movie.name}</h4>
              </div>
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
