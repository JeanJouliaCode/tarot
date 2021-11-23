import "styles/Avatar.scss";
import refreshIcon from "assets/refresh.svg";

interface AvatarProps {
  url: string;
  size: string;
  refreshAvatar: Function;
}

Avatar.defaultProps = {
  url: null,
  size: "small",
  refreshAvatar: null,
};

export default function Avatar({ url, size, refreshAvatar }: AvatarProps) {
  const refresh = () => {
    refreshAvatar();
  };

  return (
    <div className="avatar">
      <div className={`avatar__wrapper_${size}`}>
        <img src={url} alt="avatar face" className="avatar__face" />
      </div>
      {!!refreshAvatar && (
        <button className="avatar__refresh" onClick={refresh}>
          <img src={refreshIcon} alt="refresh avatar" />
        </button>
      )}
    </div>
  );
}
