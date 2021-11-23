import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { request } from "gaxios";

export default functions.https.onCall(async (data) => {
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
