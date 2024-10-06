import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_Tmdb, ApiMovieHub } from "../../constant/Api";
import IMovie from "../../interfaces/IMovie";
import IVideo from "../../interfaces/IVideo";
import {
  getReleaseYear,
  convertDuration,
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

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<IMovie | undefined>(undefined);
  const [movieCredit, setMovieCredit] = useState<IMovieCredit | undefined>(
    undefined
  );
  const [movieImages, setMovieImages] = useState<IPhotos>();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<
    "Overview" | "Trailer" | "Details"
  >("Overview");
  const [movieRecommendations, setMovieRecommendations] = useState<IMovie[]>(
    []
  );
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [comment, setComment] = useState("");
  const user = useUser();
  const navigate = useNavigate();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleChevronClick = () => {
    setCurrentImageIndex(0);
    setIsImageModalOpen(true);
  };

  const movieId = convertIdToInt(typeof id == "string" ? id : "")

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieResponse = await axios.get(
          `${API_Tmdb.detail("movie", movieId)}`
        );
        setMovieDetail(movieResponse.data);

        const videoResponse = await axios.get(
          `${API_Tmdb.videos("movie", movieId)}`
        );
        const availableVideo = videoResponse.data.results.find(
          (video: IVideo) => video.site === "YouTube" && video.official === true
        );
        setVideo(availableVideo || null);

        const movieCredits = await axios.get(
          `${API_Tmdb.credits("movie", movieId)}`
        );
        setMovieCredit(movieCredits.data);

        const movieImages = await axios.get(
          `${API_Tmdb.images("movie", movieId)}`
        );
        setMovieImages(movieImages.data);

        const movieRecommendation = await axios.get(
          `${API_Tmdb.recommendation("movie", movieId)}`
        );
        setMovieRecommendations(movieRecommendation.data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching movie details or videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user?.id) {
      console.error("User ID not available");
      return;
    }

    try {


      const response = await axios.post(
        ApiMovieHub.addPost,
        {
          movieId: movieId,
          userId: user.id,
          comment: comment,
          dateInputted: new Date().toISOString(),
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
  }, [selectedTab, movieDetail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetail) {
    return <div>No movie found</div>;
  }

  const releaseYear = getReleaseYear(movieDetail.release_date);
  const durationFormatted = convertDuration(movieDetail.runtime);
  const voteAverageFormatted = formatVoteAverage(movieDetail.vote_average);

  const renderContent = () => {
    switch (selectedTab) {
      case "Overview":
        return (
          <>
            <div className="flex flex-col gap-4">
              <p>{movieDetail.overview}</p>
              <p className="font-sm">
                <span className="text-customOrangeColor font-medium">
                  Starring:{" "}
                </span>{" "}
                {movieCredit?.cast
                  .slice(0, 3)
                  .map((person) => person.name)
                  .join(", ") || "N/A"}
              </p>

              <p className="font-sm">
                <span className="text-customOrangeColor font-medium">
                  Directed by:{" "}
                </span>
                {movieCredit?.crew
                  .filter((crew) => crew.job === "Director")
                  .slice(0, 3)
                  .map((crew) => crew.name)
                  .join(", ") || "N/A"}
              </p>

              <p className="font-sm">
                <span className="text-customOrangeColor font-medium">
                  Genre:{" "}
                </span>
                {movieDetail.genres.map((genre) => genre.name).join(", ")}
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
              {movieDetail.production_companies
                .slice(0, 1)
                .map((company) => company.name)}
            </p>
            <p>
              Homepage:{" "}
              <Link to={movieDetail.homepage} className="hover:underline">
                {movieDetail.homepage}
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
        <title>{`${movieDetail?.title} (${releaseYear})`} - MovieHub</title>
      </Helmet>

      <div className="mt-16 2xl:ml-[24rem]">
        <Navbar image={""} />
      </div>

      <div className="flex flex-col lg:ml-[18rem] p-5">
        <div className="flex text-white  mt-[2rem]">
          <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[6rem] items-center">
            <img
              src={`https://image.tmdb.org/t/p/w400${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <div className="min-w-screen lg:flex justify-between gap-[4rem] ">
                <div className="flex flex-col gap-4 text-center lg:text-start">
                  <h1 className="text-4xl font-medium">{movieDetail.title}</h1>
                  <div className="flex gap-2 text-sm text-gray-400 font-medium justify-center lg:justify-start">
                    <p>{releaseYear}</p>
                    <p>|</p>
                    <p>{durationFormatted}</p>
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
            <h1 className="text-white text-xl border-l-4 border-customOrangeColor pl-2 cursor-pointer" onClick={handleChevronClick}>
              Images:
            </h1>
          </div>

          {movieImages && movieImages.backdrops.length > 0 && (
            <PhotoComponent backdrops={movieImages.backdrops} />
          )}

          {/* Add the ImagePreviewModal here */}
          <ImagePreviewModal
            isOpen={isImageModalOpen}
            images={movieImages?.backdrops.map(
              (backdrop) =>
                `https://image.tmdb.org/t/p/w500${backdrop.file_path}`
            ) || []}
            onClose={() => setIsImageModalOpen(false)}
            currentIndex={currentImageIndex}
          />
        </div>

        {/* Area Top Casts*/}
        <div className="flex flex-col mt-4 text-white">
          <h1 className="text-white mt-[4rem] text-xl border-l-4 border-customOrangeColor pl-2">
            Top Casts:
          </h1>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-6 mt-4">
            {movieCredit?.cast.slice(0, 9).map((people) => (
              <PeopleComponent people={people} />
            ))}
          </div>
        </div>

        {/* Area Movie Recommendation*/}
        <div className="flex flex-col mt-4 text-white">
          <h1 className="text-white mt-[4rem] text-xl border-l-4 border-customOrangeColor pl-2">
            Recommended Movies:
          </h1>
          {movieRecommendations && movieRecommendations.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
              {movieRecommendations.map((movie) => (
                <CardComponent key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-start">No Movie Recommendations Yet</p>
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

        <div className="w-full lg:flex mt-[4rem] justify-between gap-[4rem]">
          {/* Area Movie Comments */}
          <div className="flex flex-col ">
            <h1 className="text-white  mb-[2rem] text-xl border-l-4 border-customOrangeColor pl-2">
              Reviews
            </h1>

            <Comments movieId={movieId} />
          </div>

          {/* Area Upcoming Movies*/}
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

export default MovieDetail;
