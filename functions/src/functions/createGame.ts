import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { userInterface } from "../types";

export default functions.https.onCall(async (data) => {
  try {
    const user: userInterface = {
      name: data.userName,
      url: data.url,
      id: data.userID,
      admin: true,
      score: 0,
      answersState: [],
    };

    const gameDocRef = await admin
      .firestore()
      .collection("games")
      .add({
        users: [user],
        state: "lobby",
        round: 0,
      });

    return gameDocRef.id;
  } catch (error) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "An error has occured while creating a game lobby"
    );
  }
});
