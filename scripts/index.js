const presensiList = document.querySelector('.presensiList');
const accountDetails = document.querySelector('.account-details');
const allAccounts = document.querySelector('.all-accounts');
const nameNavbar = document.querySelector('.name-navbar');
const accountIsAdmin = document.querySelector('.account-isAdmin');

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
            <h2 class="text-center">${localStorage.getItem("Nama")}</h2>
            <h4 class="text-center">Username: ${localStorage.getItem("Username")}</h4>
            <h5 class="text-center">Password: ${localStorage.getItem("NIP")}</h5>
            <p class="text-center">Level: ${localStorage.getItem("Level")}</p>`;
        if (localStorage.getItem("Level") == "Admin") {
            accountIsAdmin.innerHTML = `<p class="text-center">Untuk mengedit data-data, masuk ke halaman 'Daftar Akun' dan tekan edit</p>`;
        } else if (localStorage.getItem("Level") == "Anggota") {
            accountIsAdmin.innerHTML = `<p class="text-center">Hubungi admin jika ada kesalahan data</p>`;
        }
    };
}

// show all account
if (allAccounts) {
    db.collection('users').get().then(docs => {
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
    });
}

// get data presensi
if (presensiList) {
    db.collection('presensi').where("username", "==", localStorage.getItem("Username")).get().then(data => {
        let html = '';
        // let row = 1;
        data.forEach(doc => {
            const presensi = doc.data();
            console.log(presensi);
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
    }), error => {
        console.log(error)
    };
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