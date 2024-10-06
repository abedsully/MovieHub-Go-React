import { useEffect, useState } from "react";
import axios from "axios";
import IComment from "../../interfaces/IComment";
import { ApiMovieHub } from "../../constant/Api";
import { fetchUserById, formatDate } from "../../utils/utils";
import IUser from "../../interfaces/IUser";
import Avatar from "../avatar/Avatar";
import logo from "../../assets/logo.png";

interface CommentsProps {
  movieId: number;
}

const Comments = ({ movieId }: CommentsProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userMap, setUserMap] = useState<{ [key: string]: IUser }>({});

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${ApiMovieHub.getComments}/${movieId}`,
          { withCredentials: true }
        );
        setComments(response.data);

        const userFetchPromises = response.data.map((comment) =>
          fetchUserById(comment.userId)
        );

        const users = await Promise.all(userFetchPromises);

        const usersMap = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as { [key: string]: IUser });

        setUserMap(usersMap);
      } catch (err) {
        setError("Failed to fetch comments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="text-white">

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div className="flex flex-col pb-4">
                <div className="flex flex-row gap-[.5rem] items-center">
                  <Avatar image={logo} size={12} />
                  <p className="text-base">
                    {userMap[comment.userId]?.username || "Unknown User"}
                  </p>
                  <p className="text-gray-400 text-sm pl-4">{formatDate(comment.dateInputted)}</p>
                </div>
                <p className="ml-2 w-[24rem] 2xl:w-[40rem]">{comment.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available for this movie.</p>
      )}
    </div>
  );
};

export default Comments;
