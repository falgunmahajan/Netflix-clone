window.onload = function () {
    let mail = document.querySelector(".mail");
    mail.value = sessionStorage.getItem("inputValue");
    let password = document.querySelector(".pswd");
    let next = document.querySelector(".next");
    let form = document.querySelector("#form");
    mail.addEventListener("keyup", isValid);
    function isValid() {
        if ((mail.value).length < 5) {
            document.querySelector(".msg1").innerHTML = "*Email is required";
            mail.classList.add("border-danger");
            return false
        }
        else if ((!(/^([_\.\- 0-9a-z A-z]+)@([_\.\- 0-9a-z A-z]+)\.([a-zA-Z]{2,7})$/).test(mail.value))) {
            document.querySelector(".msg1").innerHTML = "*Please provide the valid email";
            mail.classList.add("border-danger");
            return false;
        }
        else {
            document.querySelector(".msg1").innerHTML = "";
            mail.classList.remove("border-danger");
            return true;
        }
    }
    password.addEventListener("keyup", isPassword);
    function isPassword() {
        if (!password.value) {
            document.querySelector(".msg2").innerHTML = "*Password is required";
            password.classList.add("border-danger");
            return false
        }
        else if ((password.value).length < 6) {
            document.querySelector(".msg2").innerHTML = "*Password should be between 6 and 60 characters long.";
            password.classList.add("border-danger");
            return false;
        }
        else {
            document.querySelector(".msg2").innerHTML = "";
            password.classList.remove("border-danger");
            return true;
        }
    }
    next.addEventListener("click", (e) => {
        e.preventDefault();
        if (!isValid() && !isPassword()) {
            mail.focus();
        }
        else if (!isPassword()) {
            password.focus();
        }
        else if (!isValid()) {
            mail.focus();
        }
        else {
            let userId=(function () {
                if (localStorage.getItem("userID") === null) {
                    return 0;
                }
                return JSON.parse(localStorage.getItem("userID"));
            })();
            let formData = new FormData(form);
            let formValues = formData.entries();
            let user = Object.fromEntries(formValues);
            user.id=userId;
            user.wishlisted=[];
            user.liked=[];
            let userData = (function () {
                if (localStorage.getItem("userData") === null) {
                    return [];
                }
                return JSON.parse(localStorage.getItem("userData"));
            })();
            function setData()
            {
                userData.push(user);
                localStorage.setItem("userData", JSON.stringify(userData))
                localStorage.setItem("userID",userId+1);
                location.href = "thirdreg.html";
            }
            if (userData.length==0) {
                setData();
            }
            else if(isRegister())
            {
                document.querySelector(".alert").classList.remove("d-none")
            }
        
            else {
               
                setData();
            }
        
function isRegister()
{
    for (let i = 0; i < userData.length; i++) {
        if (user.EmailId === userData[i].EmailId) {
           return true;
        }
        
}
return false;
}
    }
    })
}