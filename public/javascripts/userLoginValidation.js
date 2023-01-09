const form = document.getElementById("form")
const errorMessage = document.getElementById("errorMessage")


function showError(error) {
    errorMessage.innerHTML = `<div class="alert alert-warning" role="alert">
    ${error}
    <div class="close" style="cursor:pointer" onclick="clearErrorMessage()">X</div>
    </div>`
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
        errorMessage.innerHTML = "";
    }, 3000);
}


function clearErrorMessage() {
    errorMessage.innerHTML = ""
    clearTimeout(timeOut)
}

form.onsubmit = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (email === "") {
        showError("please enter the email");
        return false
    }
    if (!email.match(emailRegx)) {
        showError("enter the valid email");
        return false
    }
    if (password === "") {
        showError("enter the password")
        return false
    }
    if (!password.match(passwordRegx)) {
        showError("password must be one special charactor,letter and number")
        return false
    }
    if (password != confirmPassword) {
        showError("enter the correct password")
        return false
    }

    return true
}

showPassword.onclick = (e) => {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    if (password.type === 'text') {
        password.type = 'password'
        confirmPassword.type = 'password'
    } else {
        password.type = 'text'
        confirmPassword.type = 'text'
    }
}