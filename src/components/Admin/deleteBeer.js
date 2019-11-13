import "firebase/database";
import app from "../Backend/Base";

const deleteBeer = async (ref, id) => {
  try {
    await app
      .database()
      .ref(ref + "/" + id)
      .remove();
    return true;
  } catch {
    return false;
  }
};

export default deleteBeer;