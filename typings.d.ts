export interface Movie {
  name: string;
  original_name: string;
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
