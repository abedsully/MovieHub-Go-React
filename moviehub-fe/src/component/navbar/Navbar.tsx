import ProfilePop from '../profile-pop/ProfilePop'; // Ensure the correct import path for ProfilePop


interface IProfileProp {
    image: string;
}

const Navbar = ({ image }: IProfileProp) => {
  return (
    <div className="ml-[1rem] sm:ml-[17rem] w-full flex justify-end items-center gap-[2rem] mt-[-3.5rem]">
      <div className="">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            placeholder="Search"
            className="w-[15rem] sm:w-[30rem] block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <ProfilePop image={image} />
    </div>
  );
};

export default Navbar;
