import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
admin.initializeApp();

interface userInterface {
  name : string,
  url : string,
  id : string,
  admin : boolean,
}

exports.createGame = functions.https.onCall(async (data) => {
  try {
    const user : userInterface = {
      name: data.userName,
      url: data.url,
      id: data.userID,
      admin: true,
    };

    const gameDocRef = await admin.firestore().collection("games").add({
      users: [user],
      state: "lobby",
    });

    return gameDocRef.id;
  } catch (error) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "An error has occured while creating a game lobby"
    );
  }
});

exports.joinGame = functions.https.onCall(async (data) => {
  try {
    const gameSnashot = await admin.firestore().collection("games").doc(data.gameID).get();

    const game = gameSnashot.data();

    const user : userInterface = {
      name: data.userName,
      url: data.url,
      id: data.userID,
      admin: false,
    };

    if (game && game.users && !game.users.find((_user : userInterface)=>_user.id == user.id )) {
      await gameSnashot.ref.update({users: [...game.users, user]});
    } else {
      throw new functions.https.HttpsError(
          "permission-denied",
          "1n error has occured while joining the game lobby"
      );
    }
  } catch (error) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "An error has occured while joining the game lobby"
    );
  }
});

exports.kickUser = functions.https.onCall(async (data) => {
  try {
    const gameSnashot = await admin.firestore().collection("games").doc(data.gameID).get();

    const game = gameSnashot.data();

    if (game && game.users) {
      const users = [...game.users];

      gameSnashot.ref.update({users: users.filter((user: userInterface) => user.id !== data.userID)});
    } else {
      throw new functions.https.HttpsError(
          "permission-denied",
          "An error has occured while joining the game lobby"
      );
    }
  } catch (error) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "An error has occured while joining the game lobby"
    );
  }
});

