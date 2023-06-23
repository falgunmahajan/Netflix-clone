import{api,tvApi,movieApi} from "./api.js";
import { fetchMoviesList } from "./sections.js";
import { fetchTrending} from "./function.js";
fetchTrending(api.trending);

fetchMoviesList(api.trending, "Trending Now");
for (var key in movieApi) {
    fetchMoviesList(movieApi[key].url, movieApi[key].category, "movie")
}
for (var key in tvApi) {

    fetchMoviesList(tvApi[key].url, tvApi[key].category, "tv")
}