// sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get account info
    const nama = signupForm['signup-nama'].value;
    const nip = signupForm['signup-nip'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        signupForm.reset();
    });
});