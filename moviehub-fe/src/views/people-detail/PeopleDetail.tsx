import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_Tmdb } from "../../constant/Api"; // Ensure this contains the base API URL
import IPeople from "../../interfaces/IPeople";

const MovieDetail = () => {
  const { id } = useParams(); // Extracting id from the URL parameters
  const [movieDetail, setMovieDetail] = useState<IPeople>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieId = parseInt(id, 10);
        const response = await axios.get(`${API_Tmdb.detail("person", movieId)}`); // Adjust based on your API
        setMovieDetail(response.data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]); // Dependency on id to refetch when it changes

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
