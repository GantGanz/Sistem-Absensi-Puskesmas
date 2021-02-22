// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user.email);
        if (typeof setupAccountDetails !== "undefined") {
            setupAccountDetails(user);
        };
        // if (typeof allAccountDetails !== "undefined") {
        //     allAccountDetails();
        // };
    } else {
        // setupPresensi([]);
        if (window.location.pathname != "/Sistem-Absensi-Puskesmas/login.html") {
            console.log(window.location.pathname);
            window.location.href = "login.html";
        };
    }
})

// get data presensi
db.collection('presensi').onSnapshot(snapshot => {
    if (typeof setupPresensi !== "undefined") {
        setupPresensi(snapshot.docs);
    }
}, error => {
    console.log(error)
});

// get all account data
// db.collection('users').onSnapshot(snapshot => {
//     if (typeof allAccountDetails !== "undefined") {
//         allAccountDetails(snapshot.docs);
//     }
// }, error => {
//     console.log(error)
// });

//  create new presensi
const addPresensi = document.querySelector('#add-Presensi');
if (addPresensi) {
    addPresensi.addEventListener('click', (e) => {
        e.preventDefault();

        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        db.collection('presensi').add({
            email: 'email user',
            foto: 'foto user',
            level: 'level user',
            nama: 'nama user',
            nip: 'nip user',
            waktu: dateTime
        }).then(
            console.log("melakukan presensi")).catch(err => console.log(err.message));
    })
}

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
        const level = signupForm['signup-level'].value;

        // signup the user without log in
        var config = {
            apiKey: "AIzaSyC6hyl-k9rVuAs8JYD8KUtcVXsMwqZTQI0",
            authDomain: "presensi-puskesmas-kasiman.firebaseapp.com",
            // databaseURL: "https://databaseName.firebaseio.com"
        };
        var secondaryApp = firebase.initializeApp(config, "Secondary");

        secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(cred => {

            secondaryApp.auth().signOut();
            secondaryApp.delete();
            return db.collection('users').doc(cred.user.uid).set({
                nama: nama,
                nip: nip,
                level: level
            });
        }).then(() => {
            console.log("User created successfully!");
            signupForm.reset();
        });


        // auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //     signupForm.reset();
        // });
    });
}

// logout
const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener('click', (e) => {
        // e.preventDefault();
        // auth.signOut().then(() => {
        //     window.location.href = "login.html";
        // });
        auth.signOut();
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
            window.location.href = "index.html";
        })
    })
}