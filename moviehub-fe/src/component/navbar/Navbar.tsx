import ProfilePop from '../profile-pop/ProfilePop'; // Ensure the correct import path for ProfilePop
import Searchbar from '../search-bar/Searchbar';


interface IProfileProp {
    image: string;
}

const Navbar = ({ image }: IProfileProp) => {
  return (
    <div className="ml-[2rem] sm:ml-[2rem] lg:ml-[21rem] 2xl:ml-[24rem] w-full flex justify-end items-center gap-[2rem] ">
      <Searchbar />
      <ProfilePop image={image} />
    </div>
  );
};

export default Navbar;
