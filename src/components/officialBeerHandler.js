import firebase from "firebase";
import "firebase/database";

const officialBeerHandler = {

  request: async beer => {
    const {
      name,
      alcohol,
      country,
      // photo
    } = beer;

    try {
      firebase
        .database()
        .ref("requestOfficialBeers/")
        .push({
          name,
          alcohol,
          country,
          state: 'Pending'
        });
      // await firebase
      // .storage()
      // .ref("requestOfficialBeersPhotos/" + photo.files[0].name)
      // .photoUpload.put(photo.files[0]);
      return true;
    } catch {
      return false;
    }
  },

};

export default officialBeerHandler;