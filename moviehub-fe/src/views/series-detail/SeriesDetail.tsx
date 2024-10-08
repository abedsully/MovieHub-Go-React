import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_Tmdb, ApiMovieHub } from "../../constant/Api";
import IVideo from "../../interfaces/IVideo";
import {
  getReleaseYear,
  formatVoteAverage,
  convertIdToInt,
} from "../../utils/utils";
import { StarIcon } from "@heroicons/react/24/solid";
import IMovieCredit from "../../interfaces/IMovieCredit";
import IPhotos from "../../interfaces/IPhotos";
import PhotoComponent from "../../component/photo-component/PhotoComponent";
import PeopleComponent from "../../component/people-component/PeopleComponent";
import CardComponent from "../../component/card-component/CardComponent";
import { useUser } from "../../context/UserContext";
import Comments from "../../component/comment/Comments";
import UpcomingMovies from "../../component/upcoming-movies/UpcomingMovies";
import { Helmet } from "react-helmet";
import Navbar from "../../component/navbar/Navbar";
import ImagePreviewModal from "../../component/image-preview/ImagePreviewModal";
import logo from "../../assets/logo.png";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ISeries from "../../interfaces/ISeries";
import MediaTypes from "../../constant/Enums";
import SeasonComponent from "../../component/season-component/SeasonComponent";

const SeriesDetail = () => {
  const { id } = useParams();
  const [seriesDetail, setSeriesDetail] = useState<ISeries | undefined>(
    undefined
  );
  const [seriesCredit, setSeriesCredit] = useState<IMovieCredit | undefined>(
    undefined
  );
  const [seriesImages, setSeriesImages] = useState<IPhotos>();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<
    "Overview" | "Trailer" | "Details"
  >("Overview");
  const [seriesRecommendation, setSeriesRecommendation] = useState<ISeries[]>(
    []
  );
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [comment, setComment] = useState("");
  const user = useUser();
  const navigate = useNavigate();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMoreImageClick = () => {
    setCurrentImageIndex(0);
    setIsImageModalOpen(true);
  };

  const seriesId = convertIdToInt(typeof id == "string" ? id : "");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSeriesDetail = async () => {
      try {
        const seriesResponse = await axios.get(
          `${API_Tmdb.detail(MediaTypes.TV, seriesId)}`
        );
        setSeriesDetail(seriesResponse.data);

        const videoResponse = await axios.get(
          `${API_Tmdb.videos(MediaTypes.TV, seriesId)}`
        );
        const availableVideo = videoResponse.data.results.find(
          (video: IVideo) => video.site === "YouTube" && video.official === true
        );
        setVideo(availableVideo || null);

        const seriesCredits = await axios.get(
          `${API_Tmdb.credits(MediaTypes.TV, seriesId)}`
        );
        setSeriesCredit(seriesCredits.data);

        const seriesImages = await axios.get(
          `${API_Tmdb.images(MediaTypes.TV, seriesId)}`
        );
        setSeriesImages(seriesImages.data);

        const seriesRecommendation = await axios.get(
          `${API_Tmdb.recommendation(MediaTypes.TV, seriesId)}`
        );
        setSeriesRecommendation(seriesRecommendation.data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching series details or videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetail();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user?.id) {
      console.error("User ID not available");
      return;
    }

    if (comment === "") {
      console.error("Cant be empty");
      return;
    }

    try {
      const response = await axios.post(
        ApiMovieHub.addComment,
        {
          movieId: seriesId,
          userId: user.id,
          comment: comment,
          dateInputted: new Date().toISOString(),
          type: MediaTypes.TV,
        },
        { withCredentials: true }
      );
      console.log("Comment submitted:", response.data);
      navigate(0);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    const currentButton = buttonRefs.current.find(
      (button) => button?.dataset.tab === selectedTab
    );
    if (currentButton && indicatorRef.current) {
      indicatorRef.current.style.width = `${currentButton.offsetWidth}px`;
      indicatorRef.current.style.left = `${currentButton.offsetLeft}px`;
    }
  }, [selectedTab, seriesDetail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!seriesDetail) {
    return <div>No movie found</div>;
  }

  const releaseYear = getReleaseYear(seriesDetail.first_air_date);
  const voteAverageFormatted = formatVoteAverage(seriesDetail.vote_average);

  const renderContent = () => {
    switch (selectedTab) {
      case "Overview":
        return (
          <>
            <div className="flex flex-col gap-4">
              <p>{seriesDetail.overview}</p>
              <p className="font-sm">
                <span className="text-customOrangeColor font-medium">
                  Starring:{" "}
                </span>{" "}
                {seriesCredit?.cast
                  .slice(0, 3)
                  .map((person) => person.name)
                  .join(", ") || "N/A"}
              </p>

              <p className="font-sm">
                <span className="text-customOrangeColor font-medium">
                  Directed by:{" "}
                </span>
                {seriesCredit?.crew
                  .filter((crew) => crew.job === "Director")
                  .slice(0, 3)
                  .map((crew) => crew.name)
                  .join(", ") || "N/A"}
              </p>

              <p className="font-sm">
                <span className="text-customOrangeColor font-medium">
                  Genre:{" "}
                </span>
                {seriesDetail.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </>
        );

      case "Trailer":
        return video ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${video.key}`}
            allowFullScreen
          />
        ) : (
          <p>No trailer available</p>
        );
      case "Details":
        return (
          <div className="flex flex-col gap-4">
            <p>
              Produced by:{" "}
              {seriesDetail.production_companies
                .slice(0, 1)
                .map((company) => company.name)}
            </p>
            <p>
              Homepage:{" "}
              <Link to={seriesDetail.homepage} className="hover:underline">
                {seriesDetail.homepage}
              </Link>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${seriesDetail?.name} (${releaseYear})`} - MovieHub</title>
      </Helmet>

      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={logo} />
      </div>

      <div className="flex flex-col lg:ml-[18rem] p-5 lg:px-[2.5rem]">
        <div className="flex text-white  mt-[2rem]">
          <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[6rem] items-center">
            <img
              src={`https://image.tmdb.org/t/p/w400${seriesDetail.poster_path}`}
              alt={seriesDetail.name}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <div className="min-w-screen lg:flex justify-between gap-[4rem] ">
                <div className="flex flex-col gap-4 text-center lg:text-start">
                  <h1 className="text-4xl font-medium">{seriesDetail.name}</h1>
                  <div className="flex gap-2 text-sm text-gray-400 font-medium justify-center lg:justify-start">
                    <p>{releaseYear}</p>
                  </div>
                </div>

                <div className="flex text-2xl items-center gap-2 mt-2 justify-center">
                  <p>{voteAverageFormatted}</p>
                  <StarIcon className="text-yellow-500 h-7 w-7" />
                </div>
              </div>

              <div className="mt-6">
                <div className="relative flex gap-[2rem]">
                  <div
                    ref={indicatorRef}
                    className="absolute bottom-0 left-0 h-0.5 bg-customOrangeColor transition-all duration-300 mt-2"
                  />
                  <button
                    ref={(el) => (buttonRefs.current[0] = el)}
                    onClick={() => setSelectedTab("Overview")}
                    className={`tab-button ${
                      selectedTab === "Overview"
                        ? "font-bold border-b-2 border-[#f55b03]"
                        : ""
                    }`}
                    data-tab="Overview"
                  >
                    Overview
                  </button>
                  <button
                    ref={(el) => (buttonRefs.current[1] = el)}
                    onClick={() => setSelectedTab("Trailer")}
                    className={`tab-button ${
                      selectedTab === "Trailer" ? "font-bold" : ""
                    }`}
                    data-tab="Trailer"
                  >
                    Trailer
                  </button>
                  <button
                    ref={(el) => (buttonRefs.current[2] = el)}
                    onClick={() => setSelectedTab("Details")}
                    className={`tab-button ${
                      selectedTab === "Details" ? "font-bold" : ""
                    }`}
                    data-tab="Details"
                  >
                    Details
                  </button>
                </div>
                <div className="mt-6 max-w-lg max-h-[400px] overflow-y-auto">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Area Movie Images*/}
        <div className="flex flex-col mt-4 text-white">
          <div className="flex gap-4 mt-[4rem] items-center">
            <h1
              className="text-white text-xl border-l-4 border-customOrangeColor pl-2 cursor-pointer"
              onClick={handleMoreImageClick}
            >
              Images:
            </h1>
          </div>

          {seriesImages && seriesImages.backdrops.length > 0 && (
            <PhotoComponent backdrops={seriesImages.backdrops} />
          )}

          {/* Add the ImagePreviewModal here */}
          <ImagePreviewModal
            isOpen={isImageModalOpen}
            images={
              seriesImages?.backdrops.map(
                (backdrop) =>
                  `https://image.tmdb.org/t/p/w500${backdrop.file_path}`
              ) || []
            }
            onClose={() => setIsImageModalOpen(false)}
            currentIndex={currentImageIndex}
          />
        </div>

        {/* Area Top Casts */}
        <div className="flex flex-col mt-4 text-white">
          <Link to={`/cast-detail/${seriesDetail.id}`}>
            <h1 className="text-white mt-[4rem] text-xl border-l-4 border-customOrangeColor pl-2 flex items-center">
              Casts:
              <ChevronRightIcon className="w-6 h-6 ml-2 text-customOrangeColor" />
            </h1>
          </Link>

          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-6 mt-4">
            {seriesCredit?.cast.slice(0, 9).map((people) => (
              <PeopleComponent people={people} />
            ))}
          </div>
        </div>

        {/* List of Seasons*/}
        <div className="flex flex-col mt-4 text-white">
          <h1 className="text-white mt-[4rem] text-xl border-l-4 border-customOrangeColor pl-2">
            List of Seasons:
          </h1>
          {seriesDetail ? (
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
              {seriesDetail.seasons
                .filter((season) => season.season_number !== 0)
                .map((season) => (
                  <SeasonComponent
                    name={season.name}
                    poster_path={season.poster_path}
                    season_number={0}
                  />
                ))}
            </div>
          ) : (
            <p className="mt-8 text-start">No Movie Recommendations Yet</p>
          )}
        </div>

        {/* Area Series Recommendation*/}
        <div className="flex flex-col mt-4 text-white">
          <h1 className="text-white mt-[4rem] text-xl border-l-4 border-customOrangeColor pl-2">
            Recommended Series:
          </h1>
          {seriesRecommendation && seriesRecommendation.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
              {seriesRecommendation.map((series) => (
                <CardComponent key={series.id} movie={series} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-start">No Series Recommendations Yet</p>
          )}
        </div>

        <div className="flex flex-col mt-4 text-white gap-[2rem]">
          <h1 className="text-white mt-[4rem] text-xl border-l-4 border-customOrangeColor pl-2">
            Write a review
          </h1>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your review..."
            className="mt-2 p-2 w-full h-20 bg-gray-800 text-white border border-gray-600 rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 p-1 bg-customOrangeColor rounded-lg w-[8rem] text-sm font-semibold"
          >
            Post Comment
          </button>
        </div>

        {/* Area Series Comments */}
        <div className="w-full lg:flex mt-[4rem] justify-between gap-[4rem]">
          <div className="flex flex-col w-[30rem]">
            <Link to={`/review-list/${seriesDetail.id}`}>
              <div className="flex gap-2">
                <h1 className="text-white  mb-[2rem] text-xl border-l-4 border-customOrangeColor pl-2">
                  Reviews
                </h1>
                <ChevronRightIcon className="w-6 h-6 mt-.5 text-customOrangeColor" />
              </div>
            </Link>
            <Comments movieId={seriesId} limit={5}/>
          </div>

          {/* Area Upcoming Series*/}
          <div className="flex flex-col">
            <h1 className="text-white mt-[4rem] lg:mt-[0rem] mb-[2rem] text-xl border-l-4 border-customOrangeColor pl-2">
              Upcoming Movies & Shows
            </h1>

            <UpcomingMovies />
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriesDetail;
