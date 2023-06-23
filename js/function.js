import { api } from "./api.js"
import { player, createBannerDivision } from "./sections.js";
var player1, player2;
let img, media, movieName, movieId, movieImgSrc;
export let loggedInUser = JSON.parse(localStorage.getItem("login"));
console.log(loggedInUser)
let userID = loggedInUser.id;
let userData = JSON.parse(localStorage.getItem("userData"))
let wishlist = userData[userID].wishlisted;
let liked = userData[userID].liked;

// fetch trending movies and shows for banner
export function fetchTrending(trending) {
    fetch(trending).then(res => res.json()).then(data => {
        let trending = data.results;
        let randomIndex = Math.floor(Math.random() * trending.length);
        createBannerDivision(trending[randomIndex].media_type, trending[randomIndex].id, trending[randomIndex]);
    })
}



// function for showing the div on mousenter event on each movie
export function createUrl(image, mediatype, id, src, name) {
    img = image;
    media = mediatype;
    movieName = name;
    movieId = id;
    movieImgSrc = src;
    const trailerImg = document.querySelector(".trailerImg");
    const rect = image.getBoundingClientRect();
    const top = rect.top + window.scrollY - rect.height;
    const left = rect.left + window.scrollX;
    const width = rect.width;
    fetch(api.videoPath(mediatype, id)).then(res => res.json()).then(data => {
        const movieTrailer = document.querySelector(".movieTrailer");
        if (data.results.length != 0) {
            let key = data.results[0].key
            movieTrailer.innerHTML = `<iframe id="player2" class="imgTrailer" width="100%" height="100%" src="https://www.youtube.com/embed/${key}?enablejsapi=1&;autoplay=1&;mute=1&;controls=0&;loop=1&;playlist=${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                </iframe>
                <div class="volume trailerVolume">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-volume-up d-none" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
  <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-volume-mute d-inline" viewBox="0 0 16 16">
  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
</svg></div>`
            movieTrailer.style.height = "190px"
            player2 = new YT.Player("player2");
        }
        else {
            movieTrailer.innerHTML = `<img width="100%" height="100%" src="${src}" alt="${mediatype}"></div>`;
            movieTrailer.style.height = "150px"
        }
        movieTrailer.querySelector(".volume").addEventListener("click", () => {
            divVolume('movieTrailer');
        })
    })


    fetch(api.details(mediatype, id)).then(res => res.json()).then(data => {
         console.log(data)
        const div = document.querySelector(".time");
        getDetails(mediatype, div, data);

        const genrediv = document.querySelector(".genre");
        genrediv.innerHTML = "";
        const genres = data.genres;

        genres.forEach(item => {
            let span = document.createElement("span");
            span.innerHTML = item.name;
            span.classList.add("me-4");
            genrediv.appendChild(span)
        })
    })
    if (wishlist.length) {
        let isWishList = false;
        wishlist.map(item => {
            // console.log(id, item.id)
            if (item.id == id) {
                isWishList = true;
            }

        })

        if (isWishList) {
            trailerImg.querySelector(".bi-plus-circle").classList.add("d-none");
            trailerImg.querySelector(".bi-check-circle").classList.remove("d-none");
        }
        else {
            trailerImg.querySelector(".bi-check-circle").classList.add("d-none");
            trailerImg.querySelector(".bi-plus-circle").classList.remove("d-none");
        }
    }
    if (liked.length) {
        let isliked = false;
        liked.map(item => {
            console.log(typeof item.id)
            if (item.id == id) {
                isliked = true;
            }
            console.log(isliked)
        })

        if (isliked) {
            trailerImg.querySelector(".bi-hand-thumbs-up").classList.add("d-none");
            trailerImg.querySelector(".bi-hand-thumbs-up-fill").classList.remove("d-none");
        }
        else {
            trailerImg.querySelector(".bi-hand-thumbs-up-fill").classList.add("d-none");
            trailerImg.querySelector(".bi-hand-thumbs-up").classList.remove("d-none");
        }
    }
    trailerImg.classList.remove("d-none");
    trailerImg.classList.add("d-block");
    trailerImg.style.position = "absolute";
    trailerImg.style.top = `${top}px`;
    trailerImg.style.left = `${left}px`;
    trailerImg.style.width = `${width}px`;
    trailerImg.addEventListener("mouseleave", () => {
        removeVideo();
    })

}
let infobtns = document.querySelector(".bi-caret-down-square-fill");
infobtns.addEventListener("click", (e) => {
    createInfo(media, movieId, movieName, movieImgSrc)
})
let playbtns = document.querySelector(".bi-play-circle-fill");
console.log(playbtns)
playbtns.addEventListener("click", (e) => {
    createTrailer(media, movieId)
})
const trailerImg = document.querySelector(".trailerImg")
let addlist = trailerImg.querySelector(".bi-plus-circle");
let removelist = trailerImg.querySelector(".bi-check-circle");
let addliked = trailerImg.querySelector(".bi-hand-thumbs-up");
let removeliked = trailerImg.querySelector(".bi-hand-thumbs-up-fill");
addlist.addEventListener("click", () => {
    addWishlist(addlist, removelist, media, movieId, movieName, movieImgSrc)
})
removelist.addEventListener("click", () => {
    removeWishlist(addlist, removelist, movieId)
})
addliked.addEventListener("click", () => {
    addlikedList(addliked, removeliked, movieId)
})
removeliked.addEventListener("click", () => {
    removeLikedList(addliked, removeliked,movieId)
})
function addWishlist(add, remove, media, movieId, movieName, movieImgSrc) {
    console.log(typeof movieId)
    let wishlistRecord = {
        src: movieImgSrc,
        id: movieId,
        mediatype: media,
        MovieName: movieName
    };
    wishlist.push(wishlistRecord);
    userData[userID].wishlisted = wishlist;
    localStorage.setItem("userData", JSON.stringify(userData));
    add.classList.add("d-none");
    remove.classList.remove("d-none");
}

function removeWishlist(add, remove, movieId) {
    wishlist = wishlist.filter(item => item.id !== movieId);
    userData[userID].wishlisted = wishlist;
    localStorage.setItem("userData", JSON.stringify(userData));
    remove.classList.add("d-none");
    add.classList.remove("d-none");
}
function addlikedList(add, remove, movieId) {
    let likedRecord = {
        id: movieId,
    };
    liked.push(likedRecord);
    userData[userID].liked = liked;
    localStorage.setItem("userData", JSON.stringify(userData));
    add.classList.add("d-none");
    remove.classList.remove("d-none");
}

function removeLikedList(add, remove, movieId) {
    liked = liked.filter(item => item.id !== movieId);
    userData[userID].liked = liked;
    localStorage.setItem("userData", JSON.stringify(userData));
    remove.classList.add("d-none");
    add.classList.remove("d-none");
}

// function for hiding the div on mouseleave event on each movie
export function removeVideo() {
    // console.log("close")
    const trailerImg = document.querySelector(".trailerImg")
    trailerImg.classList.add("d-none");
    trailerImg.classList.remove("d-block");
}







// function for playing the video on play button click
export function createTrailer(mediaType, id) {
    let videopath = api.videoPath(mediaType, id);
    fetch(videopath).then(res => res.json()).then(data => {
        if (data.results.length != 0) {
            let key = data.results[0].key
            localStorage.setItem("key", key);
            location.href = "trailer.html";
        }
    })
}


//function for showing the information div

export function createInfo(mediaType, id, name, imageurl) {
    console.log(id)
    player1 = undefined;
    let movieDetails = document.querySelector(".moviedetails");
    // console.log(player1)
    fetch(api.videoPath(mediaType, id)).then(res => res.json()).then(data => {
        const trailervideo = document.querySelector(".movievideo");
        //  console.log(data)
        if (data.results.length != 0) {
            let key = data.results[0].key
            trailervideo.innerHTML = `<iframe id="player1" class="trailervideo" width="100%" height="100%" src="https://www.youtube.com/embed/${key}?enablejsapi=1&;autoplay=1&;mute=1&;controls=0&;loop=1&;playlist=${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                </iframe>`
            console.log("hello")
            player1 = new YT.Player("player1");
        }
        else {
            trailervideo.innerHTML = `<img width="100%" height="100%" src="${imageurl}" alt="${name}"></div>`
        }
        movieDetails.innerHTML = `<h1 class="mb-4">${name}</h1>
        <div class="d-flex buttoninfo  align-items-center  justify-content-between">
        <div class="d-flex">
        <button class="btn play bg-white d-flex px-4 fs-5 me-3 fw-bold align-items-center" ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-fill " viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>Play</button>
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-plus-circle me-3" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-check-circle me-2 d-none" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-hand-thumbs-up " viewBox="0 0 16 16">
  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-hand-thumbs-up-fill d-none" viewBox="0 0 16 16">
  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
</svg>
</div>
<div class="volume" >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-volume-up d-none" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
  <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-volume-mute d-inline" viewBox="0 0 16 16">
  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
</svg></div></div>`
        console.log(player1)
        if (player1 === undefined) {
            document.querySelector(".volume").classList.add("d-none");
        }
        else {
            document.querySelector(".volume").classList.remove("d-none");
        }
        movieDetails.querySelector(".play").addEventListener("click", () => {
            createTrailer(mediaType, id)
        })
        movieDetails.querySelector(".volume").addEventListener("click", () => {
            infoVolume('moviedetails');
        })
        let addListBtn = movieDetails.querySelector(".bi-plus-circle");
        let removeListBtn = movieDetails.querySelector(".bi-check-circle");
        let addlikedBtn = movieDetails.querySelector(".bi-hand-thumbs-up");
        let removelikedBtn = movieDetails.querySelector(".bi-hand-thumbs-up-fill");

        addListBtn.addEventListener("click", () => {
            addWishlist(addListBtn, removeListBtn, mediaType,id, name, imageurl)
        })
        removeListBtn.addEventListener("click", () => {
            removeWishlist(addBtn, removeBtn,id)
        })
        addlikedBtn.addEventListener("click", () => {
            addlikedList(addlikedBtn, removelikedBtn, id)
        })
        removelikedBtn.addEventListener("click", () => {
            removeLikedList(addlikedBtn, removelikedBtn, id )
        })
    })
    fetch(api.details(mediaType, id)).then(res => res.json()).then(data => {
        // console.log(data)
        let div = document.querySelector(".timeinfo");
        getDetails(mediaType, div, data)

        let overviewdiv = document.querySelector(".overview");
        overviewdiv.innerHTML = data.overview;
        if (player !== undefined) {
            player.pauseVideo();
        }
        if (wishlist.length) {
            let isWishList = false;
            wishlist.map(item => {
                // console.log( item.id,id)
                if (item.id == id) {
                    isWishList = true;
                }
            })
            if (isWishList) {
                movieDetails.querySelector(".bi-plus-circle").classList.add("d-none");
                movieDetails.querySelector(".bi-check-circle").classList.remove("d-none");
            }
            else {
                movieDetails.querySelector(".bi-check-circle").classList.add("d-none");
                movieDetails.querySelector(".bi-plus-circle").classList.remove("d-none");
            }
        }
        if (liked.length) {
            let isliked = false;
            liked.map(item => {
                // console.log(id,item.id)
                if (item.id == id) {
                    isliked = true;
                }
        //   console.log(isliked)
            })

            if (isliked) {
                movieDetails.querySelector(".bi-hand-thumbs-up").classList.add("d-none");
                movieDetails.querySelector(".bi-hand-thumbs-up-fill").classList.remove("d-none");
            }
            else {
                movieDetails.querySelector(".bi-hand-thumbs-up-fill").classList.add("d-none");
                movieDetails.querySelector(".bi-hand-thumbs-up").classList.remove("d-none");
            }
        }
        document.querySelector(".information").classList.add("d-block");
        document.querySelector(".information").classList.remove("d-none");
    })
}


//function for hiding the information div
let close = document.querySelector(".closeicon");
document.addEventListener("click",closeInfo)
close.addEventListener("click", closeInfo)
function closeInfo() {
    console.log("hello")
    if (player !== undefined) {
        player.playVideo();
    }
    if (player1 !== undefined) {
        player1.stopVideo();
    }
    document.querySelector(".information").classList.remove("d-block");
    document.querySelector(".information").classList.add("d-none");
}


//function for mute and unmute the player
export function bannerVolume(container) {

    volumeControl(document.querySelector(`.${container}`), player)
}
export function infoVolume(container) {
    volumeControl(document.querySelector(`.${container}`), player1)
}
function divVolume(container) {
    volumeControl(document.querySelector(`.${container}`), player2)
}
function volumeControl(container, player) {
    if (player.isMuted()) {
        player.unMute();
        container.querySelector(".bi-volume-mute").classList.remove("d-inline");
        container.querySelector(".bi-volume-mute").classList.add("d-none");
        container.querySelector(".bi-volume-up").classList.add("d-inline");
        container.querySelector(".bi-volume-up").classList.remove("d-none");

    }
    else {
        player.mute();
        container.querySelector(".bi-volume-mute").classList.add("d-inline");
        container.querySelector(".bi-volume-mute").classList.remove("d-none");
        container.querySelector(".bi-volume-up").classList.remove("d-inline");
        container.querySelector(".bi-volume-up").classList.add("d-none");
    }
}



function getDetails(mediatype, div, data) {
    if (mediatype == "movie") {
        let totalMins = data.runtime;
        let hours = Math.floor(totalMins / 60);
        let minutes = totalMins % 60;

        div.innerHTML = `${hours}h ${minutes}m`;
    }
    if (mediatype == "tv") {
        let season = data.number_of_seasons
        if (season == 1) {
            const episode = data.number_of_episodes;
            div.innerHTML = `${episode} episodes`;
        }
        else {
            div.innerHTML = `${season} seasons`;

        }
    }

}



