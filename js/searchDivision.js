import{api}from "./api.js";
import { createUrl } from "./function.js";
export function createSearchSection(searchResults)
{
    if(!searchResults.length)
    {
         console.log("hdgf")
    }
    
    else{

        console.log(searchResults)
    let images=searchResults.map(item=>{
      return item.map(subitem=>{
        console.log(subitem)
            let imagepath=(subitem.backdrop_path==null)?subitem.poster_path:subitem.backdrop_path;
            let name=(subitem.original_title)?subitem.original_title:subitem.original_name;
            let media=(function()
            {
                if((subitem.original_title))
                {
                    return "movie";
                }
                else if(subitem.original_name)
                {
                    return "tv"
                }
                else{
                    return subitem.media_type;
                }
            })();
            // console.log(name)
            // console.log(media)
            return `<img class="image-item me-3 mb-5" id="${subitem.id}" src="${api.imagePath}${imagepath}" alt="${name}" media="${media}">`
        }).join('')
    }).join('')
    console.log(images)
        document.querySelector(".movies-division").innerHTML=images;
        let movieItem=document.querySelectorAll(".image-item");
        movieItem.forEach(item=>{
            item.addEventListener("mouseenter",(e)=>{
                let img=e.target;
                let id=e.target.id;
                let media=e.target.getAttribute("media");
                let name=e.target.getAttribute("alt");
                let src=e.target.src;
                createUrl(img, media, id,src,name)
            })
    })
}
}