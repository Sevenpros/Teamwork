const loginForm=document.querySelector('.login-form');
const signupForm=document.querySelector('.signup-form');
const loginSwitchs=document.querySelectorAll('.login-switch');
const signUpSwitchs=document.querySelectorAll('.signup-switch');
const loginContent=document.querySelector('[login]');
const signupContent=document.querySelector('[signup]');
const articles=document.querySelectorAll('.art-body');
const deleteButtons=document.querySelectorAll('.delete-article');
const edits=document.querySelectorAll('.edit-icon');
let modal = document.querySelector("#myModal");
let delModal=document.querySelector('#deleteModal')
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
for(let article of articles){
    article.addEventListener('click',event=>{
        event.preventDefault();
        modal.style.display='block';
       
        
    })
}
for(let delButton of deleteButtons){
    delButton.addEventListener('click',event=>{
        event.preventDefault();
   
        delModal.style.display='block';
    
    })
}
edits.forEach((element,index) => {
    element.addEventListener('click',event=>{
        event.preventDefault();
        const currentArticle=document.querySelectorAll('.art-body p')[index].textContent;
       const articleInput=document.querySelector('.article-input');
       articleInput.textContent=currentArticle;
       //articleInput.focus();
    })
});
// Get the <span> element that closes the modal
let span = document.querySelectorAll(".close")[0];
let span2 = document.querySelectorAll(".close")[1];
span.onclick = () =>{
  modal.style.display = "none";
}
span2.onclick = () =>{
    delModal.style.display = "none";
  }
window.onclick = event=> {
  if (event.target == modal ||event.target == delModal) {
    modal.style.display = "none";
    delModal.style.display='none';
  }
}


