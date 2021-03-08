const presensiList = document.querySelector('.presensiList');
const accountDetails = document.querySelector('.account-details');
const allAccounts = document.querySelector('.all-accounts');
const nameNavbar = document.querySelector('.name-navbar');
const accountIsAdmin = document.querySelector('.account-isAdmin');
const adminMenu = document.querySelector('.admin-menu');
const allPresensi = document.querySelector('.all-presensi');
const filterForm = document.querySelector('#filter-form');
const print_pdf = document.getElementById("print_pdf");

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
        db.collection('users').orderBy("username").onSnapshot(docs => {
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
        db.collection('presensi').orderBy("waktu", "desc").onSnapshot(docs => {
            let html = '';
            let row = 1;
            docs.forEach(presensi => {
                const presensiData = presensi.data();
                let date = presensiData.waktu.toDate();
                let dd = date.getDate();
                let mm = date.getMonth();
                let yyyy = date.getFullYear();
                let hh = date.getHours();
                let mi = date.getMinutes();
                let se = date.getSeconds();
                date = dd + '/' + mm + '/' + yyyy;
                hour = hh + ':' + mi + ':' + se;
                const tr = `
                        <tr>
                            <th scope="row">${row}</th>
                            <td>${date}</td>
                            <td>${presensiData.username}</td>
                            <td>${presensiData.nama}</td>
                            <td>${presensiData.nip}</td>
                            <td>${hour}</td>
                        </tr>
                        `;
                html += tr;
                row++;
            });
            allPresensi.innerHTML = html;
        }, error => {
            console.log(error)
        });

        // filter presensi
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const awal = new Date(filterForm['filter-awal'].value + '/ 00:00:00');
            const akhir = new Date(filterForm['filter-akhir'].value + '/ 23:59:59');

            db.collection("presensi").where("waktu", ">=", awal).where("waktu", "<=", akhir).orderBy("waktu", "desc").onSnapshot(docs => {
                let html = '';
                let row = 1;
                docs.forEach(presensi => {
                    const presensiData = presensi.data();
                    let date = presensiData.waktu.toDate();
                    let dd = date.getDate();
                    let mm = date.getMonth();
                    let yyyy = date.getFullYear();
                    let hh = date.getHours();
                    let mi = date.getMinutes();
                    let se = date.getSeconds();
                    date = dd + '/' + mm + '/' + yyyy;
                    hour = hh + ':' + mi + ':' + se;

                    const tr = `
                        <tr>
                            <th scope="row">${row}</th>
                            <td>${date}</td>
                            <td>${presensiData.username}</td>
                            <td>${presensiData.nama}</td>
                            <td>${presensiData.nip}</td>
                            <td>${hour}</td>
                        </tr>
                        `;
                    html += tr;
                    row++;
                });
                allPresensi.innerHTML = html;
            }, error => {
                console.log(error)
            });
        });
    }
}

// // get data presensi
// if (presensiList) {
//     db.collection('presensi').where("username", "==", localStorage.getItem("Username")).orderBy("waktu", "desc").onSnapshot(data => {
//         let html = '';
//         // let row = 1;
//         data.forEach(doc => {
//             const presensi = doc.data();

//             let date = presensi.waktu.toDate();
//             let dd = date.getDate();
//             let mm = date.getMonth();
//             let yyyy = date.getFullYear();
//             let hh = date.getHours();
//             let mi = date.getMinutes();
//             let se = date.getSeconds();
//             date = dd + '/' + mm + '/' + yyyy;
//             hour = hh + ':' + mi + ':' + se;
//             // <td>${presensi.waktu.toDate().toLocaleTimeString('id-ID')}</td>

//             const td = `
//             <tr>
//                 <td>${date}</td>
//                 <td>${hour}</td>
//                 <td>${presensi.foto}</td>
//             </tr>`;
//             html += td;
//             // row++;
//         });
//         presensiList.innerHTML = html;
//     }, error => {
//         console.log(error)
//     });
// }

// Export to CSV
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(","));
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

// export to pdf
if (print_pdf) {
    print_pdf.addEventListener("click", () => {
        const invoice = this.document.getElementById("tabel_presensi");
        var opt = {
            margin: 0.3,
            filename: 'daftar-presensi.pdf',
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            }
        };
        html2pdf().set(opt).from(invoice).save();
    })
}

// Infinite scroll pagination
// store last document
let latestDoc = firebase.firestore.Timestamp.now();

const getNextPresensi = () => {
    // get data presensi
    if (presensiList) {
        const data = db.collection('presensi')
            .where("username", "==", localStorage.getItem("Username"))
            .orderBy("waktu", "desc")
            .startAfter(latestDoc)
            .limit(3);

        // output docs
        data.onSnapshot(data => {
            let html = '';
            // let row = 1;
            data.forEach(doc => {
                const presensi = doc.data();

                let date = presensi.waktu.toDate();
                let dd = date.getDate();
                let mm = date.getMonth();
                let yyyy = date.getFullYear();
                let hh = date.getHours();
                let mi = date.getMinutes();
                let se = date.getSeconds();
                date = dd + '/' + mm + '/' + yyyy;
                hour = hh + ':' + mi + ':' + se;
                // <td>${presensi.waktu.toDate().toLocaleTimeString('id-ID')}</td>

                html += `
                <tr>
                    <td>${date}</td>
                    <td>${hour}</td>
                    <td>${presensi.foto}</td>
                </tr>`;
                // row++;
            });
            presensiList.innerHTML += html;

            // update latest doc
            latestDoc = data.docs[data.docs.length - 1];

            // unattach event listener if no more docs
            if (data.empty) {
                loadMore.removeEventListener('click', handleClick);
            }
        }, error => {
            console.log(error)
        });
    }
}

// wait DOM content to load
window.addEventListener('DOMContentLoaded', () => getNextPresensi());

// load more docs (button)
const loadMore = document.querySelector('.load-more button');

const handleClick = () => {
    getNextPresensi();
}

loadMore.addEventListener('click', handleClick);

// // get data presensi
// if (presensiList) {
//     const ref = db.collection('presensi').where("username", "==", localStorage.getItem("Username")).orderBy("waktu", "desc").limit(3);
//     const data = await ref.get();

//     let html = '';
//     // let row = 1;
//     data.docs.forEach(doc => {
//         const presensi = doc.data();

//         let date = presensi.waktu.toDate();
//         let dd = date.getDate();
//         let mm = date.getMonth();
//         let yyyy = date.getFullYear();
//         let hh = date.getHours();
//         let mi = date.getMinutes();
//         let se = date.getSeconds();
//         date = dd + '/' + mm + '/' + yyyy;
//         hour = hh + ':' + mi + ':' + se;
//         // <td>${presensi.waktu.toDate().toLocaleTimeString('id-ID')}</td>

//         html += `
//         <tr>
//             <td>${date}</td>
//             <td>${hour}</td>
//             <td>${presensi.foto}</td>
//         </tr>`;
//         // row++;
//     });
//     presensiList.innerHTML += html;
// }
// console.log('get masuk');