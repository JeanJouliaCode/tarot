import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { userInterface } from "../types";

export default functions.https.onCall(async (data) => {
  try {
    const gameSnashot = await admin
      .firestore()
      .collection("games")
      .doc(data.gameID)
      .get();

    const game = gameSnashot.data();

    const user: userInterface = {
      name: data.userName,
      url: data.url,
      id: data.userID,
      admin: false,
      score: 0,
      answersState: [],
    };

    if (game && game.users.length >= 4) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "The game is full"
      );
    }

    if (game && game.state !== "lobby") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "The game has stared"
      );
    }

    if (
      game &&
      game.users &&
      !game.users.find((_user: userInterface) => _user.id == user.id)
    ) {
      await gameSnashot.ref.update({ users: [...game.users, user] });
    } else {
      throw new functions.https.HttpsError(
        "permission-denied",
        "An error has occured while joining the game lobby"
      );
    }
  } catch (error) {
    throw error;
  }
});
