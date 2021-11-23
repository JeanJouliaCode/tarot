import * as admin from "firebase-admin";
import createGame from "./functions/createGame";
import joinGame from "./functions/joinGame";
import kickUser from "./functions/kickUser";
import startGame from "./functions/startGame";
import sendResult from "./functions/sendResult";

admin.initializeApp();

exports.createGame = createGame;
exports.joinGame = joinGame;
exports.kickUser = kickUser;
exports.startGame = startGame;
exports.sendResult = sendResult;
