import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../config/config';

const app = firebase.initializeApp(firebaseConfig);

export default app;