import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsuTRkn6yOJO1MTqYiAtlIIz07_msZj9k",
  authDomain: "meal-planner-7cd91.firebaseapp.com",
  projectId: "meal-planner-7cd91",
  storageBucket: "meal-planner-7cd91.appspot.com",
  messagingSenderId: "404976386560",
  appId: "1:404976386560:web:2b8eccaad70e72467b4ee5",
  measurementId: "G-JHHMNPP99M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };