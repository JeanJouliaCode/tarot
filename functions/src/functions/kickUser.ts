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

    if (game && game.users) {
      const users = [...game.users];

      gameSnashot.ref.update({
        users: users.filter((user: userInterface) => user.id !== data.userID),
      });
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
