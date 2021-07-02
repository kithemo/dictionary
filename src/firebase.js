//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyAaTlnKyjCczX5sEQBImdiPhAtbuhCp2Iw",
        authDomain: "react-dictionary-hw.firebaseapp.com",
        projectId: "react-dictionary-hw",
        storageBucket: "react-dictionary-hw.appspot.com",
        messagingSenderId: "192658660827",
        appId: "1:192658660827:web:cfdd758336f6e7a18b9bfe",
        measurementId: "G-BTGQZJWRZL"
     
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };