import Avatar from "components/Avatar";
import Button from "components/Button";
import Text from "components/Text";
import { useState, useContext } from "react";
import { createGame, joinGame } from "services/functions";
import { generateID, generateAvatarUrl } from "services/utils";
import { toaster } from "App";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "styles/Home.scss";
var UsernameGenerator = require("username-generator");

const basePseudo = UsernameGenerator.generateUsername();

export default function Home() {
  const [avatarUrl, setAvatarUrl] = useState(generateAvatarUrl());
  const [pseudo, setPseudo] = useState(basePseudo);
  const [redirect, setRedirect] = useState(false);
  const [gameID, setGameID] = useState("");
  const [disabled, setDisabled] = useState(false);
  let { id: gameIDParam } = useParams<string>();
  const invited: boolean = !!gameIDParam;
  const showMessage = useContext(toaster);

  //create the game
  const create = async () => {
    setDisabled(true);
    try {
      var fetchedgameID = await createGame(avatarUrl, generateID(), pseudo);
      setGameID(fetchedgameID as string);
      setRedirect(true);
    } catch (error) {
      showMessage(error as string);
    }
    setDisabled(false);
  };

  //join the game
  const join = async () => {
    setDisabled(true);
    try {
      await joinGame(
        avatarUrl,
        generateID(),
        pseudo ?? basePseudo,
        gameIDParam!
      );
      setRedirect(true);
    } catch (error) {
      showMessage(error as string);
    }
    setDisabled(false);
  };

  //redirect to the lobby page
  if (redirect && !invited) {
    return <Navigate to={`../lobby/${gameID}`} />;
  } else if (redirect && invited) {
    return <Navigate to={`../lobby/${gameIDParam}`} />;
  }

  const generateUrl = () => {
    setAvatarUrl(generateAvatarUrl());
  };

  return (
    <div className="page home">
      <div className="home__container">
        <div>
          <div className="title">
            <Text content="Tarot" />
          </div>
          {invited && (
            <div className="">
              <Text content="You've been invited!" />
            </div>
          )}
        </div>
        <div className="home__avatar_container pseudo_container">
          <Avatar refreshAvatar={generateUrl} url={avatarUrl} />
          <div className="home__pseudo_container avatar_container">
            <Text content="Choose a character and a name" />
            <input
              type="text"
              className="home__pseudo"
              onChange={(event) => setPseudo(event.target.value)}
              placeholder={basePseudo}
            />
            <Button
              disabled={disabled}
              label={invited ? "Join" : "Create game"}
              onClick={invited ? join : create}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
