import { useState, useContext } from "react";
import { toaster } from "App";
import useGame from "hooks/useGame";
import Text from "components/Text";
import Avatar from "components/Avatar";
import Button from "components/Button";
import { getUrlBase } from "services/utils";
import { getPlayerID } from "services/localStorage";
import { kickUser, startGame } from "services/functions";
import cross from "assets/cross.svg";
import crown from "assets/crown.svg";
import { useParams, Navigate } from "react-router-dom";
import "styles/Lobby.scss";

export default function Lobby() {
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const showMessage = useContext(toaster);

  const { id: gameID } = useParams<string>();

  const { error: fetchError, isPending, data } = useGame(gameID ?? "");

  if (redirect) {
    return <Navigate to={`../../`} />;
  }

  if (!isPending && data && data?.state === "start") {
    return <Navigate to={`../../game/${gameID}`} />;
  }

  if (fetchError) {
    showMessage(fetchError);
  }

  const copyLink = () => {
    setError("");
    const url = `${getUrlBase()}invite/${gameID}`;

    navigator.clipboard.writeText(url).then(
      function () {
        setError("Link copied!");
      },
      function (err) {
        setError("An error has occured");
      }
    );
  };

  const start = () => {
    startGame(gameID!);
  };

  const isUserAdmin = () => {
    const user = data?.users.find((user: any) => user.id === getPlayerID());

    if (user) {
      return !!user?.admin;
    }

    return false;
  };

  const deleteUser = (idUser: string) => {
    try {
      kickUser(idUser, gameID!);
    } catch (error) {
      showMessage(error as string);
    }
  };

  if (
    !isPending &&
    !!data?.users &&
    !data?.users.find((user: any) => user.id === getPlayerID())
  ) {
    console.log(!isPending, data?.users, getPlayerID());
    setRedirect(true);
  }

  let startText = "Start the game";
  if (window.screen.width <= 636) startText = "Start";

  return (
    <div className="page lobby">
      {!isPending && (
        <div className="lobby__container">
          <div className="title">
            <Text content="Tarot" />
          </div>
          <div className="lobby__invite">
            <Button label="Invite" onClick={copyLink} />
            <Text content={error} />
          </div>
          {playerList(data?.users ?? [], deleteUser)}
          <div className="lobby__start_container lobby_item_mobile">
            {isUserAdmin() && (
              <div className="lobby__start_message">
                <Text content="Ready to play ?" />
              </div>
            )}
            {isUserAdmin() && <Button label={startText} onClick={start} />}
          </div>
        </div>
      )}
    </div>
  );
}

function playerList(users: any[], deleteUser: Function) {
  const isUserAdmin = () => {
    return !!users.find((user) => user.id === getPlayerID())?.admin;
  };

  const clickCross = (id: string) => {
    const userTargeted = users.find((user) => user.id === id);
    const currentUser = users.find((user) => user.id === getPlayerID());

    if (userTargeted && !userTargeted.admin && currentUser.admin) {
      deleteUser(id);
    }
  };

  return (
    <div className="lobby__list">
      {users.map((user, index) => (
        <div className="lobby__item" key={index}>
          <Avatar url={user.url} size="small" />
          <div className="lobby__spacing"></div>
          <Text content={user?.name} />
          {(user.admin || isUserAdmin()) && (
            <img
              alt="remove user"
              onClick={() => {
                clickCross(user.id);
              }}
              src={user.admin ? crown : cross}
              className={`lobby__svg ${
                !user.admin ? "lobby__svg_clickable" : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
