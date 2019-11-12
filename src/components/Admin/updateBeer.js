import firebase from "firebase";
import "firebase/database";

const updateBeer = async (ref, id, beer) => {
    try {
        await firebase
            .database()
            .ref(ref + "/" + id)
            .update(beer);
        return true;
    } catch {
        return false;
    }
};

export default updateBeer;