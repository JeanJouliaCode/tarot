import {useState} from 'react'
import useGame from 'hooks/useGame'
import Text from 'components/Text'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import { getUrlBase  } from 'services/utils'
import {getPlayerID} from 'services/localStorage'
import {kickUser} from 'services/functions'
import cross from 'assets/cross.svg'
import crown from 'assets/crown.png'
import 'styles/Lobby.scss'
import {
  useParams,Navigate
} from "react-router-dom";

export default function Lobby(){
  const [error , setError] = useState('');
  const [redirect , setRedirect] = useState(false);

  let { id } = useParams<string>();

  const { error: fetchError, isPending, data } = useGame(id ?? '')

  if (redirect) {
    return <Navigate to={`../../`} />
  }

  const copyLink = ()=>{
    setError('');
    const url = `${getUrlBase()}invite/${id}`
 
    navigator.clipboard.writeText(url).then(function() {
      setError('Link copied!');
    }, function(err) {
      setError('An error has occured');
    });
  }

  const startGame = ()=>{
    console.log('start')
  }

  const isUserAdmin = ()=>{
    const user = data?.users.find((user : any)=> user.id === getPlayerID())

    if(user){
      return !!user?.admin
    }

    return false
  }

  if(data?.blackList && data?.blackList.includes(getPlayerID())){
    setRedirect(true)
  }

  let startText = "Start the game"
  if(window.screen.width <= 636) startText = 'Start'

  return(
    <div className="page lobby">
      <div className="lobby__container">
        <div className="title"><Text content="Tarot"/></div>
        <div className="lobby__invite">        
          <Button label="Invite" onClick={copyLink}/>
          <Text content={error}/>
        </div>
        {List(data?.users ?? [],id!)}
        <div className="lobby__start_container lobby_item_mobile">
          {isUserAdmin() && <div className="lobby__start_message"><Text content="Ready to play ?"/></div>}
          {isUserAdmin() && <Button label={startText} onClick={startGame}/>}
        </div>
      </div>
    </div>
  )
}


function List(users : any[] , gameID : string){

  const deleteUser = (id : string)=>{
    const user = users.find((user => user.id === id))
    const userAdminOrNot = users.find((user => user.id === getPlayerID()))

    if(user && !user.admin && userAdminOrNot.admin){
      kickUser(id,gameID)
    }
  }

  const isUserAdmin = ()=>{
    return !!users.find((user)=> user.id === getPlayerID()).admin
  }

  return (
    <div className="lobby__list">
      {users.map((user , index)=>(
        <div className="lobby__item" key={index}>
          <Avatar url={user.url} small={true}/>
          <div className="lobby__spacing"></div>
          <Text content={user?.name}/>
          {(user.admin || isUserAdmin()) && <img 
            alt="remove user"
            onClick={()=>{deleteUser(user.id)}} 
            src={user.admin ? crown : cross}
            className={`lobby__svg ${!user.admin ?'lobby__svg_clickable':''}`}
          />}
        </div>
      ))}
    </div>
  )
}