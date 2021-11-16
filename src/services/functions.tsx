import firebase from 'services/firebase'
import {  httpsCallable } from 'firebase/functions';
import {savePlayerID} from 'services/localStorage'
import { FirebaseError } from '@firebase/util';

function createGame(url : string , userID: string , userName: string){
  const body  = {url , userID , userName}

  savePlayerID(userID)
  return httpsCallable(firebase.functions ,'createGame')(body).then((response)=>{
    return response.data
  }).catch((error : FirebaseError) =>{
    throw error.message;
  })
}

function joinGame(url : string , userID: string , userName: string , gameID : string){
  const body  = {url , userID , userName , gameID}
  
  savePlayerID(userID)
  return httpsCallable(firebase.functions ,'joinGame')(body).then((response)=>{
    return response.data
  }).catch((error : FirebaseError) => {
    throw error.message;
  });
}

function kickUser(userID: string, gameID : string){
  const body  = {userID,gameID}

  return httpsCallable(firebase.functions ,'kickUser')(body).then(response=>{
    return response.data
  }).catch((error : FirebaseError) => {
    throw error.message;
  }) 
}


export {createGame,joinGame,kickUser}