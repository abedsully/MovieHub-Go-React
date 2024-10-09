import { tmdbAPIImage } from "../../constant/Api";
import IPeopleComponent from "./IPeopleComponent";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import MediaTypes from "../../constant/MediaTypesEnum";

const PeopleComponent = ({ people }: IPeopleComponent) => {
  return (
    <Link to={`/${MediaTypes.PEOPLE}/${people.id}`}>
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
    </Link>
  );
};

export default PeopleComponent;
