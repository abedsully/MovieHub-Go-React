import ICardComponent from "./ICardComponent";

const CardComponent = ({ movie }: ICardComponent) => {
  return (
    <div key={movie.id} className="border rounded-lg overflow-hidden">
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
      <div className="p-4">
        <h2 className="text-xl font-semibold">
          {movie.title ? movie.title : movie.name}
        </h2>
      </div>
    </div>
  );
};

export default CardComponent;
