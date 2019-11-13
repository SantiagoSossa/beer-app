import "firebase/database";
import app from "../Backend/Base";

const updateBeer = async (ref, id, beer) => {
    try {
        await app
            .database()
            .ref(ref + "/" + id)
            .update(beer);
        return true;
    } catch {
        return false;
    }
};

export default updateBeer;