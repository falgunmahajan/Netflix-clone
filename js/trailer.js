
    let key = localStorage.getItem("key");
var videoPlayer;
let trailercontainer = document.querySelector(".trailercontainer");
trailercontainer.innerHTML = `<iframe id="video"  width="100%" height="100%" src="https://www.youtube.com/embed/${key}?enablejsapi=1&;autoplay=1&;controls=0&;loop=1&;playlist=${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`


