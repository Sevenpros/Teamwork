const loginForm=document.querySelector('.login-form');
const signupForm=document.querySelector('.signup-form');
const loginSwitchs=document.querySelectorAll('.login-switch');
const signUpSwitchs=document.querySelectorAll('.signup-switch');
const loginContent=document.querySelector('[login]');
const signupContent=document.querySelector('[signup]');
for(let logins of loginSwitchs){
    logins.addEventListener('click',event=>{
        event.preventDefault();
      
        signupForm.classList.remove('active-form');
        loginForm.classList.add('active-form');
        signupContent.style.display='none';
        loginContent.style.display='block';
    })
}
for(let signups of signUpSwitchs){
    signups.addEventListener('click',event=>{
        event.preventDefault();
        
        loginForm.classList.remove('active-form');
        signupForm.classList.add('active-form');
        loginContent.style.display='none';
        signupContent.style.display='block';
        
    })
}
