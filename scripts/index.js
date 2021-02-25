const presensiList = document.querySelector('.presensiList');
const accountDetails = document.querySelector('.account-details');
const allAccounts = document.querySelector('.all-accounts');
const nameNavbar = document.querySelector('.name-navbar');
const accountIsAdmin = document.querySelector('.account-isAdmin');
const adminMenu = document.querySelector('.admin-menu');
const allPresensi = document.querySelector('.all-presensi');

// menampilkan nama dan detail akun
if (localStorage.getItem("Username")) {
    if (nameNavbar) {
        nameNavbar.innerHTML = `Selamat Datang, <span class="text-success">${localStorage.getItem("Username")}</span>`;
    };
    if (accountDetails) {
        accountDetails.innerHTML = `
            <div class="text-center pb-3" id="foto-user">
                <img class="img-thumbnail rounded-circle" src="img/selfie.png" alt="Foto User" loading="lazy" width="250" height="250">
            </div>
            <h3 class="text-center">${localStorage.getItem("Nama")}</h3>
            <h4 class="text-center">NIP: ${localStorage.getItem("NIP")}</h4>
            <h5 class="text-center">Username: ${localStorage.getItem("Username")}</h5>
            <h5 class="text-center">Password: ${localStorage.getItem("Password")}</h5>
            <p class="text-center">Level: ${localStorage.getItem("Level")}</p>`;
        if (localStorage.getItem("Level") == "Admin") {
            accountIsAdmin.innerHTML = `<p class="text-center">Untuk mengedit data-data, masuk ke halaman 'Daftar Akun' dan tekan edit</p>`;
        } else if (localStorage.getItem("Level") == "Anggota") {
            accountIsAdmin.innerHTML = `<p class="text-center">Hubungi admin jika ada kesalahan data</p>`;
        }
    };
}

// Mencegah anggota masuk ke fitur admin
if (localStorage.getItem("Level") == "Anggota" && allAccounts) {
    window.location.href = "index.html";
}

// Fitur Khusus Admin
if (localStorage.getItem("Level") == "Admin") {
    if (adminMenu) {
        if (allAccounts) {
            adminMenu.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link active" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
            `;
        } else if (allPresensi) {
            adminMenu.innerHTML += `
            <li class="nav-item">
                <a class="nav-link text-warning" href="daftar-akun.html">Daftar Akun</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="daftar-presensi.html">Daftar Presensi</a>
            </li>
        `;
        } else {
            adminMenu.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
            `;
        }
    }
    // show all account
    if (allAccounts) {
        db.collection('users').onSnapshot(docs => {
            let html = '';
            let row = 1;
            docs.forEach(account => {
                const userData = account.data();
                const tr = `
                        <tr>
                            <th scope="row">${row}</th>
                            <td>${userData.username}</td>
                            <td>${userData.nama}</td>
                            <td>${userData.nip}</td>
                            <td>${userData.password}</td>
                            <td>${userData.level}</td>
                            <td>Edit | Delete</td>
                        </tr>
                        `;
                html += tr;
                row++;
            });
            allAccounts.innerHTML = html;
        }, error => {
            console.log(error)
        });
    }

    // show all presensi
    if (allPresensi) {
        db.collection('presensi').onSnapshot(docs => {
            let html = '';
            let row = 1;
            docs.forEach(presensi => {
                const presensiData = presensi.data();
                const tr = `
                        <tr>
                            <th scope="row">${row}</th>
                            <td>tanggal</td>
                            <td>${presensiData.username}</td>
                            <td>${presensiData.nama}</td>
                            <td>${presensiData.nip}</td>
                            <td>${presensiData.waktu}</td>
                        </tr>
                        `;
                html += tr;
                row++;
            });
            allPresensi.innerHTML = html;
        }, error => {
            console.log(error)
        });
    }
}

// get data presensi
if (presensiList) {
    db.collection('presensi').where("username", "==", localStorage.getItem("Username")).orderBy("waktu", "desc").onSnapshot(data => {
        let html = '';
        // let row = 1;
        data.forEach(doc => {
            const presensi = doc.data();
            const td = `
            <tr>
                <td>${presensi.tanggal}</td>
                <td>${presensi.waktu}</td>
                <td>${presensi.foto}</td>
            </tr>`;
            html += td;
            // row++;
        });
        presensiList.innerHTML = html;
    }, error => {
        console.log(error)
    });
}

// show account
// const setupAccountDetails = (username) => {
//     if (username) {
//         db.collection('users').doc(username).get().then(doc => {
//             //show name on navbar
//             const htmlNav = `Selamat Datang, <span class="text-success">${doc.data().username}</span>`;
//             //show account details
//             if (doc.data().level == 'admin') {
//                 const htmlDetails = `
//                 <hr>
//                 <div class="text-center pb-3" id="foto-user">
//                     <img class="img-thumbnail rounded-circle" src="img/selfie.png" alt="Foto User" loading="lazy"
//                         width="250" height="250">
//                 </div>
//                 <h2 class="text-center">${doc.data().nama}</h2>
//                 <h4 class="text-center">${doc.data().username}</h4>
//                 <h5 class="text-center">${doc.data().nip}</h5>
//                 <p class="text-center">Level: ${doc.data().level}</p>
//                 <hr>
//                 <div class="text-center mb-3">
//                     <p class="text-center">Untuk mengedit data, masuk ke halaman 'Daftar Akun' dan tekan edit</p>
//                 </div>`;
//             } else {
//                 const htmlDetails = `
//                     <hr>
//                     <div class="text-center pb-3" id="foto-user">
//                         <img class="img-thumbnail rounded-circle" src="img/selfie.png" alt="Foto User" loading="lazy"
//                             width="250" height="250">
//                     </div>
//                     <h2 class="text-center">${doc.data().nama}</h2>
//                     <h4 class="text-center">${doc.data().username}</h4>
//                     <h5 class="text-center">${doc.data().nip}</h5>
//                     <p class="text-center">Level: ${doc.data().level}</p>
//                     <hr>
//                     <div class="text-center mb-3">
//                         <p class="text-center">Hubungi admin jika ada kesalahan data</p>
//                     </div>`;
//             }
//             if (nameNavbar) {
//                 nameNavbar.innerHTML = htmlNav;
//             }
//             if (accountDetails) {
//                 accountDetails.innerHTML = htmlDetails;
//             }
//         });
//     } else {
//         if (nameNavbar) {
//             nameNavbar.innerHTML = '';
//         }
//         if (accountDetails) {
//             accountDetails.innerHTML = '';
//         }
//     }
// }