// sign up
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get account info
        const nama = signupForm['signup-nama'].value;
        const nip = signupForm['signup-nip'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;

        // signup the user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            signupForm.reset();
        });
    });
}

// logout
const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener('click', (e) => {
        // e.preventDefault();
        auth.signOut().then(() => {
            console.log('user signed out');
            window.location.href = "login.html";
        });
    })
}

// login
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user)
            // masuk ke halaman utama
            window.location.href = "index.html";
        })
    })
}