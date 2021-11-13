import 'styles/Avatar.scss'
import refreshIcon from 'assets/refresh.svg'

interface AvatarProps {
  url: string;
  outline: boolean;
  small: boolean;
  refreshAvatar:Function;
}

Avatar.defaultProps = {
  url: null,
  outline: false,
  small: false,
  refreshAvatar: null
};

export default function Avatar({url,outline,small ,refreshAvatar}:AvatarProps){

  const refresh = ()=>{
    refreshAvatar()
  }

  return (
    <div className="avatar">
      <div className={`${small ?'avatar__wrapper_small': 'avatar__wrapper'} ${outline ? 'avatar--outined' : ''}`}>
        <img src={url} alt="avatar face"  className="avatar__face"/>
      </div>
      {!!refreshAvatar && <button className="avatar__refresh" onClick={refresh}>
        <img src={refreshIcon} alt="refresh avatar" />
      </button>}
    </div>
  )
}
