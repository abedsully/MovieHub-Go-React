import { useEffect, useState } from "react";
import IPeople from "../../interfaces/IPeople";
import { API_Tmdb, tmdbAPIImage } from "../../constant/Api";
import Enum from "../../constant/Enums";
import { convertIdToInt } from "../../utils/utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import IMovie from "../../interfaces/IMovie";
import CardComponent from "../../component/card-component/CardComponent";
import Enums from "../../constant/Enums";
import IPeoplePhotos from "../../interfaces/IPeoplePhotos";
import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png"

const PeopleDetail = () => {
  const { id } = useParams();
  const personIdString = id ?? "";
  const personId = convertIdToInt(typeof id === "string" ? id : "");

  const [peopleDetail, setPeopleDetail] = useState<IPeople>();
  const [credits, setCredits] = useState<IMovie[]>([]);
  const [images, setImages] = useState<IPeoplePhotos>();

  useEffect(() => {
    const fetchPeopleDetail = async () => {
      try {
        const detailResponse = await axios.get(
          `${API_Tmdb.detail(Enum.MediaTypes.PEOPLE, personId)}`
        );
        setPeopleDetail(detailResponse.data);

        const creditResponse = await axios.get(
          `${API_Tmdb.combinedCredits(personIdString)}`
        );
        setCredits(creditResponse.data.cast.slice(0, 6));

        const imageResponse = await axios.get(
          `${API_Tmdb.images(Enums.MediaTypes.PEOPLE, personId)}`
        );
        setImages(imageResponse.data);
      } catch (error) {
        console.error("Error fetching people details or credits:", error);
      }
    };

    fetchPeopleDetail();
  }, [id]);

  return (
    <>
      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>

      <div className="container mx-auto p-4 lg:ml-[16rem] text-white lg:w-[70rem] 2xl:ml-[30rem] mt-[4rem]">
        <div className="flex flex-col md:flex-row items-start md:gap-[2rem] text-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex w-48 h-72 items-center">
            <img
              src={`${tmdbAPIImage}${peopleDetail?.profile_path}`}
              alt={peopleDetail?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {peopleDetail?.name ?? "Unknown"}
            </h1>
            <p className="text-sm mt-4">
              {peopleDetail?.biography !== ""
                ? peopleDetail?.biography
                : "No Biography Yet!"}
            </p>
          </div>
        </div>

        <h2 className="mt-[4rem] text-xl font-semibold">Featured Movies</h2>
        <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {credits.map((movie) => (
            <>
              <div className="flex flex-col gap-1">
                <CardComponent movie={movie} />
                <p>{movie.title}</p>
              </div>
            </>
          ))}
        </ul>

        <h2 className="mt-[4rem] text-xl font-semibold">
          Images of {peopleDetail?.name}
        </h2>
        <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {images?.profiles.map((image) => (
            <li key={image.file_path} className="flex flex-col gap-1">
              <img
                src={`${tmdbAPIImage}${image.file_path}`}
                alt="Profile"
                className="w-full h-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PeopleDetail;
