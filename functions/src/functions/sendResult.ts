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

    let users;
    if (game && game.users) {
      users = game.users.map((user: userInterface) => {
        if (user.id !== data.userID) return user;

        if (user.answersState) {
          user.answersState.push(data.answer);
        }
        return user;
      });
    } else {
      throw new functions.https.HttpsError(
        "permission-denied",
        "An error has occured"
      );
    }

    let ended = true;
    users.forEach((user: any) => {
      if (user.answersState.length < 4) {
        ended = false;
      }
    });

    await gameSnashot.ref.update({
      users,
    });

    console.log("ended", ended);
    if (ended) {
      await gameSnashot.ref.update({
        state: "score",
      });
    }
  } catch (error) {
    throw error;
  }
});
