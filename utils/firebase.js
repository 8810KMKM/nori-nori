import { Alert } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID
} from "react-native-dotenv";

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const getWishListCollection = () =>
  firebase.firestore().collection("wish_lists");

export const wishListActions = {
  index: async () => {
    // const uid = user.current().uid;
    const result = [];
    const res = await getWishListCollection()
      // .where("uid", "==", uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc =>
          result.push({ id: doc.id, ...doc.data() })
        );
      });
    return result;
  },
  create: async (title, price) => {
    // const uid = user.current().uid;
    return await getWishListCollection()
      .doc()
      .set({
        // uid,
        title,
        price
      })
      .then(() => {
        Alert.alert("ほしいものリストに追加しました！");
      })
      .catch(e => console.log(e));
  },
  delete: async id => {
    return await getWishListCollection()
      .doc(id)
      .delete()
      .then(() => Alert.alert("ほしいものリストから削除しました"))
      .catch(e => console.log(e));
  }
};

export const userActions = {
  login: async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => Alert.alert("ログインしました！"))
      .catch(e => {
        console.log(e);
      });
  },
  logout: async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert("ログアウトしました");
      })
      .catch(e => {
        console.log(e);
      });
  },
  signup: async (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          Alert.alert("登録しました！");
        }
      })
      .catch(e => {
        Alert.alert(e);
      });
  },
  current: async () => {
    // 取得してuidと名前返したい
  }
};

export default firebase;
