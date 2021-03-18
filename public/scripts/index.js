const presensiList = document.querySelector('.presensiList');
const accountDetails = document.querySelector('.account-details');
const allAccounts = document.querySelector('.all-accounts');
const nameNavbar = document.querySelector('.name-navbar');
const accountIsAdmin = document.querySelector('.account-isAdmin');
const adminMenu = document.querySelector('.admin-menu');
const allPresensi = document.querySelector('.all-presensi');
const filterForm = document.querySelector('#filter-form');
// const presensi_loader = document.querySelector('.presensi_loader');
// const all_presensi_loader = document.querySelector('.all_presensi_loader');
const print_pdf = document.getElementById("print_pdf");
const delete_button = document.getElementById("delete_button");
const updateForm = document.getElementById('update-form');
const update_button = document.getElementById("update_button");
let id_update = null;
let username_update = null;

// menampilkan nama dan detail akun
if (localStorage.getItem("Username")) {
    if (nameNavbar) {
        nameNavbar.innerHTML = `Selamat Datang, <span class="text-success">${localStorage.getItem("Username")}</span>`;
    };
    if (accountDetails) {
        accountDetails.innerHTML = `
            <div class="text-center pb-3" id="foto-user">
                <img class="img-thumbnail rounded-circle" src="img/selfie-384.png" alt="Foto User" loading="lazy" width="250" height="250">
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
// store last document of allpresensi
let latestDocAll = firebase.firestore.Timestamp.now();
let row = null;
// show all presensi
const getNextAllPresensi = () => {
    if (allPresensi && (localStorage.getItem("Level") == "Admin")) {
        document.getElementById("loader").style.display = "block";
        // all_presensi_loader.classList.add('active');
        const query = db.collection('presensi').orderBy("waktu", "desc").startAfter(latestDocAll).limit(20);
        query.onSnapshot(data => {
            let html = '';
            if (row === null) {
                row = 1;
            }
            data.forEach(presensi => {
                const presensiData = presensi.data();
                let date = presensiData.waktu.toDate();
                let dd = date.getDate();
                let mm = date.getMonth() + 1;
                let yyyy = date.getFullYear();
                let hh = date.getHours();
                let mi = date.getMinutes();
                let se = date.getSeconds();
                date = dd + '/' + mm + '/' + yyyy;
                hour = hh + ':' + mi + ':' + se;
                html += `
                    <tr>
                        <th scope="row">${row}</th>
                        <td>${date}</td>
                        <td>${presensiData.username}</td>
                        <td>${presensiData.nama}</td>
                        <td>${presensiData.nip}</td>
                        <td>${hour}</td>
                        <td>${presensiData.foto}</td>
                    </tr>
                    `;
                row++;
            });
            allPresensi.innerHTML += html;
            document.getElementById("loader").style.display = "none";
            // all_presensi_loader.classList.remove('active');

            // update latest doc
            latestDocAll = data.docs[data.docs.length - 1];

            // unattach event listener if no more docs
            if (data.empty) {
                window.removeEventListener('scroll', handleScroll);
            }
        }, error => {
            console.log(error)
        });
    }
}
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
                            <td class="text-center">
                                <button class="btn btn-info" data-toggle="modal" data-target="#updateModal" onclick="updateAccount('${account.id}')">Edit</button> 
                            </td>
                            <td class="text-center">
                                <button id="delete_button" class="btn btn-danger" onclick="deleteAccount('${account.id}')">Delete</button> 
                            </td>
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

    if (allPresensi) {
        // filter presensi
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.removeEventListener('scroll', handleScroll);

            const awal = new Date(filterForm['filter-awal'].value + '/ 00:00:00');
            const akhir = new Date(filterForm['filter-akhir'].value + '/ 23:59:59');

            db.collection("presensi").where("waktu", ">=", awal).where("waktu", "<=", akhir).orderBy("waktu", "desc").onSnapshot(docs => {
                let html = '';
                let row = 1;
                docs.forEach(presensi => {
                    const presensiData = presensi.data();
                    let date = presensiData.waktu.toDate();
                    let dd = date.getDate();
                    let mm = date.getMonth() + 1;
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
                            <td>${presensiData.foto}</td>
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
};

function deleteAccount(id) {
    var con = confirm("Apakah anda yakin akan menghapus user?");
    if (con == true) {
        db.collection("users").doc(id).delete().then(() => {
            document.querySelector('#pesan-signup').innerHTML = "Akun berhasil dihapus";
            document.getElementById("alert-signup").className = "alert alert-success mx-auto";
            document.getElementById("alert-signup").style.display = "block";
            setTimeout(() => {
                document.getElementById("alert-signup").style.display = "none";
            }, 3000);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
};

function updateAccount(id) {
    db.collection("users").doc(id).get().then(doc => {
        username_update = doc.data().username;
        id_update = doc.id;
        document.getElementById("update-username").value = doc.data().username;
        document.getElementById("update-nama").value = doc.data().nama;
        document.getElementById("update-nip").value = doc.data().nip;
        document.getElementById("update-password").value = doc.data().password;
        document.getElementById("update-level").value = doc.data().level;
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
};
if (update_button) {
    update_button.addEventListener("click", (e) => {
        e.preventDefault();
        db.collection("users").where("username", "==", updateForm['update-username'].value).get().then(doc => {
            if ((doc.size > 0) && (username_update != updateForm['update-username'].value)) {
                $('#updateModal').modal('hide');
                document.querySelector('#pesan-signup').innerHTML = "Maaf Username sudah digunakan";
                document.getElementById("alert-signup").className = "alert alert-danger mx-auto";
                document.getElementById("alert-signup").style.display = "block";
                setTimeout(() => {
                    document.getElementById("alert-signup").style.display = "none";
                }, 3000);
            } else {
                db.collection("users").doc(id_update).update({
                    username: updateForm['update-username'].value,
                    nama: updateForm['update-nama'].value,
                    nip: updateForm['update-nip'].value,
                    password: updateForm['update-password'].value,
                    level: updateForm['update-level'].value
                }).then(() => {
                    $('#updateModal').modal('hide');
                    document.querySelector('#pesan-signup').innerHTML = "Data akun berhasil diperbarui";
                    document.getElementById("alert-signup").className = "alert alert-success mx-auto";
                    document.getElementById("alert-signup").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("alert-signup").style.display = "none";
                    }, 3000);
                }).catch((error) => {
                    console.error("Error editing document: ", error);
                });
            }
        })
    })
}

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

// store last document
let latestDoc = firebase.firestore.Timestamp.now();
// Infinite scroll pagination
const getNextPresensi = () => {
    // get data presensi
    if (presensiList) {
        // presensi_loader.classList.add('active');
        document.getElementById("loader").style.display = "block";

        const query = db.collection('presensi')
            .where("username", "==", localStorage.getItem("Username"))
            .orderBy("waktu", "desc")
            .startAfter(latestDoc)
            .limit(20);

        // output docs
        query.onSnapshot(data => {
            let html = '';
            // let row = 1;
            data.forEach(doc => {
                const presensi = doc.data();

                let date = presensi.waktu.toDate();
                let dd = date.getDate();
                let mm = date.getMonth() + 1;
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
            // presensi_loader.classList.remove('active');
            document.getElementById("loader").style.display = "none";

            // update latest doc
            latestDoc = data.docs[data.docs.length - 1];

            // unattach event listener if no more docs
            if (data.empty) {
                window.removeEventListener('scroll', handleScroll);
            }
        }, error => {
            console.log(error)
        });
    }
}

// wait DOM content to load
window.addEventListener('DOMContentLoaded', () => getNextPresensi());
window.addEventListener('DOMContentLoaded', () => getNextAllPresensi());

// load more docs (scroll)
const handleScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) == scrollable) {
        getNextPresensi();
        getNextAllPresensi();
    }
}
window.addEventListener('scroll', handleScroll);