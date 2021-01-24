const accountForm = document.querySelector('.reg-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repass = document.getElementById('repass');
const userProfile = document.querySelector('.user-profile');
let lodgingOptions = [];

function validateUsername(){
    let valid = false;
    const usernameValue = username.value;
    if(!isRequired(usernameValue)){
        setErrorMessage(username, 'Username cannot be blank');
    }else if(!isUsernameValid(usernameValue)){
        setErrorMessage(username, 'Username must contain at least 3 characters. Digits are allowed')
    }
    else{
        clearError(username);
        valid = true;
    }
    return valid;
}

function validateEmail(){
    let valid = false;
    const emailValue = email.value;

    if(!isRequired(emailValue)){
        setErrorMessage(email, 'Email can not be blank');
    }else if(!isEmailValid(emailValue)){
        setErrorMessage(email, 'Not valid email')
    }else{
        clearError(email);
        valid = true;
    }

    return valid;
}

function validatePassword() { 
    let valid = false;
    const passwordValue = password.value;
    const repassValue = repass.value;

    if(!isRequired(passwordValue)){
        setErrorMessage(password, 'Password can not be blank');
    }else if(!isPasswordValid(passwordValue)){
        setErrorMessage(password, 'Password must contain at least 8 upper and lower character and digits');
    }else if(passwordValue !== repassValue){
        setErrorMessage(repass, "Password does not match")
    }else{
        clearError(password);
        clearError(repass);
        valid = true;
    }
 
    return valid;
}

function validateLodgings() { 
    let valid = false;
    const lodgingValue = document.querySelectorAll('input[name="lodging"]:checked');
    const errorCheckbox = document.querySelector('#error-checkbox');

    if(lodgingValue.length == 0){
        errorCheckbox.innerText = 'Select lodgings'
    }else{
        lodgingValue.forEach(option => {
            lodgingOptions.push(option.value);
        });
        errorCheckbox.innerText = '';
        valid = true;
    }
    return valid;
}

const  isRequired = value => value === '' ? false : true;

const isUsernameValid = (username) => {
    const usernameRegex = /^[A-Za-z]+([\ A-Za-z]+){2,15}$/;
    return usernameRegex.test(username);
}

const isEmailValid = (email) => {
    const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailRegex.test(email);
}

const isPasswordValid = (password) =>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return passwordRegex.test(password);
}

function clearError(input){
    const itemGroup = input.parentElement;
    const error = itemGroup.querySelector('small');
    error.innerText = '';
}

function setErrorMessage(input,message) { 
    const itemGroup = input.parentElement;
    const error = itemGroup.querySelector('small');
    error.innerText = message;
} 

function showUserProfile(){

    let user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        lodging: lodgingOptions
    }
        userProfile.innerHTML += `
        <p class="user-profile__name">Username</p>
        <p class="user-profile__name-value">${user.username}</p>

        <p class="user-profile__email">Email address</p>
        <p class="user-profile__email-value">${user.email}</p>

        <p class="user-profile__lodging">Preffered Lodgings</p>
        <div class="user-profile__lodgings-values"></div> `;

        const lodgingGroup = document.querySelector('.user-profile__lodgings-values');
        user.lodging.forEach(elem => {
            lodgingGroup.innerHTML += `
            <p>${elem}</p>`
        })
}

function createAccount(e){
    e.preventDefault();
    let isFormValid;
    let isUsernameValid = validateUsername()
    let isPasswordValid = validatePassword();
    let isEmailValid = validateEmail();
    let isLodgingValid = validateLodgings();
    isFormValid = isUsernameValid && isPasswordValid 
                    && isEmailValid  && isLodgingValid;
    if(isFormValid){
        showUserProfile();
        accountForm.reset(); 
    }else{
        lodgingOptions = [];
        return false
    }
}