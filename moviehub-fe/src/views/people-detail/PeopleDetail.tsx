import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_Tmdb } from "../../constant/Api";
import IPeople from "../../interfaces/IPeople";
import { convertIdToInt } from "../../utils/utils";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<IPeople>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieId = convertIdToInt(typeof id == "string" ? id : "")
        const response = await axios.get(`${API_Tmdb.detail("person", movieId)}`);
        setMovieDetail(response.data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetail) {
    return <div>No movie found</div>;
  }

  return (
    <div>
      <h1>{movieDetail.name}</h1>
      <p>{movieDetail.gender}</p>
      <img src={`https://image.tmdb.org/t/p/w200${movieDetail.profile_path}`}  />
    </div>
  );
};

export default MovieDetail;
