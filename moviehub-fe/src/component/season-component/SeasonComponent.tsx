import { tmdbAPIImage } from "../../constant/Api";
import ISeasonComponent from "./ISeasonComponent";

const SeasonComponent = ({ name, poster_path }: ISeasonComponent) => {
  const imageUrl = `${tmdbAPIImage}${poster_path}`;
  return (
    <>
      <div
        className={`rounded-lg overflow-hidden w-full transition-transform duration-300 transform hover:scale-105 flex flex-col items-center mb-2`}
      >
        <img src={imageUrl} className="h-auto" />

        <p className="w-full text-white text-center mt-4">{name}</p>
      </div>
    </>
  );
};

export default SeasonComponent;
