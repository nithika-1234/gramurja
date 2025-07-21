// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyBxaHf_AS6OZ9ytIRdLARNCfLp9NxAeY6M",
//   authDomain: "gramurja-ea1db.firebaseapp.com",
//   projectId: "gramurja-ea1db",
//   storageBucket: "gramurja-ea1db.firebasestorage.app",
//   messagingSenderId: "1031971640639",
//   appId: "1:1031971640639:web:66d67c925fb0fe6fd22f8a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBxaHf_AS6OZ9ytIRdLARNCfLp9NxAeY6M",
  authDomain: "gramurja-ea1db.firebaseapp.com",
  projectId: "gramurja-ea1db",
  storageBucket: "gramurja-ea1db.appspot.com",
  messagingSenderId: "1031971640639",
  appId: "1:1031971640639:web:66d67c925fb0fe6fd22f8a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
