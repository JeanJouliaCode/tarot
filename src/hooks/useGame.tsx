import firebase from 'services/firebase'
import { doc, DocumentData, onSnapshot } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

const useGame = (id : string) => {
  const [data, setData] = useState<DocumentData>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const unsubscribe = onSnapshot(doc(firebase.db,'games' ,id), (doc)=>{
      setData(doc.data())
      console.log(data)
      setIsPending(false)
    })

    return () => unsubscribe()
  }, []);

  return { data, isPending, error };
}
 
export default useGame;