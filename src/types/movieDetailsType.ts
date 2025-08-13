import { movieType } from "./movieType";

export type MovieDetailsType = movieType & {
  overview: string;
  genres?: { id: number; name: string }[];
  credits?: {
    crew: {
      job: string;
      name: string;
    }[];
  };
};
