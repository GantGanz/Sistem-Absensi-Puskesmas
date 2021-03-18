// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC6hyl-k9rVuAs8JYD8KUtcVXsMwqZTQI0",
    authDomain: "presensi-puskesmas-kasiman.firebaseapp.com",
    projectId: "presensi-puskesmas-kasiman",
    storageBucket: "presensi-puskesmas-kasiman.appspot.com",
    messagingSenderId: "53532156353",
    appId: "1:53532156353:web:175ee96b8b4c9b126d0f40",
    measurementId: "G-304DP9WZW3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// make storage and firestore references
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            // probably multiple tabs open at once
            console.log('persistence failed');
        } else if (err.code == 'unimplemented') {
            // lack of browser support
            console.log('persistence isnt available');
        }
    });

// update firestore settings
// db.settings({
//     timestampsInSnapshots: true
// });