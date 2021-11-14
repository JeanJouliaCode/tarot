import firebase from 'services/firebase'
import {  httpsCallable } from 'firebase/functions';
import {savePlayerID} from 'services/localStorage'

async function createGame(url : string , userID: string , userName: string){
  const body  = {url , userID , userName}

  savePlayerID(userID)
  const response = await httpsCallable(firebase.functions ,'createGame')(body);
  
  return response.data
}

function joinGame(url : string , userID: string , userName: string , gameID : string){
  const body  = {url , userID , userName , gameID}
  
  savePlayerID(userID)
  httpsCallable(firebase.functions ,'joinGame')(body).then((response)=>{
    return response.data
  }).catch(error => {
    throw error;
  });
}

function kickUser(userID: string, gameID : string){
  const body  = {userID,gameID}

  httpsCallable(firebase.functions ,'kickUser')(body).then(response=>{
    return response.data
  }).catch(error => {
    throw error
  }) 
}


export {createGame,joinGame,kickUser}