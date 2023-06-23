window.onload = function () {
    let mail = document.querySelector(".mail")
    mail.value = sessionStorage.getItem("inputValue");
    let password = document.querySelector(".pswd");
    let learnMore = document.querySelector(".learnmore");
    let hiddenContent = document.querySelector(".hidden");
    let msg1 = document.querySelector(".msg1");
    let msg2 = document.querySelector(".msg2");
    let sign = document.querySelector(".sign");
    let person;
    learnMore.addEventListener("click", () => {
        hiddenContent.classList.remove("d-none");
        learnMore.classList.add("d-none");
    })
    mail.addEventListener("keyup", isEmail);
    password.addEventListener("keyup", isPassword);
    let userData = JSON.parse(localStorage.getItem("userData"));
    sign.addEventListener("click", (e) => {
        e.preventDefault();
        if (!isEmail() && !isPassword()) {
            e.preventDefault();
        }
        if (isEmail() && isPassword()) {
            let formData = new FormData(form);
            let formValues = formData.entries();
            let user = Object.fromEntries(formValues);
            if (isRegister()) {
                if(userData[person].Password==user.Password)
                {
                    user.id=person;
                    localStorage.setItem("login",JSON.stringify(user));
                location.href = "main.html";
                }
                else{
                    document.querySelector(".alert").classList.remove("d-none");
                    document.querySelector(".alert").innerHTML=`<strong>Incorrect password.</strong> Please try again or you can <a href="index.html" class="link-dark">reset your password. </a>`
                    password.value="";
                }
            }
            else {
                document.querySelector(".alert").classList.remove("d-none");
                document.querySelector(".alert").innerHTML=` Sorry, we can't find an account with this email address. Please try again or  <a href="index.html" class="link-dark"> create a new account. </a>`
            }
            function isRegister() {
                for (let i = 0; i < userData.length; i++) {
                    if (user.EmailId === userData[i].EmailId) {
                        person=i;
                        return true;
                    }

                }
                return false;
            }
        }
        
    })
    function isEmail() {
        if ((mail.value).length<5) {
            msg1.innerHTML = "*Please enter a valid email address or phone number.";
            return false;
        }
        else {
            msg1.innerHTML = "";
            return true;
        }
    }
    function isPassword() {
        if (((password.value).length < 5)) {
            msg2.innerHTML = "*Your password must contain between 4 and 60 characters.";
            return false;
        }

        else {
            msg2.innerHTML = "";
            return true;
        }
    }


}