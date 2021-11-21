import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { request } from "gaxios";

admin.initializeApp();

const nbPlayer = 4;

interface userInterface {
  name: String;
  url: String;
  id: String;
  admin: boolean;
  score: number;
  answersState: boolean[];
}

exports.createGame = functions.https.onCall(async (data) => {
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

    if (game && game.users.length >= nbPlayer) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "The game is full"
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

exports.kickUser = functions.https.onCall(async (data) => {
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

exports.startGame = functions.https.onCall(async (data) => {
  try {
    const gameSnashot = await admin
      .firestore()
      .collection("games")
      .doc(data.gameID)
      .get();

    const questions = await getQuestions();

    gameSnashot.ref.update({
      state: "start",
      questions,
    });
  } catch (error) {
    throw error;
  }
});

exports.sendResult = functions.https.onCall(async (data) => {
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
      const score = user.answersState.filter((x: boolean) => !!x).length;
      user.score = user.score + score;
    });

    await gameSnashot.ref.update({
      users,
    });

    console.log(ended);
  } catch (error) {
    throw error;
  }
});

async function getQuestions() {
  const difficulty = "medium";
  const amount = 4;
  const type = "multiple";

  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;

  const response: any = await request({
    url,
  });

  if (response && response.data && response.data.results) {
    const result = response.data.results;
    let formatedQuestions: any[] = [];
    result.forEach((element: any) => {
      let answers = [];

      console.log(element);

      element.incorrect_answers.forEach((answer: string) => {
        answers.push({ value: answer, state: false });
      });

      answers.push({ value: element.correct_answer, state: true });

      shuffleArray(answers);

      let question = {
        category: element.category,
        difficulty: element.difficulty,
        question: element.question,
        answers,
      };

      formatedQuestions.push(question);
    });

    return formatedQuestions;
  }

  return [];
}

function shuffleArray(inputArray: any[]) {
  inputArray.sort(() => Math.random() - 0.5);
}
