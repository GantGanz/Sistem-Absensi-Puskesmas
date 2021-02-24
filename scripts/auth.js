const addPresensi = document.querySelector('#add-Presensi');
const signupForm = document.querySelector('#signup-form');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#login-form');

//  create new presensi
if (addPresensi) {
    addPresensi.addEventListener('click', (e) => {
        e.preventDefault();

        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        db.collection('presensi').add({
            username: localStorage.getItem("Username"),
            foto: 'foto user',
            // level: 'level user',
            nama: localStorage.getItem("Nama"),
            nip: localStorage.getItem("NIP"),
            waktu: dateTime
        }).catch(err => console.log(err.message));
    })
}

// fitur Khusus Admin
if (localStorage.getItem("Level") == "Admin") {
    // sign up
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // get account info
            const nama = signupForm['signup-nama'].value;
            const nip = signupForm['signup-nip'].value;
            const username = signupForm['signup-username'].value;
            const password = signupForm['signup-password'].value;
            const level = signupForm['signup-level'].value;

            db.collection('users').add({
                username: username,
                nama: nama,
                nip: nip,
                password: password,
                level: level
            }).then(() => {
                console.log("User created successfully!");
                signupForm.reset();
            }).catch(err => console.log(err.message));
        });
    }
}

// logout
if (logout) {
    logout.addEventListener('click', (e) => {
        // e.preventDefault();
        localStorage.removeItem("Username");
        localStorage.removeItem("Nama");
        localStorage.removeItem("NIP");
        localStorage.removeItem("Password");
        localStorage.removeItem("Level");
        window.location.href = "login.html";
    })
}

// login
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        document.getElementById("loader").style.display = "block";
        document.getElementById("bg-loader").style.display = "block";
        e.preventDefault();
        const username = loginForm['login-username'].value;
        const password = loginForm['login-password'].value;

        db.collection("users").where("username", "==", username).where("password", "==", password).get().then(doc => {
            if (doc.size > 0) {
                localStorage.setItem("Username", doc.docs[0].data().username);
                localStorage.setItem("Nama", doc.docs[0].data().nama);
                localStorage.setItem("NIP", doc.docs[0].data().nip);
                localStorage.setItem("Password", doc.docs[0].data().password);
                localStorage.setItem("Level", doc.docs[0].data().level);
                document.getElementById("loader").style.display = "none";
                document.getElementById("bg-loader").style.display = "none";
                window.location.href = "index.html";
            } else {
                document.getElementById("loader").style.display = "none";
                document.getElementById("bg-loader").style.display = "none";
                document.getElementById("alert-login").style.display = "block";
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            document.querySelector('#pesan-login').innerHTML = "Maaf, koneksi anda bermasalah atau server down";
            document.getElementById("loader").style.display = "none";
            document.getElementById("bg-loader").style.display = "none";
            document.getElementById("alert-login").style.display = "block";
        });
    })
} else {
    // cek autentikasi
    if (!localStorage.getItem("Username")) {
        window.location.href = "login.html";
    }
}

// listen for auth status changes
// auth.onAuthStateChanged(user => {
//     if (user) {
//         console.log('user logged in: ', user.username);
//         if (typeof setupAccountDetails !== "undefined") {
//             setupAccountDetails(user);
//         };
//         if (typeof allAccountDetails !== "undefined") {
//             allAccountDetails();
//         };
//     } else {
//         // setupPresensi([]);
//         if (window.location.pathname != "/Sistem-Absensi-Puskesmas/login.html") {
//             console.log(window.location.pathname);
//             window.location.href = "login.html";
//         };
//     }
// })