let email=sessionStorage.getItem("inputValue");

let mailbox=document.querySelector(".mail");
mailbox.innerHTML=email;
let password=document.querySelector(".pswd");
let nextbtn=document.querySelector(".next");
password.addEventListener("keyup",isPassword);
let user={
    EmailId:email,
    Password:password.value
};
nextbtn.addEventListener("click",()=>
{
    if(!password.value)
    {
        document.querySelector(".msg").innerHTML="";
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alertmsg").innerHTML="Your password must contain between 4 and 60 characters."
    }
    else if(!isPassword())
    {
        password.focus();
    }
    else if(!registerPassword())
    {
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alertmsg").innerHTML=`<strong>Incorrect password.</strong> Please try again or you can <a href="index.html" class="link-dark">reset your password. </a>`
    }
    else{
        localStorage.setItem("login",JSON.stringify(user));
        location.href="main.html"
    }
})
let userData=JSON.parse(localStorage.getItem("userData"));
function registerPassword()
{
    for(let i=0; i<userData.length; i++)
    {
        if(email==userData[i].EmailId)
        {
            if(password.value==userData[i].Password)
            {
                return true;
            }
        }
    }
    return false;
}
function isPassword()
{
    if(!password.value)
    {
        document.querySelector(".msg").innerHTML="*Password is required";
        return false;
    }
    else if((password.value).length<4)
    {
        document.querySelector(".msg").innerHTML="*Password should be between 4 and 60 characters long.";
        return false;
    }
    else{
        document.querySelector(".msg").innerHTML="";
        return true;
    }
}