import firebase from 'services/firebase'
import { doc, DocumentData, onSnapshot } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

const useGame = (id : string) => {
  const [data, setData] = useState<DocumentData>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { 
    let unsubscribe : Function;

    try{
    unsubscribe = onSnapshot(doc(firebase.db,'games' ,id), (doc)=>{
        setData(doc.data())
        setIsPending(false)
      })
    }
    catch(error){
      setError(error as string)
    }


    return () => unsubscribe()
  }, []);

  return { data, isPending, error };
}
 
export default useGame;