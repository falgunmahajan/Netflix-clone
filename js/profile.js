let loggedInUser = JSON.parse(localStorage.getItem("login"));
let profileicon=document.querySelector(".profile-icon");
let dropdownicon=document.querySelector(".bi-caret-down-fill");
let dropupicon=document.querySelector(".bi-caret-up-fill");
profileicon.addEventListener("mouseenter",showProfileDiv);
dropdownicon.addEventListener("mouseenter",showProfileDiv);
console.log(profileicon,dropdownicon,dropupicon)
// profileicon.addEventListener("mouseleave",removeProfileDiv);
// dropdownicon.addEventListener("mouseleave",removeProfileDiv);
let accountdiv=document.querySelector(".account");

function showProfileDiv(e)
{
    console.log(e.target)
    dropupicon.classList.remove("d-none");
    dropdownicon.classList.add("d-none");
    accountdiv.innerHTML=`<div class="mb-4"> <img class="profile-icon me-2" src="https://occ-0-4995-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229" alt="">${ loggedInUser.EmailId}</div>
    <div><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person me-3" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
  </svg><a class="link-light" href="account.html">Account</a></div>
  <hr class="w-100 p-0">
  <button class="btn signout w-100 text-center text-white">Sign out of Netflix</button>`
  accountdiv.classList.remove("d-none")
  let signOut=document.querySelector(".signout");
  accountdiv.addEventListener("mouseleave",removeProfileDiv)
signOut.addEventListener("click",()=>
{
    localStorage.removeItem("login");
    location.href="index.html";
})
}
function removeProfileDiv()
{
    dropupicon.classList.add("d-none");
    dropdownicon.classList.remove("d-none");
    accountdiv.classList.add("d-none")
}