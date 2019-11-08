import firebase from "firebase";
import "firebase/database";

const deleteBeer = async (ref, id) => {
  console.log(ref, id)
  try {
    await firebase
      .database()
      .ref(ref + "/" + id)
      .remove();
    return true;
  } catch {
    return false;
  }
};

export default deleteBeer;