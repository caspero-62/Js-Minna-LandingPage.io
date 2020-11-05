const login = document.querySelector('.login');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const loginSubmit = document.querySelector('#login-submit');
const errorMessage = document.querySelectorAll('.error__message');
const spinner = document.querySelector('.spinner');
const status = document.querySelector('.form__submission__status');

let allChecksLogin = [];

// Regex checks
const testValue = (param, value) => {
    let re;

    switch(param) {
        case 'email':
            re = /^[^\.\s].*@([a-zA-Z])+(\.(com|net|info|de|org))$/
            break;
        case 'password':
            re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            break;
        default:
            re = null
            break;
    }

    return re.test(value);

}

const testEmail = (inputName, number) => {
    if (!testValue('email', inputName.value)) {
        errorMessage[number].innerHTML = 'sorry, enter a valid email adress e.g: example@example.com'
        status.innerHTML = 'Error in Submission'
        setTimeout(() => {
            spinner.classList.add('none');
        }, 2000)
    } else {
        status.innerHTML = 'Login Successful'
        setTimeout(() => {
            errorMessage.forEach(err => err.innerHTML = '')
            login.reset();
            status.innerHTML = '';
            location.replace('./landing-page.html');
            spinner.classList.add('none');
        }, 2000)
    }
}

const submitForm = (e) => {
    e.preventDefault();
    spinner.classList.remove('none');

    testEmail(loginEmail, 0)
}

loginPassword.addEventListener('keyup', () => {
    if(loginPassword.value.length >= 8 && loginEmail.value.length > 1) {
        loginSubmit.disabled = false;
    } else {
        loginSubmit.disabled = true;
    }
})

login.addEventListener('submit', submitForm)