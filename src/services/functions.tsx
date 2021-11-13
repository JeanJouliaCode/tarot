import firebase from 'services/firebase'
import {  httpsCallable } from 'firebase/functions';
import {savePlayerID} from 'services/localStorage'

async function createGame(url : string , userID: string , userName: string){
  const body  = {url , userID , userName}

  savePlayerID(userID)
  const response = await httpsCallable(firebase.functions ,'createGame')(body);
  
  return response.data
}

async function joinGame(url : string , userID: string , userName: string , gameID : string){
  const body  = {url , userID , userName , gameID}
  
  savePlayerID(userID)
  const response = await httpsCallable(firebase.functions ,'joinGame')(body);
  
  return response.data
}

async function kickUser(userID: string, gameID : string){
  const body  = {userID,gameID}

  const response = await httpsCallable(firebase.functions ,'kickUser')(body);
  
  return response.data
}


export {createGame,joinGame,kickUser}