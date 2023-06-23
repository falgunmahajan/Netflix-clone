const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "a045da4a259a71112e84975b225aed31";
export const upcoming=`${baseUrl}/movie/upcoming?api_key=${apiKey}`
export const api = {
    trending: `${baseUrl}/trending/all/day?api_key=${apiKey}`,
    trendingtv:`${baseUrl}/trending/tv/day?api_key=${apiKey}`,
    trendingmovie:`${baseUrl}/trending/movie/day?api_key=${apiKey}`,
    imagePath: "https://image.tmdb.org/t/p/original",
    videoPath: function (mediaType, id) {
        return `${baseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`
    },
    details: function (mediaType, id) {
        return `${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`
    }
};
export const movieApi = {
    bollywood: {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_original_language=hi`,
        category: `Bollywood Movies`
    },
    top10movies: {
        url: `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=region=IN`,
        category: `Top 10 movies in India`
    },
    hollywood: {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_original_language=en`,
        category: `Hollywood Movies`
    },
    movieComedies:
    {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_Genres=35`,
        category: `Comedy Movies`
    },
    movieHorror: {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_Genres=27`,
        category: `Horror Movies`
    },
    movieFamily: {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_Genres=10751`,
        category: `Family Movies`
    },
    anime: {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_Genres=16`,
        category: `Anime`
    },
    romanticMovie: {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_Genres=10749&with_origin_country=IN`,
        category: `Romantic Movies`
    },
    actionMovie:
    {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_Genres=28`,
        category: `Action and Adventure Movies`
    },
    thriller:
    {
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_Genres=53`,
        category: `Thriller Movies`
    }
};
export const tvApi = {
    tvComedies:
    {
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&with_Genres=35`,
        category: `Tv Comedies`
    },
    top10shows: {
        url: `${baseUrl}/tv/top_rated?api_key=${apiKey}&language=en-US&page=region=IN`,
        category: `Top 10 shows in India`
    },
    supernaturalShows: {
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&with_keywords=6152`,
        category: `Supernatural TV Shows`
    },
    tvDrama: {
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&with_Genres=18`,
        category: `Tv Dramas`
    },
    usTvShows: {
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&with_origin_country=US`,
        category: `US TV Shows`
    },
    hindiTv: {
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&with_original_language=hi`,
        category: `Hindi TV Shows`
    },
    tvHorror: {
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&with_Genres=10765`,
        category: `Tv Sci-Fi & Horror`
    },
    crimeTvShows:
    {
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&with_Genres=80`,
        category: `Crime TV Shows`
    }
};
export const searchApi={
    url:function(media,query){
        return `${baseUrl}/search/${media}?api_key=${apiKey}&query=${query}`
    }
};