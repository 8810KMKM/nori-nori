import { Alert, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
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
    const { uid } = await userActions.current();
    const result = [];
    const res = await getWishListCollection()
      .where("uid", "==", uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc =>
          result.push({ id: doc.id, ...doc.data() })
        );
      })
      .catch(e => {
        Alert.alert("取得失敗", "ログイン状況を確認してください");
      });
    const sorted_result = result.sort((a, b) => {
      return a.price - b.price;
    });
    return sorted_result;
  },
  create: async (title, price) => {
    const { uid } = await userActions.current();
    return await getWishListCollection()
      .doc()
      .set({
        uid,
        title,
        price
      })
      .then(() => {
        Alert.alert("", "ほしいものリストに追加しました！");
      })
      .catch(e => {
        // console.log(e);
        Alert.alert("追加失敗", "ログイン状況を確認してください");
      });
  },
  delete: async id => {
    return await getWishListCollection()
      .doc(id)
      .delete()
      .then(() => Alert.alert("", "ほしいものリストから削除しました"))
      .catch(e => {
        // console.log(e);
        Alert.alert("削除失敗", "ログイン状況を確認してください");
      });
  }
};

export const userActions = {
  login: async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        if (res.user) {
          await AsyncStorage.multiSet([
            ["uid", res.user.uid],
            ["userEmail", res.user.email]
          ]);
          Alert.alert("", `${res.user.email} でログインしました!`);
          return res.user.email;
        }
      })
      .catch(e => {
        console.log(e);
        Alert.alert("ログインに失敗しました");
        throw new Error();
      });
  },
  logout: async () => {
    await firebase
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.multiRemove(["uid", "userEmail"]);
        Alert.alert("", "ログアウトしました");
        Actions.top();
      })
      .catch(e => {
        console.log(e);
      });
  },
  signup: async (email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        if (res.user) {
          await AsyncStorage.multiSet([
            ["uid", res.user.uid],
            ["userEmail", res.user.email]
          ]);
          Alert.alert("登録成功!", "nori-noriへようこそ");
          return res.user.email;
        }
      })
      .catch(e => {
        console.log(e);
        Alert.alert(
          "登録失敗",
          "メールアドレスはすでに使用されている可能性があります"
        );
        throw new Error();
      });
  },
  current: async () => {
    const uid = await AsyncStorage.getItem("uid");
    const email = await AsyncStorage.getItem("userEmail");

    return { uid, email };
  }
};

export default firebase;
