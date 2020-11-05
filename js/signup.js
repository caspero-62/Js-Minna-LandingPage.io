const signup = document.querySelector('.signup');
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const signupEmail = document.querySelector('#email');
const signupPassword = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const agree = document.querySelector('#agree');
const errorMessage = document.querySelectorAll('.error__message');
const signupSubmit = document.querySelector('#submit');
const spinner = document.querySelector('.spinner');
const status = document.querySelector('.form__submission__status');

let allChecksSignup = [];


// Regex checks
const testValue = (param, value) => {
    let re;

    switch(param) {
        case 'firstName':
            re = /^[^0-9\s]*[^0-9]+$/
            break;
        case 'lastName':
            re = /^[^0-9\s]*[^0-9]+$/
            break;
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

// push true to check array if pattern is matched
const decideSignup = (param, value) => {
    if(testValue(param, value)){
        allChecksSignup.push(true)
    } else {
        allChecksSignup.length ? 
        allChecksSignup.pop() :
        null
    }
}

// check if all patterns on the form are matched before enabling button
const checks = (inputName, number) => {
    switch (inputName && number) {
        case firstName && 0:
            decideSignup('firstName', firstName.value)
            break;
        case lastName && 1:
            decideSignup('lastName', lastName.value)
            break;
        case signupEmail && 2:
            decideSignup('email', signupEmail.value)
            break;
        case signupPassword && 3:
            decideSignup('password', signupPassword.value)
            break;
        case confirmPassword && 7:
            if(password.value === confirmPassword.value && confirmPassword.value.length >= 8) {  
                allChecksSignup.push(true)
            } else {   
                allChecksSignup.length ? 
                allChecksSignup.pop() :
                null
            }
            break;
    }
}

const testName = (inputName, number) => {
    if (!testValue(inputName === firstName ? 'firstName' : 'lastName', inputName.value)) {
        errorMessage[number].innerHTML = 'sorry, enter a valid name'
    } else {
        errorMessage[number].innerHTML = '<i class="fas fa-check"></i>'
    }
}

const testEmail = (inputName, number) => {
    if (!testValue('email', inputName.value)) {
        errorMessage[number].innerHTML = 'sorry, enter a valid email adress e.g: example@example.com'
    } else {
        errorMessage[number].innerHTML = '<i class="fas fa-check"></i>'
    }
}

const testPassword = (inputName, number) => {
    if ((testValue('password', inputName.value)) && inputName.value.length >= 8) {
        errorMessage[number].innerHTML = '<i class="fas fa-check"></i>'
    } else {
        errorMessage[number].innerHTML = 'password must be 8 characters with at least a special character, lowercase and uppercase letter'
    }
}

const submitForm = (e) => {
    e.preventDefault();
    spinner.classList.remove('none');
    status.innerHTML = 'form submitted successfully'
    setTimeout(() => {
        errorMessage.forEach(err => err.innerHTML = '')
        signup.reset();
        status.innerHTML = '';
        location.replace('./login.html');
        spinner.classList.add('none');
    }, 2000)
}



// ===============Event Listeners=============== //

firstName.addEventListener('keyup', () => testName(firstName, 0))
firstName.addEventListener('change', () => checks(firstName, 0))

lastName.addEventListener('keyup', () => testName(lastName, 1))
lastName.addEventListener('change', () => checks(lastName, 1))

signupEmail.addEventListener('keyup', () => testEmail(signupEmail, 2))
signupEmail.addEventListener('change', () => checks(signupEmail, 2))

signupPassword.addEventListener('keyup', () => testPassword(signupPassword, 3))
signupPassword.addEventListener('change', () => checks(signupPassword, 3))

confirmPassword.addEventListener('keyup', (e) => {
    e.preventDefault();
    if ((password.value === confirmPassword.value && confirmPassword.value.length >= 8)) {
        errorMessage[3].innerHTML = '<i class="fas fa-check"></i>'
        errorMessage[4].innerHTML = '<i class="fas fa-check"></i>'
    } else {
        errorMessage[3].innerHTML = 'passwords must match'
        errorMessage[4].innerHTML = 'passwords must match'
    }
})
confirmPassword.addEventListener('change', () => checks(confirmPassword, 7))

agree.addEventListener('click', () => {
    
    if (agree.checked) {
        allChecksSignup.push(true)
    } else {
        allChecksSignup.length ? allChecksSignup.pop() : null
    }
    
    console.log(allChecksSignup)
    
    verifyCheck = allChecksSignup.filter(check => check !== true)
    
    if ((allChecksSignup.length === 6) && (verifyCheck.length === 0)){
        signupSubmit.disabled = false;
    } else {
        signupSubmit.disabled = true
    }
    
})

signup.addEventListener('submit', submitForm)
// ===============Event Listeners=============== //


// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$ ==> Password
