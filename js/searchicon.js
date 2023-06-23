console.log("hdsg")
let searchIcon=document.querySelector(".bi-search");
let searchDiv=document.querySelector(".search");
let searchInput=document.querySelector(".text")
searchIcon.addEventListener("click",showSearchDiv)
export function showSearchDiv()
{
    console.log("hdsg")
    searchInput.classList.remove("d-none");
    searchDiv.classList.add("border");
    searchDiv.classList.add("bg-black");
    searchDiv.classList.add("p-1");
    searchInput.focus();
}



    localStorage.setItem("location",window.location.href);
    searchInput.addEventListener("keyup",search)
    function search(){
        if(searchInput.value){
            sessionStorage.setItem("search",searchInput.value);
        location.href="search.html";
        }
        
    }
