import{tvApi,movieApi,upcoming} from "./api.js";
import { fetchMoviesList } from "./sections.js";
fetchMoviesList(upcoming,"Upcoming Movies","movie")
fetchMoviesList(movieApi.top10movies.url, movieApi.top10movies.category, "movie")
fetchMoviesList(tvApi.top10shows.url, tvApi.top10shows.category, "tv")
