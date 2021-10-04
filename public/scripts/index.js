const presensiList = document.querySelector('.presensiList');
const accountDetails = document.querySelector('.account-details');
const allAccounts = document.querySelector('.all-accounts');
const nameNavbar = document.querySelector('.name-navbar');
const accountIsAdmin = document.querySelector('.account-isAdmin');
const adminMenu = document.querySelector('.admin-menu');
const allPresensi = document.querySelector('.all-presensi');
const hitungJaspel = document.querySelector('.hitung-jaspel');
const filterForm = document.querySelector('#filter-form');
const hitungForm = document.querySelector('#hitung-form');
const filterNama = document.querySelector('#filter-nama');
const hitungNama = document.querySelector('#hitung-nama');
const statistik = document.querySelector('#statistik');
const perizinan = document.querySelector('#perizinan');
const tabelBelumHadir = document.querySelector('.belumHadirList');
// const presensi_loader = document.querySelector('.presensi_loader');
// const all_presensi_loader = document.querySelector('.all_presensi_loader');
const print_pdf = document.getElementById("print_pdf");
const print_hitung_pdf = document.getElementById("print_hitung_pdf");
const print_statistik_pdf = document.getElementById("print_statistik_pdf");
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
            <h5 class="text-center" id="censored">Password: <button onclick="censor()">tampilkan</button></h5>
            <p class="text-center">Level: ${localStorage.getItem("Level")}</p>`;
        if (localStorage.getItem("Level") == "Admin") {
            accountIsAdmin.innerHTML = `<p class="text-center">Untuk mengedit data-data, masuk ke halaman 'Daftar Akun' dan tekan edit</p>`;
        } else if (localStorage.getItem("Level") == "Anggota") {
            accountIsAdmin.innerHTML = `<p class="text-center">Hubungi admin jika ada kesalahan data</p>`;
        }
    };

    function censor() {
        var censoredText = document.getElementById("censored");
        if (censoredText.innerHTML == `Password: <button onclick="censor()">tampilkan</button>`) {
            censoredText.innerHTML = `Password: ${localStorage.getItem("Password")} <button onclick="censor()">tutup</button>`;
        } else {
            censoredText.innerHTML = `Password: <button onclick="censor()">tampilkan</button>`;
        }
    }
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
                let tdfoto = '';
                if (presensiData.foto == 'i') {
                    tdfoto = `<td><img src="img/izin.png" class="foto-foto-presensi"
                        data-toggle="modal" data-target="#modal-all-presensi" alt="foto presensi"
                        loading="lazy" width="50" height="50" onclick="allFotoPresensiClick(this.src)"></td>`
                } else {
                    tdfoto = `<td><img src="${presensiData.foto}" class="foto-foto-presensi"
                        data-toggle="modal" data-target="#modal-all-presensi" alt="foto presensi"
                        loading="lazy" width="50" height="50" onclick="allFotoPresensiClick(this.src)"></td>`
                };
                html += `
                    <tr>
                        <th scope="row">${row}</th>
                        <td>${date}</td>
                        <td>${presensiData.username}</td>
                        <td>${presensiData.nama}</td>
                        <td>${presensiData.nip}</td>
                        <td>${hour}</td>
                        ${tdfoto}
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
                    <a class="nav-link text-warning" href="perizinan.html">Perizinan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="hitung-jaspel.html">Hitung Jaspel</a>
                </li>    
                <li class="nav-item">
                    <a class="nav-link active" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="statistik.html">Statistik</a>
                </li>
            `;
        } else if (allPresensi) {
            adminMenu.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-warning" href="perizinan.html">Perizinan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="hitung-jaspel.html">Hitung Jaspel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="statistik.html">Statistik</a>
                </li>
            `;
        } else if (perizinan) {
            adminMenu.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link active" href="perizinan.html">Perizinan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="hitung-jaspel.html">Hitung Jaspel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="statistik.html">Statistik</a>
                </li>
            `;
        } else if (hitungJaspel) {
            adminMenu.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-warning" href="perizinan.html">Perizinan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="hitung-jaspel.html">Hitung Jaspel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="statistik.html">Statistik</a>
                </li>
            `;
        } else if (statistik) {
            adminMenu.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-warning" href="perizinan.html">Perizinan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="hitung-jaspel.html">Hitung Jaspel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="statistik.html">Statistik</a>
                </li>
            `;
        } else {
            adminMenu.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-warning" href="perizinan.html">Perizinan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-presensi.html">Daftar Presensi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="hitung-jaspel.html">Hitung Jaspel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="daftar-akun.html">Daftar Akun</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="statistik.html">Statistik</a>
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

    if (hitungJaspel) {
        // Drop down select
        db.collection('users').orderBy("nama").onSnapshot(docs => {
            docs.forEach(account => {
                const userData = account.data();
                const option = `
                <option value="${userData.nama};${userData.username}">${userData.nama}; ${userData.username}</option>
                `;
                hitungNama.innerHTML += option;
            });
        }, error => {
            console.log(error)
        });
        // hitung jaspel
        hitungForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.removeEventListener('scroll', handleScroll);
            const awal = new Date(hitungForm['hitung-awal'].value + '/ 00:00:00');
            const akhir = new Date(hitungForm['hitung-akhir'].value + '/ 23:59:59');
            const nama = hitungForm['hitung-nama'].value.split(";")[0];
            const username = hitungForm['hitung-nama'].value.split(";")[1];
            const satuan = hitungForm['hitung-satuan'].value;
            const denda = hitungForm['hitung-denda'].value;
            let jumlahHari = new Date(hitungForm['hitung-akhir'].value) - new Date(hitungForm['hitung-awal'].value);
            jumlahHari = (jumlahHari / (1000 * 3600 * 24)) + 1;
            let jumlahHadir = 0;
            db.collection("presensi").where("waktu", ">=", awal).where("waktu", "<=", akhir).where("nama", "==", nama).where("username", "==", username).orderBy("waktu", "desc").get().then(docs => {
                jumlahHadir = docs.size;
                let jumlahJaspel = jumlahHadir * satuan;
                let jumlahDenda = (jumlahHari - jumlahHadir) * denda;
                let totalJaspel = numberWithCommas(jumlahJaspel - jumlahDenda);
                hitungJaspel.innerHTML = `<tr>
                    <td>${hitungForm['hitung-awal'].value} ~ ${hitungForm['hitung-akhir'].value}</td>
                    <td>${nama}</td>
                    <td>${username}</td>
                    <td>${jumlahHadir} dari ${jumlahHari} hari</td>
                    <td>${jumlahHadir} * ${satuan} = ${jumlahJaspel}</td>
                    <td>${(jumlahHari - jumlahHadir)} * ${denda} = ${jumlahDenda}</td>
                    <td>Rp${totalJaspel},00</td>
                </tr>`
            }, error => {
                console.log(error)
            });
        });
    }

    if (allPresensi) {
        // Drop down select
        db.collection('users').orderBy("nama").onSnapshot(docs => {
            docs.forEach(account => {
                const userData = account.data();
                const option = `
                            <option value="${userData.nama};${userData.username}">${userData.nama}; ${userData.username}</option>
                        `;
                filterNama.innerHTML += option;
            });
        }, error => {
            console.log(error)
        });
        // filter presensi
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.removeEventListener('scroll', handleScroll);

            const awal = new Date(filterForm['filter-awal'].value + '/ 00:00:00');
            const akhir = new Date(filterForm['filter-akhir'].value + '/ 23:59:59');
            const nama = filterForm['filter-nama'].value.split(";")[0];
            const username = filterForm['filter-nama'].value.split(";")[1];
            if (nama) {
                db.collection("presensi").where("waktu", ">=", awal).where("waktu", "<=", akhir).where("username", "==", username).orderBy("waktu", "desc").onSnapshot(docs => {
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
                        if (presensiData.foto == 'i') {
                            tdfoto = `<td><img src="img/izin.png" class="foto-foto-presensi"
                                data-toggle="modal" data-target="#modal-all-presensi" alt="foto presensi"
                                loading="lazy" width="50" height="50" onclick="allFotoPresensiClick(this.src)"></td>`
                        } else {
                            tdfoto = `<td><img src="${presensiData.foto}" class="foto-foto-presensi"
                                data-toggle="modal" data-target="#modal-all-presensi" alt="foto presensi"
                                loading="lazy" width="50" height="50" onclick="allFotoPresensiClick(this.src)"></td>`
                        };
                        const tr = `
                            <tr>
                                <th scope="row">${row}</th>
                                <td>${date}</td>
                                <td>${presensiData.username}</td>
                                <td>${presensiData.nama}</td>
                                <td>${presensiData.nip}</td>
                                <td>${hour}</td>
                                ${tdfoto}
                            </tr>
                            `;
                        html += tr;
                        row++;
                    });
                    allPresensi.innerHTML = html;
                }, error => {
                    console.log(error)
                });
            } else {
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
                        if (presensiData.foto == 'i') {
                            tdfoto = `<td><img src="img/izin.png" class="foto-foto-presensi"
                                data-toggle="modal" data-target="#modal-all-presensi" alt="foto presensi"
                                loading="lazy" width="50" height="50" onclick="allFotoPresensiClick(this.src)"></td>`
                        } else {
                            tdfoto = `<td><img src="${presensiData.foto}" class="foto-foto-presensi"
                                data-toggle="modal" data-target="#modal-all-presensi" alt="foto presensi"
                                loading="lazy" width="50" height="50" onclick="allFotoPresensiClick(this.src)"></td>`
                        };
                        const tr = `
                            <tr>
                                <th scope="row">${row}</th>
                                <td>${date}</td>
                                <td>${presensiData.username}</td>
                                <td>${presensiData.nama}</td>
                                <td>${presensiData.nip}</td>
                                <td>${hour}</td>
                                ${tdfoto}
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
        });
    }

    if (perizinan) {
        waktuSekarang = firebase.firestore.Timestamp.now();
        let date = waktuSekarang.toDate();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        let waktuSekarangString = yyyy + '/' + mm + '/' + dd;
        let awal = new Date(yyyy + '/' + mm + '/' + dd + '/ 00:00:00');
        let akhir = new Date(yyyy + '/' + mm + '/' + dd + '/ 23:59:59');
        let daftarAkun = [];

        db.collection('users').orderBy("username").onSnapshot(docs => {
            docs.forEach(account => {
                const userData = account.data();
                daftarAkun.push(userData.username);
            });
        }, error => {
            console.log(error)
        });

        let daftarAkunTidakHadir = daftarAkun;
        db.collection("presensi").where("waktu", ">=", awal).where("waktu", "<=", akhir).onSnapshot(docs => {
            docs.forEach(presensi => {
                const presensiData = presensi.data();
                if (daftarAkun.includes(presensiData.username)) {
                    daftarAkunTidakHadir = daftarAkunTidakHadir.filter(e => e !== presensiData.username);
                }
            });
        }, error => {
            console.log(error)
        });

        db.collection('users').orderBy("username").onSnapshot(docs => {
            let html = '';
            if (row === null) {
                row = 1;
            }
            docs.forEach(account => {
                let accountData = account.data();
                if (daftarAkunTidakHadir.includes(accountData.username)) {
                    html += `
                    <tr>
                        <th scope="row">${row}</th>
                        <td>${accountData.nama}</td>
                        <td>${accountData.username}</td>
                        <td>${accountData.nip}</td>
                        <td class="text-center">
                            <button class="btn btn-info" onclick="izinkanHadir('${accountData.username}')">Izinkan</button> 
                        </td>
                    </tr>
                    `;
                    row++;
                }
            });
            tabelBelumHadir.innerHTML += html;

            google.charts.load('current', {
                'packages': ['corechart']
            });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable([
                    ['Task', 'Hours per Day'],
                    ['Hadir / Izin', (daftarAkun.length - daftarAkunTidakHadir.length)],
                    ['Belum Hadir', daftarAkunTidakHadir.length],
                ]);
                var options = {
                    title: 'Tanggal : ' + waktuSekarangString + '; Jumlah Pegawai : ' + daftarAkun.length
                };
                var chart = new google.visualization.PieChart(document.getElementById('chartPerizinan'));
                chart.draw(data, options);
            }
            $(window).resize(function () {
                drawChart();
            });
        }, error => {
            console.log(error)
        });
    }

    if (statistik) {
        let jumlahPegawai = 0;
        // Drop down select
        db.collection('users').orderBy("nama").onSnapshot(docs => {
            docs.forEach(account => {
                const userData = account.data();
                const option = `
                            <option value="${userData.nama};${userData.username}">${userData.nama}; ${userData.username}</option>
                        `;
                filterNama.innerHTML += option;
                jumlahPegawai += 1;
            });
        }, error => {
            console.log(error)
        });
        // filter statistik
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.removeEventListener('scroll', handleScroll);

            const awal = new Date(filterForm['filter-awal'].value + '/ 00:00:00');
            const akhir = new Date(filterForm['filter-akhir'].value + '/ 23:59:59');
            const nama = filterForm['filter-nama'].value.split(";")[0];
            const username = filterForm['filter-nama'].value.split(";")[1];
            document.getElementById("tanggalStatistik").innerHTML = 'Tanggal : ' + awal.getDate() + '/' + awal.getMonth() + '/' + awal.getFullYear() + ' ~ ' + akhir.getDate() + '/' + akhir.getMonth() + '/' + akhir.getFullYear();

            if (nama) {
                document.getElementById("namaStatistik").innerHTML = 'Nama (Username) : ' + nama + ' (' + username + ')';
                db.collection("presensi").where("waktu", ">=", awal).where("waktu", "<=", akhir).where("nama", "==", nama).where("username", "==", username).orderBy("waktu", "desc").onSnapshot(docs => {
                    let minggu = 0;
                    let senin = 0;
                    let selasa = 0;
                    let rabu = 0;
                    let kamis = 0;
                    let jumat = 0;
                    let sabtu = 0;

                    let jumlahHari = akhir - awal;
                    jumlahHari = Math.round(jumlahHari / (1000 * 3600 * 24));

                    let hadir = 0;
                    let izin = 0;
                    let absen = 0;

                    let jam0 = 0;
                    let jam2 = 0;
                    let jam4 = 0;
                    let jam6 = 0;
                    let jam8 = 0;
                    let jam10 = 0;
                    let jam12 = 0;
                    let jam14 = 0;
                    let jam16 = 0;
                    let jam18 = 0;
                    let jam20 = 0;
                    let jam22 = 0;

                    docs.forEach(presensi => {
                        const presensiData = presensi.data();
                        switch (presensiData.waktu.toDate().getDay()) {
                            case 0:
                                minggu += 1;
                                break;
                            case 1:
                                senin += 1;
                                break;
                            case 2:
                                selasa += 1;
                                break;
                            case 3:
                                rabu += 1;
                                break;
                            case 4:
                                kamis += 1;
                                break;
                            case 5:
                                jumat += 1;
                                break;
                            case 6:
                                sabtu += 1;
                        }
                        if (presensiData.foto === 'i') {
                            izin += 1;
                        } else {
                            hadir += 1;
                        }
                        if ((presensiData.waktu.toDate().getHours() >= 0) && (presensiData.waktu.toDate().getHours() < 2)) {
                            jam0 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 2) && (presensiData.waktu.toDate().getHours() < 4)) {
                            jam2 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 4) && (presensiData.waktu.toDate().getHours() < 6)) {
                            jam4 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 6) && (presensiData.waktu.toDate().getHours() < 8)) {
                            jam6 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 8) && (presensiData.waktu.toDate().getHours() < 10)) {
                            jam8 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 10) && (presensiData.waktu.toDate().getHours() < 12)) {
                            jam10 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 12) && (presensiData.waktu.toDate().getHours() < 14)) {
                            jam12 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 14) && (presensiData.waktu.toDate().getHours() < 16)) {
                            jam14 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 16) && (presensiData.waktu.toDate().getHours() < 18)) {
                            jam16 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 18) && (presensiData.waktu.toDate().getHours() < 20)) {
                            jam18 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 20) && (presensiData.waktu.toDate().getHours() < 22)) {
                            jam20 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 22) && (presensiData.waktu.toDate().getHours() < 0)) {
                            jam22 += 1;
                        }
                    });
                    absen = jumlahHari - hadir - izin;

                    google.charts.load('current', {
                        'packages': ['corechart']
                    });
                    google.charts.setOnLoadCallback(drawChart);
                    google.charts.setOnLoadCallback(drawChart2);
                    google.charts.setOnLoadCallback(drawChart3);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Hari', 'Jumlah', {
                                role: 'style'
                            }],
                            ['Senin', senin, 'red'],
                            ['Selasa', selasa, 'orange'],
                            ['rabu', rabu, 'yellow'],
                            ['kamis', kamis, 'green'],
                            ['jumat', jumat, 'blue'],
                            ['sabtu', sabtu, 'indigo'],
                            ['minggu', minggu, 'violet']
                        ]);

                        var options = {
                            title: 'Jumlah Presensi per Hari'
                        };

                        var chart = new google.visualization.ColumnChart(document.getElementById('chartPresensiPerHari'));
                        chart.draw(data, options);
                    }

                    function drawChart2() {
                        var data = google.visualization.arrayToDataTable([
                            ['Keterangan', 'Jumlah'],
                            ['Hadir', hadir],
                            ['Izin', izin],
                            ['Absen', absen]
                        ]);

                        var options = {
                            title: 'Jumlah Kehadiran',
                            colors: ['blue', 'silver', 'red']
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('chartJumlahKehadiran'));
                        chart.draw(data, options);
                    }

                    function drawChart3() {
                        // Set Data
                        var data = google.visualization.arrayToDataTable([
                            ['Waktu', 'Jumlah'],
                            ['00:00', jam0],
                            ['02:00', jam2],
                            ['04:00', jam4],
                            ['06:00', jam6],
                            ['08:00', jam8],
                            ['10:00', jam10],
                            ['12:00', jam12],
                            ['14:00', jam14],
                            ['16:00', jam16],
                            ['18:00', jam18],
                            ['20:00', jam20],
                            ['22:00', jam22]
                        ]);
                        // Set Options
                        var options = {
                            title: 'Waktu Presensi',
                            hAxis: {
                                title: 'Waktu'
                            },
                            vAxis: {
                                title: 'Jumlah'
                            },
                            legend: 'none',
                        };
                        // Draw Chart
                        var chart = new google.visualization.LineChart(document.getElementById('chartWaktuKehadiran'));
                        chart.draw(data, options);
                    }

                    $(window).resize(function () {
                        drawChart();
                        drawChart2();
                        drawChart3();
                    });

                }, error => {
                    console.log(error)
                });
            } else {
                db.collection("presensi").where("waktu", ">=", awal).where("waktu", "<=", akhir).orderBy("waktu", "desc").onSnapshot(docs => {
                    document.getElementById("namaStatistik").innerHTML = 'Data seluruh pegawai (' + jumlahPegawai + ' orang )';
                    let minggu = 0;
                    let senin = 0;
                    let selasa = 0;
                    let rabu = 0;
                    let kamis = 0;
                    let jumat = 0;
                    let sabtu = 0;

                    let jumlahHari = akhir - awal;
                    jumlahHari = Math.round(jumlahHari / (1000 * 3600 * 24)) * jumlahPegawai;

                    let hadir = 0;
                    let izin = 0;
                    let absen = 0;

                    let jam0 = 0;
                    let jam2 = 0;
                    let jam4 = 0;
                    let jam6 = 0;
                    let jam8 = 0;
                    let jam10 = 0;
                    let jam12 = 0;
                    let jam14 = 0;
                    let jam16 = 0;
                    let jam18 = 0;
                    let jam20 = 0;
                    let jam22 = 0;

                    docs.forEach(presensi => {
                        const presensiData = presensi.data();
                        switch (presensiData.waktu.toDate().getDay()) {
                            case 0:
                                minggu += 1;
                                break;
                            case 1:
                                senin += 1;
                                break;
                            case 2:
                                selasa += 1;
                                break;
                            case 3:
                                rabu += 1;
                                break;
                            case 4:
                                kamis += 1;
                                break;
                            case 5:
                                jumat += 1;
                                break;
                            case 6:
                                sabtu += 1;
                        }
                        if (presensiData.foto === 'i') {
                            izin += 1;
                        } else {
                            hadir += 1;
                        }
                        if ((presensiData.waktu.toDate().getHours() >= 0) && (presensiData.waktu.toDate().getHours() < 2)) {
                            jam0 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 2) && (presensiData.waktu.toDate().getHours() < 4)) {
                            jam2 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 4) && (presensiData.waktu.toDate().getHours() < 6)) {
                            jam4 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 6) && (presensiData.waktu.toDate().getHours() < 8)) {
                            jam6 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 8) && (presensiData.waktu.toDate().getHours() < 10)) {
                            jam8 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 10) && (presensiData.waktu.toDate().getHours() < 12)) {
                            jam10 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 12) && (presensiData.waktu.toDate().getHours() < 14)) {
                            jam12 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 14) && (presensiData.waktu.toDate().getHours() < 16)) {
                            jam14 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 16) && (presensiData.waktu.toDate().getHours() < 18)) {
                            jam16 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 18) && (presensiData.waktu.toDate().getHours() < 20)) {
                            jam18 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 20) && (presensiData.waktu.toDate().getHours() < 22)) {
                            jam20 += 1;
                        } else if ((presensiData.waktu.toDate().getHours() >= 22) && (presensiData.waktu.toDate().getHours() < 0)) {
                            jam22 += 1;
                        }
                    });
                    absen = jumlahHari - hadir - izin;

                    google.charts.load('current', {
                        'packages': ['corechart']
                    });
                    google.charts.setOnLoadCallback(drawChart);
                    google.charts.setOnLoadCallback(drawChart2);
                    google.charts.setOnLoadCallback(drawChart3);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Hari', 'Jumlah', {
                                role: 'style'
                            }],
                            ['Senin', senin, 'red'],
                            ['Selasa', selasa, 'orange'],
                            ['rabu', rabu, 'yellow'],
                            ['kamis', kamis, 'green'],
                            ['jumat', jumat, 'blue'],
                            ['sabtu', sabtu, 'indigo'],
                            ['minggu', minggu, 'violet']
                        ]);

                        var options = {
                            title: 'Jumlah Presensi per Hari'
                        };

                        var chart = new google.visualization.ColumnChart(document.getElementById('chartPresensiPerHari'));
                        chart.draw(data, options);
                    }

                    function drawChart2() {
                        var data = google.visualization.arrayToDataTable([
                            ['Keterangan', 'Jumlah'],
                            ['Hadir', hadir],
                            ['Izin', izin],
                            ['Absen', absen]
                        ]);

                        var options = {
                            title: 'Jumlah Kehadiran',
                            colors: ['blue', 'silver', 'red']
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('chartJumlahKehadiran'));
                        chart.draw(data, options);
                    }

                    function drawChart3() {
                        // Set Data
                        var data = google.visualization.arrayToDataTable([
                            ['Waktu', 'Jumlah'],
                            ['00:00', jam0],
                            ['02:00', jam2],
                            ['04:00', jam4],
                            ['06:00', jam6],
                            ['08:00', jam8],
                            ['10:00', jam10],
                            ['12:00', jam12],
                            ['14:00', jam14],
                            ['16:00', jam16],
                            ['18:00', jam18],
                            ['20:00', jam20],
                            ['22:00', jam22]
                        ]);
                        // Set Options
                        var options = {
                            title: 'Waktu Presensi',
                            hAxis: {
                                title: 'Waktu'
                            },
                            vAxis: {
                                title: 'Jumlah'
                            },
                            legend: 'none',
                        };
                        // Draw Chart
                        var chart = new google.visualization.LineChart(document.getElementById('chartWaktuKehadiran'));
                        chart.draw(data, options);
                    }

                    $(window).resize(function () {
                        drawChart();
                        drawChart2();
                        drawChart3();
                    });

                }, error => {
                    console.log(error)
                });
            }
        });
    }
};

function izinkanHadir(username) {
    document.getElementById("loader").style.display = "block";
    document.getElementById("bg-loader").style.display = "block";
    waktuSekarang = firebase.firestore.Timestamp.now();
    db.collection('users').where("username", '==', username).onSnapshot(docs => {
        docs.forEach(account => {
            const userData = account.data();
            db.collection('presensi').add({
                username: userData.username,
                foto: 'i',
                nama: userData.nama,
                nip: userData.nip,
                waktu: waktuSekarang
            }).then(() => location.reload());
        });
    }, error => {
        console.log(error)
    });
}


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}

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
if (print_hitung_pdf) {
    print_hitung_pdf.addEventListener("click", () => {
        const invoice = this.document.getElementById("hasil_hitung_jaspel");
        var opt = {
            margin: 0.3,
            filename: 'hasil_hitung_jaspel.pdf',
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'landscape'
            }
        };
        html2pdf().set(opt).from(invoice).save();
    })
}
if (print_statistik_pdf) {
    print_statistik_pdf.addEventListener("click", () => {
        const invoice = this.document.getElementById("statistik");
        var opt = {
            margin: 0.3,
            filename: 'statistik_presensi.pdf',
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
                if (presensi.foto == 'i') {
                    tdfoto = `<td><img src="img/izin.png" class="foto-foto-presensi"
                    alt="foto presensi" loading="lazy" width="50" height="50"
                    data-toggle="modal" data-target="#modal-presensi" onclick="fotoPresensiClick(this.src)"></td>`
                } else {
                    tdfoto = `<td><img src="${presensi.foto}" class="foto-foto-presensi"
                    alt="foto presensi" loading="lazy" width="50" height="50"
                    data-toggle="modal" data-target="#modal-presensi" onclick="fotoPresensiClick(this.src)"></td>`
                };
                html += `
                <tr>
                    <td>${date}</td>
                    <td>${hour}</td>
                    ${tdfoto}
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

function fotoPresensiClick(src) {
    document.getElementById("modal-foto-presensi").src = src;
}

function allFotoPresensiClick(src) {
    document.getElementById("modal-all-foto-presensi").src = src;
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
