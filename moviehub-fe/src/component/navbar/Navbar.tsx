import ProfilePop from '../profile-pop/ProfilePop'; // Ensure the correct import path for ProfilePop


interface IProfileProp {
    image: string;
}

const Navbar = ({ image }: IProfileProp) => {
  return (
    <div className="ml-[9rem] sm:ml-[2rem] 2xl:ml-[28rem] w-full flex justify-end items-center gap-[2rem] mt-[-3.5rem]">
      <ProfilePop image={image} />
    </div>
  );
};

export default Navbar;
