let loggedInUser = JSON.parse(localStorage.getItem("login"));
console.log(loggedInUser)
document.querySelector(".email").innerHTML=loggedInUser.EmailId;
document.querySelector(".user").innerHTML=loggedInUser.EmailId;
let length=loggedInUser.Password.length;
for(let i=0; i<length; i++)
{
    document.querySelector(".password").innerHTML+="*"
}