
let signIn = document.querySelector(".signin");
let start1 = document.querySelector(".start");
let mail1 = document.querySelector(".email");
let start2 = document.querySelector(".start1");
let mail2 = document.querySelector(".email1");
let msg1 = document.querySelector(".msg1");
let msg2 = document.querySelector(".msg2");

if(localStorage.getItem("login"))
{
    location.href="main.html"
}
mailValue();
signIn.addEventListener("click", () => {
    location.href = "signin.html";
    mailValue();
})
let userData = JSON.parse(localStorage.getItem("userData"));
function isRegister(mail) {
    if(userData)
    {
        for (let i = 0; i < userData.length; i++) {
            if (mail.value=== userData[i].EmailId) {
                return true;
            }
    
        }
    }
    return false;
}
start1.addEventListener("click", () => {
    if (isClicked(mail1)) {
        if (isValid(mail1, msg1)) {
            if(isRegister(mail1))
        {
            location.href="login.html"
        }
        else{
            location.href = "firstreg.html";
            mailValue();
        }
        }
        else {
            mail1.focus();
        }
    }

})
start2.addEventListener("click", () => {
    if (isClicked(mail2)) {
        if (isValid(mail2, msg2)) {
            if(isRegister(mail2))
            {
                location.href="login.html"
            }
            else{
            location.href = "firstreg.html";
            mailValue();
            }
        }
        else {
            mail2.focus();
        }
    }

})
function isClicked(mail) {
    if (!mail.value) {
        mail.focus();
        return false;
    }
    return true;
}

mail1.addEventListener("keyup", () => {
    isValid(mail1, msg1)
})
mail2.addEventListener("keyup", () => {
    isValid(mail2, msg2)
})
function isValid(mail, msg) {
    if ((mail.value).length<5) {
        msg.innerHTML = "*Email is required";
        mail.classList.add("border-danger");
        return false
    }
    else if ((!(/^([_\.\- 0-9a-z A-z]+)@([_\.\- 0-9a-z A-z]+)\.([a-zA-Z]{2,7})$/).test(mail.value))) {
        msg.innerHTML = "*Please provide the valid email";
        mail.classList.add("border-danger");
        return false;
    }
    else {
        msg.innerHTML = "";
        mail.classList.remove("border-danger");
        sessionStorage.setItem("inputValue", mail.value);
        return true;
    }
}
function mailValue() {
    mail1.value = sessionStorage.getItem("inputValue")
    mail2.value = sessionStorage.getItem("inputValue")
}

