let signOut=document.querySelector(".signout");
signOut.addEventListener("click",()=>
{
    localStorage.removeItem("login");
    location.href="index.html";
})
let next=document.querySelector(".next");
next.addEventListener("click",()=>
{
    location.href="plan.html"
})