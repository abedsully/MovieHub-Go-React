import { useUser } from "../../context/UserContext";
import Comments from "../../component/comment/Comments";
import { Helmet } from "react-helmet";
import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png";

const Reviews = () => {
  const user = useUser();

  const userId = user?.id ? user.id : "";

  return (
    <>
      <Helmet>
        <title>MovieHub</title>
      </Helmet>

      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>
      <div className="w-[30rem] lg:w-[40rem] p-4 gap-[5rem] mt-[2rem] lg:ml-[8rem]">
        <Comments userId={userId} />
      </div>
    </>
  );
};

export default Reviews;