import firebase from "firebase";
import "firebase/database";

const officialBeerHandler = {

  request: async beer => {
    const {
      name,
      alcohol,
      country,
      photo,
      IBU,
    } = beer;

    try {
      firebase
        .database()
        .ref("requestOfficialBeers/")
        .push({
          name,
          alcohol,
          country,
          IBU,
          state: 'Pending',
          photo
        });
      return true;
    } catch {
      return false;
    }
  },

};

export default officialBeerHandler;