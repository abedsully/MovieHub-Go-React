import { useEffect, useState } from "react";
import axios from "axios";
import IComment from "../../interfaces/IComment";
import { API_Tmdb, ApiMovieHub } from "../../constant/Api";
import { fetchUserById, formatDate } from "../../utils/utils";
import IUser from "../../interfaces/IUser";
import Avatar from "../avatar/Avatar";
import logo from "../../assets/logo.png";
import IMovie from "../../interfaces/IMovie";
import { Link } from "react-router-dom";

export const tmdbAPIImage = "https://image.tmdb.org/t/p/w500/";

interface CommentsProps {
  userId?: string;
  movieId?: number;
  limit?: number;
}

const Comments = ({ userId, movieId, limit }: CommentsProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<{ [key: number]: IMovie }>(
    {}
  );
  const [userMap, setUserMap] = useState<{ [key: string]: IUser }>({});

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;

        if (userId) {
          response = await axios.get(
            `${ApiMovieHub.getCommentsByUserId(userId)}`,
            { withCredentials: true }
          );

          const movieIdSet = new Set(
            response.data.map((comment: IComment) => comment.movieId)
          );
          const movieDetailsPromises = Array.from(movieIdSet).map(
            async (id) => {
              const movieResponse = await axios.get(
                `${API_Tmdb.detail("movie", id)}`
              );
              return { id, data: movieResponse.data };
            }
          );

          const movieDetailsArray = await Promise.all(movieDetailsPromises);
          const movieDetailsMap = movieDetailsArray.reduce(
            (acc, { id, data }) => {
              acc[id] = data;
              return acc;
            },
            {} as { [key: number]: IMovie }
          );

          setMovieDetails(movieDetailsMap);
        } else if (movieId) {
          response = await axios.get(`${ApiMovieHub.getComments}/${movieId}`, {
            withCredentials: true,
          });
        }

        if (response) {
          setComments(response.data);

          const userFetchPromises = response.data.map(
            (comment: { userId: string }) => fetchUserById(comment.userId)
          );

          const users = await Promise.all(userFetchPromises);
          const usersMap = users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {} as { [key: string]: IUser });

          setUserMap(usersMap);
        }
      } catch (err) {
        setError("Failed to fetch comments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [userId, movieId]);

  if (loading)
    return <div className="text-center text-gray-400">Loading comments...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const displayedComments = limit ? comments.slice(0, limit) : comments;

  return (
    <div className="text-white">
      {displayedComments.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-gray-700 w-full"
        >
          {displayedComments.map((comment) => (
            <Link to={`/movies/${comment.movieId}`}>
            <li key={comment.id} className="flex flex-col pb-6">
              <div className="flex flex-row gap-4 items-start mt-4">
                {userId && movieDetails[comment.movieId] && (
                  <div className="flex-none w-24 h-36 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`${tmdbAPIImage}${
                        movieDetails[comment.movieId].poster_path
                      }`}
                      alt={movieDetails[comment.movieId].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar image={logo} size={12} />
                      <p className="text-lg font-semibold">
                        {userMap[comment.userId]?.username || "Unknown User"}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {formatDate(comment.dateInputted)}
                    </p>
                  </div>
                  <p className="mt-2 text-base">{comment.comment}</p>
                </div>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No comments available.</p>
      )}
    </div>
  );
};

export default Comments;
