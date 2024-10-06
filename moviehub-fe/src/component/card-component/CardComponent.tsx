import { Link } from "react-router-dom";
import ICardComponent from "./ICardComponent";
import { tmdbAPIImage } from "../../constant/Api";
import logo from "../../assets/logo.png";
import { isMovie } from "../../utils/utils";

const CardComponent = ({ movie, size, upcoming }: ICardComponent) => {
  const imageUrl = movie.poster_path
    ? `${tmdbAPIImage}${movie.poster_path}`
    : logo;

  return (
    <Link
      to={
        (isMovie(movie))
          ? `/movies/${movie.id}`
          : `/series/${movie.id}`
      }
    >
      <div
        className={`rounded-lg overflow-hidden ${
          size ? "w-40" : "w-full"
        } transition-transform duration-300 transform hover:scale-105 flex flex-col items-center mb-2`}
      >
        <img src={imageUrl} className="h-auto" />

        <p className="w-full text-white text-center mt-4">
          {upcoming ? (isMovie(movie) ? movie.title : movie.name) : ""}
        </p>
      </div>
    </Link>
  );
};

export default CardComponent;
