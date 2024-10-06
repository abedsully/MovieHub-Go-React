import axios from "axios";
import { ApiMovieHub } from "../constant/Api";
import IMovie from "../interfaces/IMovie";
import ISeries from "../interfaces/ISeries";

export const getReleaseYear = (releaseDate: string): number => {
  return new Date(releaseDate).getFullYear();
};

export const convertDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} min`;
};

export const formatVoteAverage = (voteAverage: number): string => {
  return voteAverage.toFixed(1);
};

export const convertIdToInt = (id: string): number => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throw new Error(`Invalid ID: ${id}`);
  }
  return parsedId;
};

export const formatDate = (dateInputted: string): string => {
  const date = new Date(dateInputted);
  
  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};


export const fetchUserById = async (userId: string) => {
  try {
      const response = await axios.get(`${ApiMovieHub.getUserByUserId(userId)}`, {withCredentials: true});
      return response.data;
  } catch (error) {
      console.error("Error fetching user info", error);
      throw error;
  }
};

export const isMovie = (movie: IMovie | ISeries): movie is IMovie => {
  return (movie as IMovie).title !== undefined;
};