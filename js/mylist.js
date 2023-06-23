import { createUrl } from "./function.js";
document.addEventListener("click",pageLoad)
function pageLoad()
{
    let loggedInUser=JSON.parse(localStorage.getItem("login"));
    let userID=loggedInUser.id;
    let userData=JSON.parse(localStorage.getItem("userData"))
    let wishlist=userData[userID].wishlisted;
   let images= wishlist.map(item=>{
    return `<img class="image-item me-3 mb-5" id="${item.id}" src="${item.src}" alt="${item.MovieName}" media="${item.mediatype}">`
    }).join('');
    document.querySelector(".movies-division").innerHTML=images;
    let movieItem=document.querySelectorAll(".image-item");
    movieItem.forEach(item=>{
        item.addEventListener("mouseenter",(e)=>{
            let img=e.target;
            let id=e.target.id;
            let media=e.target.getAttribute("media");
            let name=e.target.getAttribute("alt");
            let src=e.target.src;
            console.log(name)
            createUrl(img, media, id,src,name)
        })
    })
}
pageLoad();