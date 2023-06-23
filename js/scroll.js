import{player} from "./sections.js"
let navbar=document.querySelector(".navbar");
window.addEventListener("scroll",()=>{
    if(window.scrollY>100)
    {
        navbar.classList.add("bg-black");
        navbar.classList.remove("bg-transparent");
    }
    else{
        navbar.classList.add("bg-transparent");
        navbar.classList.remove("bg-black");
    }
})

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        player.pauseVideo();
    }
    else {
        player.playVideo();
    }
})
