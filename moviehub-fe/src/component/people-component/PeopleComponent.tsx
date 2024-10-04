import { tmdbAPIImage } from "../../constant/Api";
import IPeopleComponent from "./IPeopleComponent";
import logo from "../../assets/logo.png";

const PeopleComponent = ({ people }: IPeopleComponent) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div key={people.id} className="flex flex-col items-center">
        {people.profile_path ? (
          <img
            src={`${tmdbAPIImage}${people.profile_path}`}
            alt={`${people.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <img src={logo} className="w-24 h-24" />
        )}

        <p className="mt-2 text-center">{people.name}</p>
      </div>
    </div>
  );
};

export default PeopleComponent;
