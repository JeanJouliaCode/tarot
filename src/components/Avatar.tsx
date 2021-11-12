import 'styles/Avatar.scss'
import refresh from 'assets/refresh.svg'
import {useState} from 'react'
import { AvatarGenerator } from 'random-avatar-generator';

interface AvatarProps {
  url: string;
  outline: boolean;
}

Avatar.defaultProps = {
  url: null,
  outline: false,
};

export default function Avatar({url,outline}:AvatarProps){
  const [avatar , setAvatar] = useState(url || getAvatarUrl());

  const refreshAvatar = ()=>{
    setAvatar(getAvatarUrl())
  }

  return (
    <div className="avatar">
      <div className={`avatar__wrapper ${outline ? 'avatar--outined' : ''}`}>
        <img src={avatar} alt="avatar face"  className="avatar__face"/>
      </div>
      {!url && <button className="avatar__refresh" onClick={refreshAvatar}>
        <img src={refresh} alt="refresh avatar" />
      </button>}
    </div>
  )
}

function getAvatarUrl(){
  const generator = new AvatarGenerator();
  let avatarUrl =  generator.generateRandomAvatar()
  return avatarUrl.replace("Circle","Transparent") 
}