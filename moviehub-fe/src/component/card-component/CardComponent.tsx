import { Link } from "react-router-dom";
import ICardComponent from "./ICardComponent";
import { tmdbAPIImage } from "../../constant/Api";
import logo from '../../assets/logo.png'

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
            src={`${tmdbAPIImage}${movie.poster_path}`}
            className="w-full h-auto"
          />
        ) : (
          <img
            src={logo}
            className="w-full h-auto"
          />
        )}
      </div>
    </Link>
  );
};

export default CardComponent;
