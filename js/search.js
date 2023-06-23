import { searchApi } from "./api.js";
import{createSearchSection}from "./searchDivision.js"
let Input=document.querySelector(".text");
console.log(Input)
let searchValue=sessionStorage.getItem("search");
let location=localStorage.getItem("location")
console.log(location)
Input.value=searchValue;
Input.focus();

Input.addEventListener("keyup",()=>{
    if(!Input.value)
    {
        console.log(Input.value)
        window.location.href=`${location}`;
    }
    else{
        fetchSearchResult();
    }
})

let searchResult=[];
fetchSearchResult();
let searchTv,searchMovie,searchPerson,searchPersonMovie;
function fetchSearchResult()
{
    searchResult=[];
     fetchApi("tv").then(data=>{
        searchTv=data.results;
        if(searchTv.length)
        {
            searchResult.push(searchTv)
        }
        console.log(searchTv)
    });
    fetchApi("movie").then(data=>{
        searchMovie=data.results;
        if(searchMovie.length)
        {
            searchResult.push(searchMovie)
        }
        console.log(searchMovie)
    });
    fetchApi("person").then(data=>{
        searchPerson=data.results;
        console.log(searchPerson)
        if(searchPerson)
        {
        searchPerson.forEach(item=>
            {
                searchPersonMovie=item.known_for;
                if(searchPersonMovie.length)
        {
            searchResult.push(searchPersonMovie)
        }
                console.log(searchPersonMovie)
    
            }
        )
        } 
        console.log(searchResult)
        createSearchSection(searchResult)
    });
   
}
function fetchApi(media){
    console.log("function")
   return fetch(searchApi.url(media,Input.value)).then(res=>res.json()).then(data=>{
    return data
   })
}