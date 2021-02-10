const presensiList = document.querySelector('.presensiList');

// setup presensi
// if (presensiList) {
const setupPresensi = (data) => {
    let html = '';
    // let row = 1;
    data.forEach(doc => {
        const presensi = doc.data();
        const td = `
        <tr>
            <td>${presensi.tanggal}</td>
            <td>${presensi.waktu}</td>
            <td>${presensi.foto}</td>
        </tr>
        `;
        html += td;
        // row++;
    });
    if (presensiList) {
        presensiList.innerHTML = html;
    }
}
// }