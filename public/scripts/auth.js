// const addPresensi = document.querySelector('#add-Presensi');
const signupForm = document.querySelector('#signup-form');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#login-form');
const captureForm = document.querySelector('#capture-form');
let capture = document.querySelector('#capture');
let submitCapture = document.querySelector('#submit-capture');
let fotoCaptured = document.querySelector('#foto-captured');
let fotoPresensi = null;
var file = null;
var storageRef = null;

//  create new presensi
if (fotoCaptured) {
    capture.addEventListener('change', (e) => {
        fotoPresensi = window.URL.createObjectURL(capture.files[0]);
        fotoCaptured.src = fotoPresensi;
        // get file
        file = e.target.files[0];
        submitCapture.disabled = false;
    })
    captureForm.addEventListener('submit', (e) => {
        var con = confirm("File yang sudah dikirim tidak dapat dihapus. Lanjutkan?");
        if (con == true) {
            e.preventDefault();
            document.getElementById("loader").style.display = "block";
            waktuSekarang = firebase.firestore.Timestamp.now();
            let ada = 1;
            let date = waktuSekarang.toDate();
            let dd = date.getDate();
            let mm = date.getMonth() + 1;
            let yyyy = date.getFullYear();
            let waktuSekarangString = yyyy + '/' + mm + '/' + dd;
            let awal = new Date(yyyy + '/' + mm + '/' + dd + '/ 00:00:00');
            let akhir = new Date(yyyy + '/' + mm + '/' + dd + '/ 23:59:59');
            let waktuFoto = new Date(parseInt(file.name.slice(0, 13)));
            let cekSekarang = waktuFoto.getFullYear() + "/" + (waktuFoto.getMonth() + 1) + "/" + waktuFoto.getDate();
            let namaFile = localStorage.getItem("Username") + '/' + cekSekarang;
            // create a storage reference
            storageRef = storage.ref('foto_presensi/' + namaFile + ".jpeg");
            db.collection("presensi").where("username", "==", localStorage.getItem("Username")).get().then(async data => {
                data.forEach(presensi => {
                    if ((presensi.data().waktu.toDate().valueOf() >= awal.valueOf()) && (presensi.data().waktu.toDate().valueOf() <= akhir.valueOf())) {
                        if (ada == 1) {
                            document.getElementById("loader").style.display = "none";
                            document.getElementById("alert-presensi").style.display = "block";
                            submitCapture.disabled = true;
                            setTimeout(() => {
                                document.getElementById("alert-presensi").style.display = "none";
                            }, 3000);
                            ada++;
                        };
                    }
                });
                if (ada == 1) {
                    if (waktuSekarangString == cekSekarang) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = async function (event) {
                            const imgElement = document.createElement("img");
                            imgElement.src = event.target.result;
                            imgElement.onload = async function (e) {
                                const canvas = document.createElement("canvas");
                                const MAX_WIDTH = 400;
                                const scaleSize = MAX_WIDTH / e.target.width;
                                canvas.width = MAX_WIDTH;
                                canvas.height = e.target.height * scaleSize;
                                const ctx = canvas.getContext("2d")
                                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                                const srcEncoded = ctx.canvas.toDataURL();
                                var byteString = atob(srcEncoded.split(',')[1]);
                                var ab = new ArrayBuffer(byteString.length);
                                var ia = new Uint8Array(ab);
                                for (var i = 0; i < byteString.length; i++) {
                                    ia[i] = byteString.charCodeAt(i);
                                }
                                var blob = new Blob([ia], {
                                    type: 'image/jpeg'
                                });
                                var fileResized = new File([blob], file.name);
                                // you can send srcEncoded to the server
                                var metadata = {
                                    cotentType: 'image/jpeg'
                                };
                                await storageRef.put(fileResized, metadata);
                                var file_url = await storageRef.getDownloadURL();
                                db.collection('presensi').add({
                                    username: localStorage.getItem("Username"),
                                    foto: file_url,
                                    nama: localStorage.getItem("Nama"),
                                    nip: localStorage.getItem("NIP"),
                                    waktu: waktuSekarang
                                }).then(() => location.reload());
                            };
                        };
                    } else {
                        document.getElementById("loader").style.display = "none";
                        document.querySelector('#alert-presensi-text').innerHTML = "Mohon masukkan foto hari ini dengan menggunakan smartphone";
                        document.getElementById("alert-presensi").style.display = "block";
                        setTimeout(() => {
                            document.getElementById("alert-presensi").style.display = "none";
                        }, 3000);
                    }
                };
            }).catch((err) => {
                console.log("Error checking document", err);
            });
        }
    })
}

// fitur Khusus Admin
if (localStorage.getItem("Level") == "Admin") {
    // sign up
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById("alert-signup").style.display = "none";
            // document.getElementById("loader").style.display = "block";
            // document.getElementById("bg-loader").style.display = "block";

            // get account info
            const nama = signupForm['signup-nama'].value;
            const nip = signupForm['signup-nip'].value;
            const username = signupForm['signup-username'].value;
            const password = signupForm['signup-password'].value;
            const level = signupForm['signup-level'].value;

            db.collection("users").where("username", "==", username).get().then(doc => {
                if (doc.size > 0) {
                    // document.getElementById("loader").style.display = "none";
                    // document.getElementById("bg-loader").style.display = "none";
                    document.getElementById("alert-signup").style.display = "block";
                    document.querySelector('#pesan-signup').innerHTML = "Maaf, Username sudah terdaftar";
                    document.getElementById("alert-signup").className = "alert alert-danger mx-auto";
                    setTimeout(() => {
                        document.getElementById("alert-signup").style.display = "none";
                    }, 3000);
                    // return console.log("Username sudah ada");
                } else {
                    document.getElementById("alert-signup").style.display = "none";
                    db.collection('users').add({
                        username: username,
                        nama: nama,
                        nip: nip,
                        password: password,
                        level: level
                    }).then(() => {
                        // document.getElementById("loader").style.display = "none";
                        // document.getElementById("bg-loader").style.display = "none";
                        document.querySelector('#pesan-signup').innerHTML = "Akun berhasil didaftarkan";
                        document.getElementById("alert-signup").className = "alert alert-success mx-auto";
                        document.getElementById("alert-signup").style.display = "block";
                        setTimeout(() => {
                            document.getElementById("alert-signup").style.display = "none";
                        }, 3000);
                        signupForm.reset();
                    }).catch(err => console.log(err.message));
                }
            }).catch((err) => {
                console.log("Error checking document", err);
                document.querySelector('#pesan-signup').innerHTML = "Maaf, koneksi anda bermasalah atau server down";
                // document.getElementById("loader").style.display = "none";
                // document.getElementById("bg-loader").style.display = "none";
            });
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