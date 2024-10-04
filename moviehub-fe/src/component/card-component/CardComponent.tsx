import { Link } from "react-router-dom";
import ICardComponent from "./ICardComponent";

const CardComponent = ({ movie }: ICardComponent) => {
  return (
    <Link
      to={
        movie.media_type === "movie"
          ? `/movies/${movie.id}`
          : `/series/${movie.id}`
      }
    >
      <div key={movie.id} className="rounded-lg overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto"
          />
        ) : (
          <div className="h-40 bg-gray-300 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CardComponent;
