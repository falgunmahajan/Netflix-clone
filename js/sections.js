import{api}from "./api.js";
import {createUrl,createTrailer,createInfo,bannerVolume}from "./function.js";
var player;


// function for creating banner division
export function createBannerDivision(mediaType, id, movie) {
    fetch(api.videoPath(mediaType, id)).then(res => res.json()).then(data => {
        let bannerContainer = document.querySelector(".bannerContainer");
        let bannerVideo = document.createElement("div");
        bannerVideo.classList.add("bannerVideo");
        bannerVideo.innerHTML = `<iframe id="player" width="100%" height="100%"  src="https://www.youtube.com/embed/${data.results[0].key}?enablejsapi=1&;autoplay=1&;mute=1&;controls=0&;loop=1&;playlist=${data.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
         `;
        bannerContainer.append(bannerVideo);
        let name = (movie.original_title) ? movie.original_title : movie.original_name;
        let imgSrc=`${api.imagePath}${movie.backdrop_path}`
        let movieInfo = document.createElement("div");
        movieInfo.classList.add("movieinfo");
        movieInfo.classList.add("w-50");
        movieInfo.innerHTML = `<h1 class="mb-4">${name}</h1>
        <span class="fs-5 mb-4 ">${movie.overview}</span>
        <div class="d-flex button mt-5 pe-4  align-items-center  justify-content-between">
        <div class="d-flex">
        <button class="btn play bg-white d-flex px-4 fs-5 me-4  fw-bold align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-fill " viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>Play</button><button class="btn infobtn text-white d-flex px-4 fs-5 fw-bold align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-info-circle me-2" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>More Info</button></div>
        <div class="volume">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-volume-up d-none" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
  <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-volume-mute d-inline" viewBox="0 0 16 16">
  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
</svg></div></div>`
        bannerContainer.append(movieInfo);
        player=new YT.Player("player");
        movieInfo.querySelector(".infobtn").addEventListener("click",()=>{
    createInfo(mediaType,id,name,imgSrc)
})
movieInfo.querySelector(".play").addEventListener("click",()=>{
    createTrailer(mediaType,id)
})  
movieInfo.querySelector(".volume").addEventListener("click",()=>{
    bannerVolume('movieinfo');
})
    })
   
}

//  function for fetching api
export function fetchMoviesList(url, categoryName, mediaType) {
    fetch(url).then(res => res.json()).then(data => {
        let movies = data.results;
        createMoviesDivision(movies, categoryName, mediaType)
    })
}



//function for creating movies division
function createMoviesDivision(movies, categoryName, mediaType) {

    let moviecontainer = document.querySelector(".moviecontainer");
    let moviesImages = movies.map(item => {
        
        let media = (mediaType == undefined) ? item.media_type : mediaType;
        let name = (item.original_title) ? item.original_title : item.original_name;
      
        // `<div class=" movie-item" id="${item.id}", media="${media}" >
        return `<img class="image-item" id="${item.id}" src="${api.imagePath}${item.backdrop_path}" alt="${categoryName}" media="${media}" name="${name}" >`
        // </div>`
//         <div class="trailerImg bg-black d-none">
//         <div class="movieTrailer" id="${item.id}"><img width="270" height="100" src="${api.imagePath}${item.backdrop_path}" alt="${categoryName}"></div>
//         <div class="movieInfo bg-black p-2">
//         <div class="d-flex justify-content-between">
//         <div class="d-flex">
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class=" bi bi-play-circle-fill me-2" viewBox="0 0 16 16" id="${item.id}", media="${media}">
//   <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
// </svg>
// <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle me-2" viewBox="0 0 16 16">
//   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
//   <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
// </svg>
// <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up " viewBox="0 0 16 16">
//   <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
// </svg>
//         </div>
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-down-square-fill" viewBox="0 0 16 16" id="${item.id}", media="${media}", image="${item.backdrop_path}" name= "${name}">
//   <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
// </svg>
// </div>
//         <div class="time mt-2"></div>
//         <div class="genre d-flex flex-wrap"></div>
//         </div>
//         </div>
//         </div>
    }).join('');
    let moviesDivision = `<h4 class="movie-heading mb-3">${categoryName}</h4>
   <div class="owl-carousel owl-theme moviesrow">
   ${moviesImages}
</div>`
    let div = document.createElement("div");
    div.classList.add("moviesDivision");
    div.innerHTML = moviesDivision;
    moviecontainer.append(div)
    let movieItem=moviecontainer.querySelectorAll(".image-item");
movieItem.forEach(item=>{
    item.addEventListener("mouseenter",(e)=>{
        let img=e.target;
        let id=e.target.id;
        let media=e.target.getAttribute("media");
        let name=e.target.getAttribute("name");
        let src=e.target.src;
        console.log(name)
        createUrl(img, media, id,src,name)
    })
    
    // item.addEventListener("mouseleave",()=>{
    //     removeVideo()
    // })
})
// let movieInfo=document.querySelectorAll(".movieInfo");
// movieInfo.forEach(infodiv=>{
//     let playbtns=infodiv.querySelectorAll(".bi-play-circle-fill")
//   playbtns.forEach(btn=>{
//     btn.addEventListener("click",(e)=>{
//         console.log(btn)
//         let id=btn.id;
//         let media=btn.getAttribute("media");
//         createTrailer(media,id)
//     })
// })
    // let infobtns=infodiv.querySelectorAll(".bi-caret-down-square-fill");
    // infobtns.forEach(btn=>{
    //     btn.addEventListener("click",(e)=>{
    //         console.log(btn)
    //         let id=btn.id;
    //         let media=btn.getAttribute("media");
    //         let name=btn.getAttribute("name");
    //         let image=btn.getAttribute("image");
    //         console.log(media,id,name,image)
    //         createInfo(media,id,name,image)
            
    //     })
//   })
// })
$('.owl-carousel').owlCarousel({
  nav:true,
  dots:false,
  loop:true,
  mouseDrag:true,
  touchDrag:true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  margin:10,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:6
      }
  }
})

}




export{player};