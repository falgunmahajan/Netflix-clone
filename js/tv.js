import{api,tvApi,movieApi} from "./api.js";
import { fetchMoviesList } from "./sections.js";
import { fetchTrending } from "./function.js";
fetchTrending(api.trendingtv);

fetchMoviesList(api.trendingtv, "Trending Now");
for (var key in tvApi) {

    fetchMoviesList(tvApi[key].url, tvApi[key].category, "tv")
}