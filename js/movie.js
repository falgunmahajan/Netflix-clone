import{api,tvApi,movieApi} from "./api.js";
import { fetchMoviesList } from "./sections.js";
import { fetchTrending } from "./function.js";
fetchTrending(api.trendingmovie);

fetchMoviesList(api.trendingmovie, "Trending Now");
for (var key in movieApi) {
    fetchMoviesList(movieApi[key].url, movieApi[key].category, "movie")
}
