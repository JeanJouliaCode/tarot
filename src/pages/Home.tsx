import Avatar from 'components/Avatar'
import Button from 'components/Button'
import Text from 'components/Text'
import {useState} from 'react'
import {createGame,joinGame} from 'services/functions'
import {generateID , generateAvatarUrl} from 'services/utils'
import { Navigate } from 'react-router-dom'
import {
  useParams
} from "react-router-dom";
import 'styles/Home.scss'


var UsernameGenerator = require('username-generator');


interface HomeProps {
  invited: boolean;
}

Home.defaultProps = {
  invited: false,
};


const basePseudo = UsernameGenerator.generateUsername();

export default function Home({invited}:HomeProps){
  const [avatarUrl , setAvatarUrl] = useState(generateAvatarUrl())
  const [pseudo , setPseudo] = useState(basePseudo)
  const [redirect , setRedirect] = useState(false)
  const [gameID , setGameID] = useState('')
  const [disabled , setDisabled] = useState(false)
  let { id } = useParams<string>();


  const create = async ()=>{
    setDisabled(true)
    if(invited){
      joinGame(avatarUrl , generateID() , pseudo ?? basePseudo , id!).then(()=>{
        setRedirect(true)
      }).catch(()=>{
        setDisabled(false)
      })
    }
    else{
      createGame(avatarUrl , generateID() , pseudo ?? basePseudo).then((ID)=>{
        if(typeof ID === 'string')setGameID(ID)
        setRedirect(true)
      }).catch(()=>{
        setDisabled(false)
      })
    }
  }

  if (redirect && !invited) {
    return <Navigate to={`lobby/${gameID}`} />
  }

  else if (redirect && invited) {
    return <Navigate to={`../lobby/${id}`} />
  }

  const generateUrl = ()=>{
    setAvatarUrl(generateAvatarUrl())
  }

  return(
  <div className="page home">
      <div className="home__container">
        <div className="title"><Text content="Tarot"/></div>
        {invited && <div className=""><Text content="You've been invited!"/></div>}
        <div className="home__avatar_container pseudo_container">
          <Avatar refreshAvatar={generateUrl} url={avatarUrl}/>
          <div className="home__pseudo_container avatar_container">
            <Text content="Choose a character and a name"/>
            <input type="text" className="home__pseudo" onChange={event => setPseudo(event.target.value)} placeholder={basePseudo}/>
            <Button disabled={disabled} label={invited ? 'Join' : 'Create game'} onClick={create}/>
          </div>
        </div>
      </div>
  </div>
  )
}
