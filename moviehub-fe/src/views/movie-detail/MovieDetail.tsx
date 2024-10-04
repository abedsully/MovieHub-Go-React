import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_Tmdb } from "../../constant/Api";
import IMovie from "../../interfaces/IMovie";
import IVideo from "../../interfaces/IVideo";
import {
  getReleaseYear,
  convertDuration,
  formatVoteAverage,
} from "../../utils/utils";
import { StarIcon } from "@heroicons/react/24/solid";
import IMovieCredit from "../../interfaces/IMovieCredit";
import Searchbar from "../../component/search-bar/Searchbar";
import IPhotos from "../../interfaces/IPhotos";
import PhotoComponent from "../../component/photo-component/PhotoComponent";

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

  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieId = parseInt(id, 10);

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
      } catch (error) {
        console.error("Error fetching movie details or videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

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
      <div className="w-full flex justify-end mt-[3rem] px-[6rem]">
        <Searchbar />
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
        <div className="flex flex-col mt-10 text-white">
          <h1 className="text-white mt-[4rem] text-xl">Images:</h1>
          {movieImages && movieImages.backdrops.length > 0 && (
            <PhotoComponent backdrops={movieImages.backdrops} />
          )}
        </div>


      </div>
    </>
  );
};

export default MovieDetail;
